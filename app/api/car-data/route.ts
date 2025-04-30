import { NextResponse } from 'next/server';

interface MakeResult {
  Make_ID: string;
  Make_Name: string;
}

interface ModelResult {
  Model_Name: string;
}

interface ModelItem {
  model_name: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'years', 'makes', or 'models'
  const year = searchParams.get('year');
  const make = searchParams.get('make');
  
  try {
    switch (type) {
      case 'years':
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: currentYear - 1980 }, (_, i) => ({
          Model_Year: (currentYear - i).toString()
        }));
        return NextResponse.json(years);
      case 'makes':
        const makesUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json`;        
        const makesResponse = await fetch(makesUrl);
        const makesData = await makesResponse.json();

        if (makesData.Results && makesData.Results.length > 0) {
          const majorManufacturers = [
            'ACURA', 'ALFA ROMEO', 'ASTON MARTIN', 'AUDI', 'BENTLEY', 'BMW', 'BUICK', 'CADILLAC',
            'CHEVROLET', 'CHRYSLER', 'DODGE', 'FERRARI', 'FIAT', 'FORD', 'GENESIS', 'GMC', 'HONDA',
            'HYUNDAI', 'INFINITI', 'JAGUAR', 'JEEP', 'KIA', 'LAMBORGHINI', 'LAND ROVER', 'LEXUS',
            'LINCOLN', 'LOTUS', 'MASERATI', 'MAZDA', 'MCLAREN', 'MERCEDES-BENZ', 'MINI', 'MITSUBISHI',
            'NISSAN', 'PORSCHE', 'RAM', 'ROLLS-ROYCE', 'SUBARU', 'TESLA', 'TOYOTA', 'VOLKSWAGEN', 'VOLVO'
          ];

          const makes = makesData.Results
            .map((make: MakeResult) => make.Make_Name.toUpperCase())
            .filter((name: string) => majorManufacturers.includes(name))
            .sort();

          return NextResponse.json(makes);
        }
        break;
        
      case 'models':
        if (!make || !year) {
          return NextResponse.json({ error: 'Make and year are required' }, { status: 400 });
        }

        const modelsUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`;
        const modelsResponse = await fetch(modelsUrl);
        const modelsData = await modelsResponse.json();

        if (modelsData.Results && modelsData.Results.length > 0) {
          const models = modelsData.Results
            .map((model: ModelResult) => ({
              model_name: model.Model_Name
            }))
            .filter((item: ModelItem) => item.model_name) // Remove any null/undefined values
            .sort((a: ModelItem, b: ModelItem) => a.model_name.localeCompare(b.model_name));

          return NextResponse.json(models);
        }
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch car data' }, { status: 500 });
  }
} 
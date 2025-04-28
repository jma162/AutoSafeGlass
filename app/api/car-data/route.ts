import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'years', 'makes', or 'models'
  const year = searchParams.get('year');
  const make = searchParams.get('make');
  
  try {
    let url = '';
    switch (type) {
      case 'years':
        // Get years from 1981 to current year
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: currentYear - 1980 }, (_, i) => ({
          Model_Year: (currentYear - i).toString()
        }));
        return NextResponse.json(years);
      case 'makes':
        // Fetch all makes and filter by year
        url = `https://www.carqueryapi.com/api/0.3/?cmd=getMakes&year=${year}&sold_in_us=1`;
        const makesResponse = await fetch(url);
        const makesData = await makesResponse.json();
        if (makesData.Makes) {
          return NextResponse.json(makesData.Makes);
        }
        break;
      case 'models':
        // Fetch all models for the make
        url = `https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${make}&year=${year}&sold_in_us=1`;
        const modelsResponse = await fetch(url);
        const modelsData = await modelsResponse.json();
        if (modelsData.Models) {
          return NextResponse.json(modelsData.Models);
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
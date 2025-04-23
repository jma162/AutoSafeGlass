import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vin = searchParams.get('vin');

  if (!vin) {
    return NextResponse.json({ error: 'VIN is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
    );
    const data = await response.json();

    if (data.Results) {
      // Extract relevant information
      const vehicleInfo = {
        year: data.Results.find((item: any) => item.Variable === 'Model Year')?.Value || '',
        make: data.Results.find((item: any) => item.Variable === 'Make')?.Value || '',
        model: data.Results.find((item: any) => item.Variable === 'Model')?.Value || '',
        bodyStyle: data.Results.find((item: any) => item.Variable === 'Body Class')?.Value || '',
        engineType: data.Results.find((item: any) => item.Variable === 'Engine Type')?.Value || '',
      };

      return NextResponse.json(vehicleInfo);
    }

    return NextResponse.json({ error: 'Invalid VIN' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch VIN data' }, { status: 500 });
  }
} 
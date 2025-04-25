import { NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const worker = await createWorker('eng');
    
    // Convert the File to a data URL that Tesseract can process
    const arrayBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const imageUrl = `data:${image.type};base64,${base64Image}`;

    const { data: { text } } = await worker.recognize(imageUrl);
    await worker.terminate();

    // Extract VIN pattern (17 characters, alphanumeric except I, O, Q)
    const vinPattern = /[A-HJ-NPR-Z0-9]{17}/i;
    const matches = text.match(vinPattern);
    const vin = matches ? matches[0].toUpperCase() : null;

    return NextResponse.json({ vin });
  } catch (error) {
    console.error('OCR Error:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
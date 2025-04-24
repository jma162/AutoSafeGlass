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
    const buffer = await image.arrayBuffer();
    const imageData = new Uint8Array(buffer);

    const { data: { text } } = await worker.recognize(imageData);
    await worker.terminate();

    // Extract VIN pattern (17 characters, alphanumeric except I, O, Q)
    const vinPattern = /[A-HJ-NPR-Z0-9]{17}/i;
    const matches = text.match(vinPattern);
    const vin = matches ? matches[0] : null;

    return NextResponse.json({ vin });
  } catch (error) {
    console.error('OCR Error:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
} 
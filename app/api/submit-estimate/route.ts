import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'do0qfrr5y',
  api_key: '973825896784719',
  api_secret: '0N2ct7GLMixUZXVFgt6wn7jFQWE',
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "trustmuhammadimedical@gmail.com",
    pass: "fxjqiyaquedqyyjj",
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const damage = JSON.parse(formData.get('damage') as string)
    const vehicle = JSON.parse(formData.get('vehicle') as string)
    const userInfo = JSON.parse(formData.get('userInfo') as string)
    
    // Add detailed logging
    console.log('Raw form data:', {
      damage: formData.get('damage'),
      vehicle: formData.get('vehicle'),
      userInfo: formData.get('userInfo')
    });
    
    console.log('Parsed userInfo:', userInfo);
    console.log('Insurance Claim value type:', typeof userInfo.willMakeInsuranceClaim);
    console.log('Insurance Claim raw value:', userInfo.willMakeInsuranceClaim);
    
    // Convert willMakeInsuranceClaim to boolean if it's a string
    if (typeof userInfo.willMakeInsuranceClaim === 'string') {
      userInfo.willMakeInsuranceClaim = userInfo.willMakeInsuranceClaim.toLowerCase() === 'true';
    }
    
    console.log('Processed Insurance Claim value:', userInfo.willMakeInsuranceClaim);

    const photoUrls: string[] = [];
    let photoIndex = 0;
    
    while (formData.has(`photo${photoIndex}`)) {
      const photo = formData.get(`photo${photoIndex}`) as File;
      if (photo) {
        try {
          console.log(`Processing photo ${photoIndex}`);
          const bytes = await photo.arrayBuffer();
          const buffer = Buffer.from(bytes);
          
          // Convert buffer to stream
          const bufferStream = new Readable();
          bufferStream.push(buffer);
          bufferStream.push(null);

          // Upload to Cloudinary with preset
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                resource_type: 'auto',
                folder: 'auto-glass-estimates',
                upload_preset: 'autosafeglass'
              },
              (error, result) => {
                if (error) {
                  console.error('Cloudinary upload error:', error);
                  reject(error);
                } else {
                  console.log('Upload successful:', result);
                  resolve(result);
                }
              }
            );

            bufferStream.pipe(uploadStream);
          });

          if (result && typeof result === 'object' && 'secure_url' in result) {
            const secureUrl = (result as any).secure_url;
            console.log('Generated secure URL:', secureUrl);
            photoUrls.push(secureUrl);
          }
        } catch (error) {
          console.error(`Error processing photo ${photoIndex}:`, error);
          // Continue with other photos even if one fails
        }
      }
      photoIndex++;
    }

    console.log('All photo URLs:', photoUrls);

    // Create a reusable function for photo display
    const getPhotosHtml = () => {
      if (photoUrls.length === 0) return '';
      const photosHtml = `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c7a6d; margin-bottom: 15px;">Damage Photos</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
            ${photoUrls.map(url => {
              console.log('Generating HTML for URL:', url);
              return `
                <div style="background-color: white; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <img src="${url}" alt="Damage Photo" style="width: 100%; height: auto; border-radius: 8px; display: block;" />
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
      console.log('Generated photos HTML:', photosHtml);
      return photosHtml;
    };

    // Create company footer
    const getCompanyFooter = () => `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <div style="text-align: center;">
          <h3 style="color: #333; margin-bottom: 10px; font-size: 18px; font-weight: bold;">AutoSafeGlass</h3>
          <p style="margin: 5px 0; color: #333;">Professional Auto Glass Services</p>
          <p style="margin: 5px 0; color: #333;">Phone: 215-904-5778</p>
          <p style="margin: 5px 0; color: #333;">Email: info@autosafeglass.com</p>
          <p style="margin: 5px 0; color: #333;">Address: 1200 Route 70 E. #707</p>
          <p style="margin: 5px 0; color: #333;">Cherry Hill, NJ 08034</p>
        </div>
        <div style="text-align: center; color: #666; font-size: 12px; margin-top: 10px;">
          <p>© ${new Date().getFullYear()} AutoSafeGlass. All rights reserved.</p>
        </div>
      </div>
    `;

    // Send confirmation email to user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Auto Glass Estimate Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; font-weight: bold;">Thank you for your estimate request!</h2>
            <p>We have received your request and will review it shortly. Here's a summary of your submission:</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h3 style="color: #333; margin-bottom: 10px; font-weight: bold;">Damage Information</h3>
              <p><strong style="color: #333;">Location:</strong> <span style="color: #333;">${damage.location}</span></p>
              <p><strong style="color: #333;">Sub-Location:</strong> <span style="color: #333;">${damage.subLocation}</span></p>
              <p><strong style="color: #333;">Multiple Windows:</strong> <span style="color: #333;">${damage.hasMultipleWindows ? 'Yes' : 'No'}</span></p>
              ${userInfo.note ? `<p><strong style="color: #333;">Note:</strong> <span style="color: #333;">${userInfo.note}</span></p>` : ''}
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h3 style="color: #333; margin-bottom: 10px; font-weight: bold;">Vehicle Information</h3>
              ${vehicle.method === 'license' ? `
                <p><strong style="color: #333;">Year:</strong> <span style="color: #333;">${vehicle.year}</span></p>
                <p><strong style="color: #333;">Make:</strong> <span style="color: #333;">${vehicle.make}</span></p>
                <p><strong style="color: #333;">Model:</strong> <span style="color: #333;">${vehicle.model}</span></p>
              ` : `
                <p><strong style="color: #333;">Year:</strong> <span style="color: #333;">${vehicle.year}</span></p>
                <p><strong style="color: #333;">Make:</strong> <span style="color: #333;">${vehicle.make}</span></p>
                <p><strong style="color: #333;">Model:</strong> <span style="color: #333;">${vehicle.model}</span></p>
              `}
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h3 style="color: #333; margin-bottom: 10px; font-weight: bold;">Contact Information</h3>
              <p><strong style="color: #333;">Name:</strong> <span style="color: #333;">${userInfo.firstName} ${userInfo.lastName}</span></p>
              <p><strong style="color: #333;">Phone:</strong> <span style="color: #333;">${userInfo.phone}</span></p>
              <p><strong style="color: #333;">Email:</strong> <span style="color: #333;">${userInfo.email}</span></p>
              <p><strong style="color: #333;">ZIP Code:</strong> <span style="color: #333;">${userInfo.zipCode}</span></p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h3 style="color: #333; margin-bottom: 10px; font-weight: bold;">Insurance Information</h3>
              <p><strong style="color: #333;">Will you be making an insurance claim?:</strong> <span style="color: #333;">${userInfo.willMakeInsuranceClaim ? 'Yes' : 'No'}</span></p>
            </div>

            ${getPhotosHtml()}
            
            <p style="margin-top: 20px;">We will contact you shortly with your estimate.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>

            ${getCompanyFooter()}
          </div>
        </body>
      </html>
    `;

    console.log('Sending user email with HTML:', userEmailHtml);

    await transporter.sendMail({
      from: `"AutoSafeGlass" <trustmuhammadimedical@gmail.com>`,
      to: userInfo.email,
      subject: 'Your Auto Glass Estimate Request',
      html: userEmailHtml,
    });

    // Send email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Auto Glass Estimate Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; font-weight: bold;">New Auto Glass Estimate Request</h2>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h3 style="color: #333; margin-bottom: 10px; font-weight: bold;">Contact Information</h3>
              <p><strong style="color: #333;">Name:</strong> <span style="color: #333;">${userInfo.firstName} ${userInfo.lastName}</span></p>
              <p><strong style="color: #333;">Phone:</strong> <span style="color: #333;">${userInfo.phone}</span></p>
              <p><strong style="color: #333;">Email:</strong> <span style="color: #333;">${userInfo.email}</span></p>
              <p><strong style="color: #333;">ZIP Code:</strong> <span style="color: #333;">${userInfo.zipCode}</span></p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h3 style="color: #333; margin-bottom: 10px; font-weight: bold;">Insurance Information</h3>
              <p><strong style="color: #333;">Will you be making an insurance claim?:</strong> <span style="color: #333;">${userInfo.willMakeInsuranceClaim ? 'Yes' : 'No'}</span></p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h3 style="color: #333; margin-bottom: 10px; font-weight: bold;">Vehicle Information</h3>
              ${vehicle.method === 'license' ? `
                <p><strong style="color: #333;">Year:</strong> <span style="color: #333;">${vehicle.year}</span></p>
                <p><strong style="color: #333;">Make:</strong> <span style="color: #333;">${vehicle.make}</span></p>
                <p><strong style="color: #333;">Model:</strong> <span style="color: #333;">${vehicle.model}</span></p>
              ` : `
                <p><strong style="color: #333;">Year:</strong> <span style="color: #333;">${vehicle.year}</span></p>
                <p><strong style="color: #333;">Make:</strong> <span style="color: #333;">${vehicle.make}</span></p>
                <p><strong style="color: #333;">Model:</strong> <span style="color: #333;">${vehicle.model}</span></p>
              `}
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <h3 style="color: #333; margin-bottom: 10px; font-weight: bold;">Damage Information</h3>
              <p><strong style="color: #333;">Location:</strong> <span style="color: #333;">${damage.location}</span></p>
              <p><strong style="color: #333;">Sub-Location:</strong> <span style="color: #333;">${damage.subLocation}</span></p>
              <p><strong style="color: #333;">Multiple Windows:</strong> <span style="color: #333;">${damage.hasMultipleWindows ? 'Yes' : 'No'}</span></p>
              ${userInfo.note ? `<p><strong style="color: #333;">Note:</strong> <span style="color: #333;">${userInfo.note}</span></p>` : ''}
            </div>

            ${getPhotosHtml()}

            <p style="margin-top: 20px;">Please review this estimate request and contact the customer as soon as possible.</p>
            <p>Customer's preferred contact method: ${userInfo.phone}</p>

            ${getCompanyFooter()}
          </div>
        </body>
      </html>
    `;

    console.log('Sending admin email with HTML:', adminEmailHtml);

    await transporter.sendMail({
      from: `"AutoSafeGlass" <trustmuhammadimedical@gmail.com>`,
      to: 'trustmuhammadimedical@gmail.com',
      subject: 'New Auto Glass Estimate Request',
      html: adminEmailHtml,
    });

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing estimate request:", error)
    return NextResponse.json(
      { error: "Failed to process estimate request" },
      { status: 500 }
    )
  }
} 
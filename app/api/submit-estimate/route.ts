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
    // const photoUrls = JSON.parse(formData.get('photoUrls') as string)

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
            <h2 style="color: #2c7a6d; margin-bottom: 20px;">Thank you for your estimate request!</h2>
            <p>We have received your request and will review it shortly. Here's a summary of your submission:</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c7a6d; margin-bottom: 15px;">Damage Information</h3>
              <p><strong>Location:</strong> ${damage.location}</p>
              <p><strong>Sub-Location:</strong> ${damage.subLocation}</p>
              <p><strong>Multiple Windows:</strong> ${damage.hasMultipleWindows ? 'Yes' : 'No'}</p>
            </div>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c7a6d; margin-bottom: 15px;">Vehicle Information</h3>
              ${vehicle.method === 'license' ? `
                <p><strong>License Plate:</strong> ${vehicle.licensePlate}</p>
                <p><strong>State:</strong> ${vehicle.registeredState}</p>
                <p><strong>VIN:</strong> ${vehicle.vin}</p>
              ` : `
                <p><strong>Year:</strong> ${vehicle.year}</p>
                <p><strong>Make:</strong> ${vehicle.make}</p>
                <p><strong>Model:</strong> ${vehicle.model}</p>
              `}
            </div>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c7a6d; margin-bottom: 15px;">Contact Information</h3>
              <p><strong>Name:</strong> ${userInfo.firstName} ${userInfo.lastName}</p>
              <p><strong>Phone:</strong> ${userInfo.phone}</p>
              <p><strong>Email:</strong> ${userInfo.email}</p>
              <p><strong>ZIP Code:</strong> ${userInfo.zipCode}</p>
              ${userInfo.note ? `<p><strong>Note:</strong> ${userInfo.note}</p>` : ''}
            </div>

            ${getPhotosHtml()}
            
            <p style="margin-top: 20px;">We will contact you shortly with your estimate.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
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
            <h2 style="color: #2c7a6d; margin-bottom: 20px;">New Auto Glass Estimate Request</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c7a6d; margin-bottom: 15px;">Contact Information</h3>
              <p><strong>Name:</strong> ${userInfo.firstName} ${userInfo.lastName}</p>
              <p><strong>Phone:</strong> ${userInfo.phone}</p>
              <p><strong>Email:</strong> ${userInfo.email}</p>
              <p><strong>ZIP Code:</strong> ${userInfo.zipCode}</p>
              ${userInfo.note ? `<p><strong>Note:</strong> ${userInfo.note}</p>` : ''}
            </div>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c7a6d; margin-bottom: 15px;">Vehicle Information</h3>
              ${vehicle.method === 'license' ? `
                <p><strong>License Plate:</strong> ${vehicle.licensePlate}</p>
                <p><strong>State:</strong> ${vehicle.registeredState}</p>
                <p><strong>VIN:</strong> ${vehicle.vin}</p>
              ` : `
                <p><strong>Year:</strong> ${vehicle.year}</p>
                <p><strong>Make:</strong> ${vehicle.make}</p>
                <p><strong>Model:</strong> ${vehicle.model}</p>
              `}
            </div>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c7a6d; margin-bottom: 15px;">Damage Information</h3>
              <p><strong>Location:</strong> ${damage.location}</p>
              <p><strong>Sub-Location:</strong> ${damage.subLocation}</p>
              <p><strong>Multiple Windows:</strong> ${damage.hasMultipleWindows ? 'Yes' : 'No'}</p>
            </div>

            ${getPhotosHtml()}
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
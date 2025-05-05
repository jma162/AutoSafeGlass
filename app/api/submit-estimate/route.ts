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
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: "quote@autosafeglass.com",
    pass: "Autosafeglass1#",
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const damage = JSON.parse(formData.get('damage') as string)
    const vehicle = JSON.parse(formData.get('vehicle') as string)
    const userInfo = JSON.parse(formData.get('userInfo') as string)
    const willClaimInsurance = formData.get('willClaimInsurance') as string
    
    // Add detailed logging
    console.log('Raw form data:', {
      damage: formData.get('damage'),
      vehicle: formData.get('vehicle'),
      userInfo: formData.get('userInfo'),
      willClaimInsurance: formData.get('willClaimInsurance')
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
      <div style="margin-top: 30px; padding-top: 15px; border-top: 2px solid #2c7a6d;">
        <div style="text-align: center; margin-bottom: 15px;">
          <h3 style="color: #2c7a6d; margin-bottom: 8px; font-size: 16px; font-weight: bold;">AutoSafeGlass</h3>
          <p style="margin: 4px 0; color: #333; font-size: 14px;">Professional Auto Glass Services</p>
          <p style="margin: 4px 0; color: #333; font-size: 14px;">
            <a href="tel:+12159045778" style="color: #2c7a6d; text-decoration: none;">215-904-5778</a>
          </p>
        </div>
        <div style="text-align: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px; margin: 4px 0;">© ${new Date().getFullYear()} Auto Safe Glass. All rights reserved.</p>
          <p style="color: #666; font-size: 12px; margin: 4px 0;">Licensed & Insured | Free Mobile Service Available</p>
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
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 15px; color: #333; font-size: 14px; line-height: 1.5;">
          <div style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2c7a6d; margin-bottom: 15px; font-weight: bold; font-size: 20px;">Thank you for your estimate request!</h2>
            <p style="font-size: 15px; color: #555; margin-bottom: 20px;">We have received your request and will review it shortly. Here's a summary of your submission:</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 3px solid #2c7a6d;">
              <h3 style="color: #2c7a6d; margin-bottom: 10px; font-weight: bold; font-size: 16px;">Damage Information</h3>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Location:</strong> <span style="color: #333;">${damage.location}</span></p>
              ${userInfo.note ? `<p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Note:</strong> <span style="color: #333;">${userInfo.note}</span></p>` : ''}
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 3px solid #2c7a6d;">
              <h3 style="color: #2c7a6d; margin-bottom: 10px; font-weight: bold; font-size: 16px;">Vehicle Information</h3>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Year:</strong> <span style="color: #333;">${vehicle.year}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Make:</strong> <span style="color: #333;">${vehicle.make}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Model:</strong> <span style="color: #333;">${vehicle.model}</span></p>
              ${vehicle.vin ? `<p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">VIN:</strong> <span style="color: #333;">${vehicle.vin}</span></p>` : ''}
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 3px solid #2c7a6d;">
              <h3 style="color: #2c7a6d; margin-bottom: 10px; font-weight: bold; font-size: 16px;">Contact Information</h3>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Name:</strong> <span style="color: #333;">${userInfo.firstName} ${userInfo.lastName}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Phone:</strong> <span style="color: #333;">${userInfo.phone}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Email:</strong> <span style="color: #333;">${userInfo.email}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">ZIP Code:</strong> <span style="color: #333;">${userInfo.zipCode}</span></p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 3px solid #2c7a6d;">
              <h3 style="color: #2c7a6d; margin-bottom: 10px; font-weight: bold; font-size: 16px;">Insurance Information</h3>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Will you be making an insurance claim?:</strong> <span style="color: #333;">${willClaimInsurance === 'yes' ? 'Yes' : willClaimInsurance === 'no' ? 'No' : 'Not specified'}</span></p>
            </div>

            ${getPhotosHtml()}
            
            <p style="margin-top: 15px; font-size: 15px; color: #555;">We will contact you shortly with your estimate.</p>
            <p style="font-size: 15px; color: #555;">If you have any questions, please don't hesitate to contact us.</p>

            ${getCompanyFooter()}
          </div>
        </body>
      </html>
    `;

    console.log('Sending user email with HTML:', userEmailHtml);

    await transporter.sendMail({
      from: `"Auto Safe Glass" <quote@autosafeglass.com>`,
      to: userInfo.email,
      subject: 'Your Auto Glass Estimate Request',
      html: userEmailHtml,
      attachments: photoUrls.map((url, index) => ({
        filename: `damage_photo_${index + 1}.jpg`,
        path: url
      }))
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
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 15px; color: #333; font-size: 14px; line-height: 1.5;">
          <div style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2c7a6d; margin-bottom: 15px; font-weight: bold; font-size: 20px;">New Auto Glass Estimate Request</h2>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 3px solid #2c7a6d;">
              <h3 style="color: #2c7a6d; margin-bottom: 10px; font-weight: bold; font-size: 16px;">Contact Information</h3>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Name:</strong> <span style="color: #333;">${userInfo.firstName} ${userInfo.lastName}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Phone:</strong> <span style="color: #333;">${userInfo.phone}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Email:</strong> <span style="color: #333;">${userInfo.email}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">ZIP Code:</strong> <span style="color: #333;">${userInfo.zipCode}</span></p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 3px solid #2c7a6d;">
              <h3 style="color: #2c7a6d; margin-bottom: 10px; font-weight: bold; font-size: 16px;">Insurance Information</h3>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Will you be making an insurance claim?:</strong> <span style="color: #333;">${willClaimInsurance === 'yes' ? 'Yes' : willClaimInsurance === 'no' ? 'No' : 'Not specified'}</span></p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 3px solid #2c7a6d;">
              <h3 style="color: #2c7a6d; margin-bottom: 10px; font-weight: bold; font-size: 16px;">Vehicle Information</h3>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Year:</strong> <span style="color: #333;">${vehicle.year}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Make:</strong> <span style="color: #333;">${vehicle.make}</span></p>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Model:</strong> <span style="color: #333;">${vehicle.model}</span></p>
              ${vehicle.vin ? `<p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">VIN:</strong> <span style="color: #333;">${vehicle.vin}</span></p>` : ''}
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 3px solid #2c7a6d;">
              <h3 style="color: #2c7a6d; margin-bottom: 10px; font-weight: bold; font-size: 16px;">Damage Information</h3>
              <p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Location:</strong> <span style="color: #333;">${damage.location}</span></p>
              ${userInfo.note ? `<p style="font-size: 14px; margin: 8px 0;"><strong style="color: #2c7a6d;">Note:</strong> <span style="color: #333;">${userInfo.note}</span></p>` : ''}
            </div>

            ${getPhotosHtml()}

            <p style="margin-top: 15px; font-size: 15px; color: #555;">Please review this estimate request and contact the customer as soon as possible.</p>
            <p style="font-size: 15px; color: #555;">Customer's preferred contact method: ${userInfo.phone}</p>

            ${getCompanyFooter()}
          </div>
        </body>
      </html>
    `;

    console.log('Sending admin email with HTML:', adminEmailHtml);

    await transporter.sendMail({
      from: `"Auto Safe Glass" <quote@autosafeglass.com>`,
      replyTo: userInfo.email,
      to: 'quote@autosafeglass.com',
      subject: 'New Auto Glass Estimate Request',
      html: adminEmailHtml,
      attachments: photoUrls.map((url, index) => ({
        filename: `damage_photo_${index + 1}.jpg`,
        path: url
      }))
    });

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing estimate request:", error)
    return NextResponse.json(
      { 
        error: "Failed to process estimate request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
} 
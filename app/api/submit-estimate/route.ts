import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const damage = JSON.parse(formData.get('damage') as string)
    const vehicle = JSON.parse(formData.get('vehicle') as string)
    const userInfo = JSON.parse(formData.get('userInfo') as string)
    // const photoUrls = JSON.parse(formData.get('photoUrls') as string)

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "trustmuhammadimedical@gmail.com",
        pass: "fxjqiyaquedqyyjj",
      },
    });

    const photoUrls = [];
    let photoIndex = 0;
    while (formData.has(`photo${photoIndex}`)) {
      const photo = formData.get(`photo${photoIndex}`) as File;
      if (photo) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);

<<<<<<< Updated upstream
    // --- Email to the Company ---
    const companyMailOptions = {
      from: `\"Estimate Request\" <${process.env.SMTP_USER || 'trustmuhammadimedical@gmail.com'}>`,
      to: process.env.COMPANY_EMAIL || 'default-company-email@example.com',
      subject: `New Glass Repair Estimate Request - ${damage.location}`,
      html: `
        <body style="${bodyStyle}">
          <div style="${containerStyle}">
            <h2 style="${h2Style}">New Estimate Request Received</h2>
            
            <div style="${sectionStyle}">
              <h3 style="${h3Style}">Damage Information</h3>
              <p style="${pStyle}"><strong style="${strongStyle}">Location:</strong> ${damage.location}</p>
              <p style="${pStyle}"><strong style="${strongStyle}">Specific Location:</strong> ${damage.subLocation}</p>
              ${damage.hasMultipleWindows ? `<p style="${pStyle}"><strong style="${strongStyle}">Note:</strong> Multiple windows have damage</p>` : ""}
              <p style="${pStyle}"><strong style="${strongStyle}">Insurance Claim:</strong> ${damage.willClaimInsurance === 'yes' ? 'Yes' : damage.willClaimInsurance === 'no' ? 'No' : 'Not specified'}</p>
            </div>
=======
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error: any, result: any) => {
              if (error) reject(error);
              resolve(result);
            }
          );
>>>>>>> Stashed changes

          const bufferStream = require('stream').Readable.from(buffer);
          bufferStream.pipe(uploadStream);
        });
        
        if (result) {
          photoUrls.push((result as any).secure_url);
        }
      }
      photoIndex++;
    }

    const photosHtml = photoUrls.length > 0
      ? `
        <h3>Damage Photos</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0;">
          ${photoUrls.map(url => `
            <img src="${url}" alt="Damage Photo" style="max-width: 300px; height: auto; border-radius: 8px;" />
          `).join('')}
        </div>
      `
      : '';


    // Create email content with images
    const emailContent = `
      <h2>New Estimate Request</h2>
      
      <h3>Damage Information</h3>
      <p>Location: ${damage.location}</p>
      <p>Sub-location: ${damage.subLocation}</p>
      <p>Multiple Windows: ${damage.hasMultipleWindows ? 'Yes' : 'No'}</p>
      
      <h3>Vehicle Information</h3>
      <p>Method: ${vehicle.method}</p>
      ${vehicle.method === 'license' ? `
        <p>License Plate: ${vehicle.licensePlate}</p>
        <p>State: ${vehicle.registeredState}</p>
        <p>VIN: ${vehicle.vin}</p>
      ` : `
        <p>Year: ${vehicle.year}</p>
        <p>Make: ${vehicle.make}</p>
        <p>Model: ${vehicle.model}</p>
      `}
      
      <h3>Contact Information</h3>
      <p>Name: ${userInfo.firstName} ${userInfo.lastName}</p>
      <p>Phone: ${userInfo.phone}</p>
      <p>Email: ${userInfo.email}</p>
      <p>ZIP Code: ${userInfo.zipCode}</p>
      ${userInfo.note ? `<p>Note: ${userInfo.note}</p>` : ''}
      
      <h3>Uploaded Photos</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
        ${photoUrls.map((url: string) => `
          <div>
            <img src="${url}" alt="Damage photo" style="width: 100%; height: auto; border-radius: 8px;" />
          </div>
        `).join('')}
      </div>
    `

    // Send email to admin
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: process.env.ADMIN_EMAIL,
    //   subject: 'New Auto Glass Estimate Request',
    //   html: emailContent,
    // })

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"AutoSafeGlass" <${'trustmuhammadimedical@gmail.com'}>`,
      to: userInfo.email,
      subject: 'Your Auto Glass Estimate Request',
      html: `
<<<<<<< Updated upstream
        <body style="${bodyStyle}">
          <div style="${containerStyle}">
            <h2 style="${h2Style}">Thank You For Your Request, ${userInfo.firstName}!</h2>
            
            <p style="${pStyle}">We've received your auto glass repair estimate request. Our team will review the details and get back to you soon. Here's a summary:</p>
            
            <div style="${sectionStyle}">
              <h3 style="${h3Style}">Damage Details Summary</h3>
              <p style="${pStyle}"><strong style="${strongStyle}">Location:</strong> ${damage.location}</p>
              <p style="${pStyle}"><strong style="${strongStyle}">Specific Location:</strong> ${damage.subLocation}</p>
              ${damage.hasMultipleWindows ? `<p style="${pStyle}"><strong style="${strongStyle}">Note:</strong> Multiple windows with damage noted</p>` : ""}
              <p style="${pStyle}"><strong style="${strongStyle}">Insurance Claim:</strong> ${damage.willClaimInsurance === 'yes' ? 'Yes' : damage.willClaimInsurance === 'no' ? 'No' : 'Not specified'}</p>
              ${userInfo.note ? `<p style="${pStyle}"><strong style="${strongStyle}">Note Provided:</strong><br>${userInfo.note.replace(/\n/g, '<br>')}</p>` : ""}
            </div>
            
            <div style="${sectionStyle}">
              <h3 style="${h3Style}">Vehicle Information Summary</h3>
              <p style="${pStyle}">${vehicleInfoHtml}</p>
            </div>
            
            <div style="${sectionStyle}">
              <h3 style="${h3Style}">Your Contact Information</h3>
              <p style="${pStyle}"><strong style="${strongStyle}">Name:</strong> ${userInfo.firstName} ${userInfo.lastName}</p>
              <p style="${pStyle}"><strong style="${strongStyle}">Email:</strong> ${userInfo.email}</p>
              <p style="${pStyle}"><strong style="${strongStyle}">Phone:</strong> ${userInfo.phone}</p>
              <p style="${pStyle}"><strong style="${strongStyle}">ZIP Code:</strong> ${userInfo.zipCode}</p>
            </div>
=======
        <h2>Thank you for your estimate request!</h2>
        <p>We have received your request and will review it shortly. Here's a summary of your submission:</p>
        
        <h3>Damage Information</h3>
        <p>Location: ${damage.location}</p>
        <p>Sub-location: ${damage.subLocation}</p>
        
        <h3>Vehicle Information</h3>
        ${vehicle.method === 'license' ? `
          <p>License Plate: ${vehicle.licensePlate}</p>
          <p>State: ${vehicle.registeredState}</p>
        ` : `
          <p>Year: ${vehicle.year}</p>
          <p>Make: ${vehicle.make}</p>
          <p>Model: ${vehicle.model}</p>
        `}
>>>>>>> Stashed changes

        ${photosHtml}
        
        <p>We will contact you shortly with your estimate.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing estimate request:", error)
    return NextResponse.json(
      { error: "Failed to process estimate request" },
      { status: 500 }
    )
  }
} 
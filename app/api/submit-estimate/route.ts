import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { damage, vehicle, userInfo } = data

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

    // Format vehicle information
    const vehicleInfo = vehicle.method === "license"
      ? `License Plate: ${vehicle.licensePlate}
         State: ${vehicle.registeredState}
         ${vehicle.vin ? `VIN: ${vehicle.vin}` : ""}`
      : `Year: ${vehicle.year}
         Make: ${vehicle.make}
         Model: ${vehicle.model}`

    // Email to the company
    // const companyMailOptions = {
    //   from: process.env.SMTP_USER,
    //   to: process.env.COMPANY_EMAIL,
    //   subject: `New Glass Repair Estimate Request - ${damage.location}`,
    //   html: `
    //     <h2>New Glass Repair Estimate Request</h2>
        
    //     <h3>Damage Information</h3>
    //     <p><strong>Location:</strong> ${damage.location}</p>
    //     <p><strong>Specific Location:</strong> ${damage.subLocation}</p>
    //     ${damage.hasMultipleWindows ? "<p><strong>Note:</strong> Multiple windows have damage</p>" : ""}
        
    //     <h3>Vehicle Information</h3>
    //     <p>${vehicleInfo.split('\n').join('<br>')}</p>
        
    //     <h3>Customer Information</h3>
    //     <p><strong>Name:</strong> ${userInfo.firstName} ${userInfo.lastName}</p>
    //     <p><strong>Email:</strong> ${userInfo.email}</p>
    //     <p><strong>Phone:</strong> ${userInfo.phone}</p>
    //     <p><strong>ZIP Code:</strong> ${userInfo.zipCode}</p>
    //   `,
    // }

    // Confirmation email to the customer
    const customerMailOptions = {
      from: `"Kapstone-Clinic" <${'trustmuhammadimedical@gmail.com'}>`,
      to: userInfo.email,
      subject: "Your Glass Repair Estimate Request - AutoSafeGlass",
      html: `
        <h2>Thank you for your estimate request!</h2>
        
        <p>Dear ${userInfo.firstName},</p>
        
        <p>We have received your glass repair estimate request and our team will review it shortly. 
        Here's a summary of the information you provided:</p>
        
        <h3>Damage Details</h3>
        <p><strong>Location:</strong> ${damage.location}</p>
        <p><strong>Specific Location:</strong> ${damage.subLocation}</p>
        ${damage.hasMultipleWindows ? "<p><strong>Note:</strong> Multiple windows with damage noted</p>" : ""}
        
        <h3>Vehicle Information</h3>
        <p>${vehicleInfo.split('\n').join('<br>')}</p>
        
        <h3>What's Next?</h3>
        <p>Our team will review your request and contact you within 24 hours to:</p>
        <ul>
          <li>Provide a detailed estimate</li>
          <li>Answer any questions you may have</li>
          <li>Schedule your repair if you wish to proceed</li>
        </ul>
        
        <p>If you need immediate assistance, please call us at 215-904-5778.</p>
        
        <p>Best regards,<br>
        The AutoSafeGlass Team</p>
      `,
    }

    // Send both emails
    // await transporter.sendMail(companyMailOptions)
    await transporter.sendMail(customerMailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing estimate request:", error)
    return NextResponse.json(
      { error: "Failed to process estimate request" },
      { status: 500 }
    )
  }
} 
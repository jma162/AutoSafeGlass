import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { damage, vehicle, userInfo } = data

    // --- Define Refined Colors and Styles ---
    const primaryAccentColor = "#7E57C2"; // A slightly softer, elegant purple
    const headingColor = "#4A148C";    // A deeper purple for main headings
    const labelColor = "#5E35B1";      // Purple for labels (strong tags)
    const lightBgColor = "#f9f8fd";   // Very light purple/gray background
    const borderColor = "#eae6f0";   // Softer border color
    const textColor = "#333333";      // Dark gray for readability
    // Modern sans-serif font stack for better email client support
    const fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";

    const bodyStyle = `background-color: #f4f4f7; margin: 0; padding: 0; font-family: ${fontFamily};`; // Style for the email body itself
    const containerStyle = `max-width: 600px; margin: 30px auto; padding: 30px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);`;
    const h2Style = `color: ${headingColor}; margin: 0 0 25px 0; font-size: 26px; font-weight: 600; border-bottom: 2px solid ${primaryAccentColor}; padding-bottom: 10px;`;
    const h3Style = `color: ${primaryAccentColor}; margin: 25px 0 15px 0; font-size: 18px; font-weight: 600;`;
    const pStyle = `margin: 0 0 12px 0; line-height: 1.7; font-size: 15px; color: ${textColor};`;
    const strongStyle = `color: ${labelColor}; font-weight: 600;`; // Styled labels
    const sectionStyle = `background-color: ${lightBgColor}; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid ${borderColor};`;
    const listStyle = `margin: 10px 0 15px 5px; padding-left: 20px;`;
    const listItemStyle = `margin-bottom: 8px; font-size: 15px;`;
    const footerStyle = `margin-top: 35px; font-size: 13px; color: #888888; text-align: center; border-top: 1px solid ${borderColor}; padding-top: 20px;`;
    const linkStyle = `color: ${primaryAccentColor}; text-decoration: none; font-weight: 600;`; // Style for links like phone number
    // --- End Styles ---

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

    // Format vehicle information for HTML
    const vehicleInfoHtml = vehicle.method === "license"
      ? `<strong style="${strongStyle}">License Plate:</strong> ${vehicle.licensePlate}<br>
         <strong style="${strongStyle}">State:</strong> ${vehicle.registeredState}<br>
         ${vehicle.vin ? `<strong style="${strongStyle}">VIN:</strong> ${vehicle.vin}` : ""}`
      : `<strong style="${strongStyle}">Year:</strong> ${vehicle.year}<br>
         <strong style="${strongStyle}">Make:</strong> ${vehicle.make}<br>
         <strong style="${strongStyle}">Model:</strong> ${vehicle.model}`

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
            </div>

            <div style="${sectionStyle}">
              <h3 style="${h3Style}">Vehicle Information</h3>
              <p style="${pStyle}">${vehicleInfoHtml}</p>
            </div>

            <div style="${sectionStyle}">
              <h3 style="${h3Style}">Customer Information</h3>
              <p style="${pStyle}"><strong style="${strongStyle}">Name:</strong> ${userInfo.firstName} ${userInfo.lastName}</p>
              <p style="${pStyle}"><strong style="${strongStyle}">Email:</strong> ${userInfo.email}</p>
              <p style="${pStyle}"><strong style="${strongStyle}">Phone:</strong> ${userInfo.phone}</p>
              <p style="${pStyle}"><strong style="${strongStyle}">ZIP Code:</strong> ${userInfo.zipCode}</p>
              ${userInfo.note ? `<p style="${pStyle}"><strong style="${strongStyle}">Note:</strong><br>${userInfo.note.replace(/\n/g, '<br>')}</p>` : ""}
            </div>
            
            <div style="${footerStyle}">
              This email was sent automatically.
            </div>
          </div>
        </body>
      `,
    }

    // --- Confirmation Email to the Customer ---
    const customerMailOptions = {
      from: `\"AutoSafeGlass\" <${'trustmuhammadimedical@gmail.com'}>`,
      to: userInfo.email,
      subject: "Your Glass Repair Estimate Request - AutoSafeGlass",
      html: `
        <body style="${bodyStyle}">
          <div style="${containerStyle}">
            <h2 style="${h2Style}">Thank You For Your Request, ${userInfo.firstName}!</h2>
            
            <p style="${pStyle}">We've received your auto glass repair estimate request. Our team will review the details and get back to you soon. Here's a summary:</p>
            
            <div style="${sectionStyle}">
              <h3 style="${h3Style}">Damage Details Summary</h3>
              <p style="${pStyle}"><strong style="${strongStyle}">Location:</strong> ${damage.location}</p>
              <p style="${pStyle}"><strong style="${strongStyle}">Specific Location:</strong> ${damage.subLocation}</p>
              ${damage.hasMultipleWindows ? `<p style="${pStyle}"><strong style="${strongStyle}">Note:</strong> Multiple windows with damage noted</p>` : ""}
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

            <div>
              <h3 style="${h3Style}">What Happens Next?</h3>
              <p style="${pStyle}">Our team will carefully review your request and aim to contact you within 24 business hours to:</p>
              <ul style="${listStyle}">
                <li style="${listItemStyle}">Provide you with a detailed estimate.</li>
                <li style="${listItemStyle}">Answer any questions you might have.</li>
                <li style="${listItemStyle}">Help schedule your repair or replacement if you decide to proceed.</li>
              </ul>
              <p style="${pStyle}">If you need immediate assistance or have urgent questions, please don't hesitate to call us directly at <a href="tel:+12159045778" style="${linkStyle}">215-904-5778</a>.</p>
            </div>

            <p style="margin-top: 25px; ${pStyle}">Best regards,<br>The AutoSafeGlass Team</p>

            <div style="${footerStyle}">
              AutoSafeGlass | 1200 Route 70 E. #707, Cherry Hill, NJ 08034 | 215-904-5778
            </div>
          </div>
        </body>
      `,
    }

    // Send emails
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
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Portfolio Admin" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Admin Portal Login - OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Portfolio Admin Portal</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0;">Secure Login Verification</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2d3748; margin-bottom: 20px;">Your Login OTP</h2>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Use the following One-Time Password to access the admin portal:
            </p>
            
            <div style="background: #f7fafc; border: 2px dashed #cbd5e0; padding: 20px; text-align: center; border-radius: 8px; margin: 25px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #2d3748; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                ${otp}
              </span>
            </div>
            
            <div style="background: #fef5e7; border-left: 4px solid #f6ad55; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="color: #744210; margin: 0; font-size: 14px;">
                <strong>⚠️ Security Notice:</strong> This OTP will expire in 5 minutes. Do not share this code with anyone.
              </p>
            </div>
            
            <p style="color: #718096; font-size: 14px; margin-top: 25px;">
              If you didn't request this login, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #a0aec0; font-size: 12px;">
            <p>© 2024 Portfolio Admin Portal. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

// Send contact form notification email
export const sendContactNotification = async (contactData) => {
  try {
    const { name, email, subject, message } = contactData;

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">📧 New Contact Form Submission</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Someone wants to get in touch with you!</p>
          </div>
          
          <!-- Content -->
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Contact Info -->
            <div style="background: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
              <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
                👤 Contact Information
              </h2>
              <div style="display: grid; gap: 10px;">
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #4a5568; min-width: 80px;">Name:</span>
                  <span style="color: #2d3748; font-size: 16px;">${name}</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #4a5568; min-width: 80px;">Email:</span>
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px;">${email}</a>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #4a5568; min-width: 80px;">Subject:</span>
                  <span style="color: #2d3748; font-size: 16px;">${subject}</span>
                </div>
              </div>
            </div>
            
            <!-- Message -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                💬 Message
              </h3>
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="color: #4a5568; line-height: 1.6; margin: 0; white-space: pre-wrap; font-size: 15px;">${message}</p>
              </div>
            </div>
            
            <!-- Quick Actions -->
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: white; margin: 0 0 15px 0; font-size: 18px;">Quick Actions</h3>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:${email}?subject=Re: ${subject}" 
                   style="background: rgba(255,255,255,0.2); color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3);">
                  📧 Reply via Email
                </a>
                <a href="${
                  process.env.FRONTEND_URL || "http://localhost:5173"
                }/admin/contacts" 
                   style="background: rgba(255,255,255,0.2); color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3);">
                  🔧 Manage in Admin
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #718096; font-size: 14px; margin: 0;">
                This email was sent from your portfolio contact form at ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Contact notification email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending contact notification email:", error);
    return false;
  }
};

// Send auto-reply to contact form submitter
export const sendContactAutoReply = async (contactData) => {
  try {
    const { name, email, subject } = contactData;

    const mailOptions = {
      from: `"Tarin Agarwal" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for contacting me - ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">✨ Thank You for Reaching Out!</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Your message has been received</p>
          </div>
          
          <!-- Content -->
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="font-size: 48px; margin-bottom: 15px;">🎉</div>
              <h2 style="color: #2d3748; margin: 0 0 10px 0; font-size: 24px;">Hi ${name}!</h2>
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0;">
                Thank you for taking the time to contact me. I've received your message about "<strong>${subject}</strong>" and I'm excited to connect with you!
              </p>
            </div>
            
            <!-- What's Next -->
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px;">
              <h3 style="color: white; margin: 0 0 15px 0; font-size: 20px; text-align: center;">🚀 What's Next?</h3>
              <div style="color: white; font-size: 15px; line-height: 1.6;">
                <p style="margin: 0 0 10px 0;">• I'll review your message carefully and get back to you within 24-48 hours</p>
                <p style="margin: 0 0 10px 0;">• If your inquiry is urgent, feel free to reach out via LinkedIn or other social channels</p>
                <p style="margin: 0;">• In the meantime, feel free to explore my portfolio and recent projects</p>
              </div>
            </div>
            
            <!-- Connect -->
            <div style="text-align: center; margin-bottom: 25px;">
              <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px;">Let's Stay Connected</h3>
              <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="https://www.linkedin.com/in/tarin-agarwal-810793267/" style="background: #0077b5; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 14px;">LinkedIn</a>
                <a href="https://github.com/tarinagarwal" style="background: #333; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 14px;">GitHub</a>
                <a href="${
                  process.env.FRONTEND_URL || "http://localhost:5173"
                }" style="background: #667eea; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 14px;">Portfolio</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 14px; margin: 0 0 10px 0;">
                Best regards,<br>
                <strong style="color: #2d3748;">Tarin Agarwal</strong><br>
                Full-Stack Developer & Game Developer
              </p>
              <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                This is an automated response. Please don't reply to this email.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Auto-reply email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending auto-reply email:", error);
    return false;
  }
};

// Test email connection
export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email service is ready");
    return true;
  } catch (error) {
    console.error("❌ Email service error:", error);
    return false;
  }
};

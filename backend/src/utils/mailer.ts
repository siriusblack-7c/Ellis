import { Resend } from 'resend';

// Validate environment variables
const validateEmailConfig = () => {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing email configuration: RESEND_API_KEY not set");
        return false;
    }
    if (!process.env.FROM_EMAIL) {
        console.error("Missing email configuration: FROM_EMAIL not set");
        return false;
    }
    return true;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (to: string, name: string) => {
    try {
        // Validate configuration first
        if (!validateEmailConfig()) {
            throw new Error("Email configuration is missing");
        }

        console.log(`Sending welcome email to: ${to}`);

        const result = await resend.emails.send({
            from: `Ellis Care Team <${process.env.FROM_EMAIL}>`,
            to: [to],
            subject: "Welcome to Ellis!",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2563eb; margin-bottom: 10px;">Welcome to Ellis, ${name}!</h1>
                        <div style="width: 50px; height: 3px; background-color: #2563eb; margin: 0 auto;"></div>
                    </div>
                    
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="font-size: 16px; line-height: 1.6; color: #334155; margin: 0;">
                            Thank you for signing up with Ellis! We're excited to have you join our community of 
                            care providers and recipients.
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #334155; margin-bottom: 15px;">What's next?</h3>
                        <ul style="color: #64748b; line-height: 1.6;">
                            <li>Complete your profile to get personalized matches</li>
                            <li>Browse our care services and providers</li>
                            <li>Start connecting with our community</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 20px;">
                        <a href="#" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                            Get Started
                        </a>
                    </div>
                    
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; color: #64748b; font-size: 14px;">
                        <p>If you have any questions, feel free to reach out to us anytime.</p>
                        <p style="margin: 10px 0;">
                            Best regards,<br>
                            <strong>The Ellis Team</strong>
                        </p>
                    </div>
                </div>
            `,
        });

        console.log("✅ Welcome email sent successfully:", result);
        return true;
    } catch (error: any) {
        console.error("❌ Error sending welcome email:", error);

        if (error.message?.includes('API key')) {
            console.error("Invalid Resend API key. Please check your RESEND_API_KEY environment variable.");
        } else if (error.message?.includes('domain')) {
            console.error("Email domain not verified. Please verify your domain in Resend dashboard.");
        }

        // Don't throw the error - just log it so user registration doesn't fail
        return false;
    }
} 
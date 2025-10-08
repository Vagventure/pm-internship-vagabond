import { Resend } from 'resend';
import PMInternshipEmail from "../emails/verificationEmail"
import PMVerifyIdentity from '@/emails/verifyIdentity';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    email: string,
    verifyCode: string,
    type: string,
) {

    if (type == "AccountVerification") {
        try {
            await resend.emails.send({
                from: process.env.RESEND_DOMAIN as string,
                to: email,
                subject: 'Verification Email',
                react: PMInternshipEmail({ validationCode: verifyCode }),
            });
            console.log("Verification email sent successsfully");
            return Response.json({
                success: true,
                message: "Verification email sent successsfully"
            }, { status: 200 })
        } catch (err) {
            console.log("Error sending verification email: ", err);
            return Response.json({
                success: false,
                message: "Can't send verification email"
            }, { status: 500 })
        }

    } else if (type == "VerifyIdentityEmail") {
        try {
            await resend.emails.send({
                from: process.env.RESEND_DOMAIN as string,
                to: email,
                subject: 'Verification Email',
                react: PMVerifyIdentity({ validationCode: verifyCode }),
            });
            console.log("Verification email sent successsfully");
            return Response.json({
                success: true,
                message: "Verification email sent successsfully"
            }, { status: 200 })
        } catch (err) {
            console.log("Error sending verification email: ", err);
            return Response.json({
                success: false,
                message: "Can't send verification email"
            }, { status: 500 })
        }

    }
} 
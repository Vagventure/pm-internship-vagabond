import {dbConnect} from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(req: Request) {
    const { email } = await req.json()

    try {
        await dbConnect();
        const existingUser = await User.findOne({ email })
        console.log(email)
        if (!existingUser) {
            console.log("user not found with mail: ", email)
            return Response.json({
                success: false,
                message: "No such user found"
            },{status:400})
        }

        console.log(existingUser?.verifyCode)

        const isExpired = (verifyCodeExpiry?: Date) => {
            if (!verifyCodeExpiry) return true; 

            const expiryTime = new Date(verifyCodeExpiry).getTime();
            const now = Date.now();

            return now > expiryTime;
        };

        if (isExpired(existingUser?.verifyCodeExpiry)) {
            if (existingUser) {
                const verifyCodeExpiry = new Date(Date.now() + 3600000);
                const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

                existingUser.verifyCodeExpiry = verifyCodeExpiry;
                existingUser.verifyCode = verifyCode;

                await existingUser.save();
            }
        }


        const emailResponse = await sendVerificationEmail(
            email,
            existingUser?.verifyCode as string,
        )

        if (!emailResponse) {
            return Response.json({
                success: false,
                message: "Failed to send verification email"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "Verification otp sent again successfully"
        }, { status: 201 })


    } catch (err) {
        console.log("Failed to send otp: ", err)
        return NextResponse.json({
            success: false,
            message: "Error resending verification code"
        }, { status: 500 })

    }


}
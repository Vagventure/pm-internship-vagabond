import {dbConnect} from "@/lib/dbConnect";
// import dbConnect from "../../../../lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(req: Request) {
    const { name, email, password, confirmPassword } = await req.json()

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    if (!name || !email || !password || !confirmPassword) {
        return NextResponse.json({
            success: false,
            message: "Missing required parameters"
        }, { status: 400 })
    }

    console.log(name,"--",email,"--",password,"--",confirmPassword);

    if (!isValidEmail(email)) {
        return NextResponse.json({
            success: false,
            message: "Invalid email format"
        }, { status: 400 })
    }

    if (password !== confirmPassword) {
        return NextResponse.json({
            success: false,
            message: "Password mismatch please check your password"
        }, { status: 400 })
    }

    if (password.length <= 6) {
        return NextResponse.json({
            success: false,
            message: "Password must be greater than 6 characters"
        }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date (Date.now() + 3600000);

    console.log(hashedPassword,"--",verifyCode,"--",verifyCodeExpiry);
    try {
        console.log("dbConnect:", dbConnect);
        await dbConnect();

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            if (existingUser.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: "User already verified"
                }, { status: 409 })
            } else {
                existingUser.password = hashedPassword,
                    existingUser.verifyCode = verifyCode,
                    existingUser.verifyCodeExpiry = verifyCodeExpiry

                await existingUser.save();
            }
        } else {
            const newUser = new User({
                email,
                name,
                password: hashedPassword,
                isVerified: false,
                verifyCode: verifyCode,
                verifyCodeExpiry: verifyCodeExpiry
            })

            await newUser.save();
        }

        // const emailResponse = await sendVerificationEmail(
        //     email,
        //     verifyCode,
        // )

        // if (!emailResponse) {
        //     return Response.json({
        //         success: false,
        //         message: "Failed to send verification email"
        //     }, { status: 400 })
        // }

        return NextResponse.json({
            success: true,
            message: "User successfully created, you may safely login now"
        }, { status: 201 })



    } catch (err) {
        console.log("Error creating a user : ", err)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, { status: 500 })
    }

}


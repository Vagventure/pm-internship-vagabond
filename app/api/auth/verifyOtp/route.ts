import {dbConnect} from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req: Request) {
    const { verifyCode, email } = await req.json()
    console.log("Reveived email: ", email)

    if (!verifyCode) {
        return Response.json({
            success: false,
            message: "Didn t received the otp"
        }, { status: 400 })
    }

    if (!email) {
        console.log("Didn t Reveived email: ", email)
        return Response.json({
            success: false,
            message: "Didn t received the email"
        }, { status: 400 })
    }


    try {
        await dbConnect();
        console.log("Reveived email: ", email)

        const user = await User.findOne({ email })
        if (!user) {
            return Response.json({
                success: false,
                message: "Can't find user with this email"
            }, { status: 400 })
        }

       
        if (user.verifyCode == verifyCode) {
            user.isVerified = true
            await user.save();
            return Response.json({
                success: true,
                message: "User successfully verified"
            }, { status: 200 })
        } else {
            return Response.json({
                success: false,
                message: "Invalid verification code,Try again"
            }, { status: 400 })
        }

    } catch (err) {
        console.log("Error verfifying user: ", err)
        return Response.json({
            success: false,
            message: "Can't verify user"
        }, { status: 500 })
    }
}
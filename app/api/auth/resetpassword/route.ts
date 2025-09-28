import {dbConnect} from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { password, confirmPassword, email } = await req.json()
    console.log("Reveived email: ", email)

    if (!password || !confirmPassword || !email) {
        return Response.json({
            success: false,
            message: "All parameters are required"
        }, { status: 400 })
    }

    if (password != confirmPassword) {
        return Response.json({
            success: false,
            message: "Password didn't match, Try again"
        }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password,10);
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

        user.password = hashedPassword
        await user.save();

        return Response.json({
            success: true,
            message: "New password successfully updated"
        }, { status: 200 })

    } catch (err) {
        console.log("Error updating password: ", err)
        return Response.json({
            success: false,
            message: "Can't update password"
        }, { status: 500 })
    }
}
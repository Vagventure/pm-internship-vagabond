import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req: Request) {
    try {
        
        const { email, securityData } = await req.json();
        const { currentPassword, newPassword, confirmPassword } = securityData;
        

        if (!email || !currentPassword || !newPassword || !confirmPassword) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }
        

        if (newPassword !== confirmPassword) {
            return NextResponse.json(
                { message: "New passwords do not match" },
                { status: 400 }
            );
        }
        
        await dbConnect();
       
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

   
        const isMatch = await bcrypt.compare(currentPassword, user.password as string);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Incorrect current password" },
                { status: 400 }
            );
        }

 
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            { message: "Password updated successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Password reset error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

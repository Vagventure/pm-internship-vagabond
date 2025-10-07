import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";


// import "@/types/next-auth";

export async function PUT(req: Request) {
  try {
 
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }


    const { enabled } = await req.json();
    if (typeof enabled !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    await dbConnect();


    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { twoFactorEnabled: enabled },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

   
    return NextResponse.json({
      success: true,
      message: `Two-factor authentication ${enabled ? "enabled" : "disabled"} successfully.`,
      twoFactorEnabled: user.twoFactorEnabled,
    });
  } catch (err) {
    console.error("Error toggling 2FA:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

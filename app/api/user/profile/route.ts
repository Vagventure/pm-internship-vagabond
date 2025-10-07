import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/dbConnect";
import User from "@/models/user";

export async function PUT(req: Request) {
  try {
    const { email, username, bio, profileImage } = await req.json();

    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.name = username;
    user.bio = bio;
    user.profilePhoto = profileImage;

    await user.save();

    return NextResponse.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

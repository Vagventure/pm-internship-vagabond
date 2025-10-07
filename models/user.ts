import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  profilePhoto?: string; 
  bio?: string;
  twoFactorEnabled?: boolean;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verifyCode: {
      type: String,
      required: true,
    },
    verifyCodeExpiry: {
      type: Date,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: false,
      default:""
    },
    bio: {
      type: String,
      required: false,
      default:"",
      maxlength: 200, 
    },
    twoFactorEnabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

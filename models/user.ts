import mongoose,{Document,Schema,Model, Mongoose} from "mongoose"

export interface IUser extends Document{
    name?:string,
    email:string,
    password?:string,
    isVerified:boolean,
    verifyCode:string,
    verifyCodeExpiry:Date,
    id:string
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
name:{
    type: String,
    required: false
},
email:{
    type: String,
    required:true
},
password:{
    type:String,
    required:false
},
isVerified:{
    type:Boolean,
    required:true
},
verifyCode:{
    type:String,
    required:true
},
verifyCodeExpiry:{
    type:Date,
    required:true
}
})

const User:Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User
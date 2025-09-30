import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("Landed on sign-user auth")
const handler = NextAuth({

    session: {
        strategy: "jwt",
    },
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                try {
                    await dbConnect();
                    const user = await User.findOne({ email: credentials?.email })
                    if (!user) {
                        throw new Error("User not found")
                    }
                    const isValidPassword = await bcrypt.compare(credentials?.password ?? "", user.password as string)
                    if (!isValidPassword) {
                        throw new Error("Invalid Password")
                    }

                    return user;
                } catch (err) {
                    console.error("Authorize error:", err);
                    return null
                }
            }

        })
    ],
    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    name: token.name,
                    email: token.email,
                    image: token.picture
                }
            }
            return session
        }

    },
    secret: process.env.NEXTAUTH_SECRET

})

export { handler as GET, handler as POST }

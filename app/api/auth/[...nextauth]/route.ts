import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

console.log("Landed on sign-user auth")
const handler = NextAuth({

    session: {
        strategy: "jwt",
    },
    providers: [

        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),

        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),

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

        async signIn({ account, profile, user }) {
            if (account?.provider === "github") {
                await dbConnect();
                const existingUser = await User.findOne({ email: profile?.email })

                if (!existingUser) {
                    await User.create({
                        name: profile?.name || "Anonymous",
                        email: profile?.email,
                        isVerified: true,
                        verifyCode: "oauth",
                        verifyCodeExpiry: new Date()
                    })
                        ; (profile as any).isNewUser = true
                }
            }

            if (account?.provider === "google") {
                await dbConnect();
                const existingUser = await User.findOne({ email: profile?.email })

                if (!existingUser) {
                    await User.create({
                        name: profile?.name || "Anonymous",
                        email: profile?.email,
                        image: profile?.image,
                        isVerified: true,
                        verifyCode: "oauth",
                        verifyCodeExpiry: new Date()
                    })
                        ; (profile as any).isNewUser = true
                }
            }

            return true;
        },

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
        },

        async redirect({ url, baseUrl }) {
            const user = (url as any)?.user
            if (user?.isNewUser) {
                return "/create-profile"
            }
            return "/"
        }
    },

    secret: process.env.NEXTAUTH_SECRET

})

export { handler as GET, handler as POST }

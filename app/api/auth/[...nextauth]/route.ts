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
                    const user = await User.findOne({ email: credentials?.email });

                    if (!user) throw new Error("User not found");

                    const isValidPassword = await bcrypt.compare(credentials?.password ?? "", user.password as string);
                    if (!isValidPassword) throw new Error("Invalid Password");

                    return user;
                } catch (err) {
                    if (err instanceof Error && (err.message === "User not found" || err.message === "Invalid Password")) {
                        throw err;
                    }
                    console.error("Unexpected authorize error:", err);
                    throw new Error("Something went wrong");
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

                }
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.twoFactorEnabled = (user as any).twoFactorEnabled ?? false;
            }
            return token
        },

        async session({ session, token }) {
            // if (token) {
            //     await dbConnect();
            //     const user = await User.findById(token.id);

            //     session.user = {
            //         name: user?.name || token.name,
            //         email: user?.email || token.email,
            //         image: user?.profilePhoto || token.picture,
            //         twoFactorEnabled: user?.twoFactorEnabled ?? false, // ✅ use DB value
            //     } as any;
            // }
            if (token) {
               await dbConnect();
                  const enduser = await User.findOne({ email: token.email });

                session.user = {
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                    twoFactorEnabled: enduser?.twoFactorEnabled ?? false,
                }

            }
            return session;
        },




    },
    pages: {
        signIn: "/",
        error: "/auth/error",
    },

    secret: process.env.NEXTAUTH_SECRET

})

export { handler as GET, handler as POST }

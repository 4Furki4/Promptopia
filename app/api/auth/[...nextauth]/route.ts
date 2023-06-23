import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import User from "@models/user"


const handler = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
    ],
    callbacks: {
        async session({ session }: any) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.sessionId = sessionUser?._id.toString();
            return session
        },
        // @ts-ignore
        async signIn({ profile }: { profile: Profile }) {
            try {
                await connectToDb();

                // check if a user already exists
                const userExists = await User.findOne({ email: profile.email })

                //if not, create a new user and save to db
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", ""),
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
})

export { handler as GET, handler as POST };
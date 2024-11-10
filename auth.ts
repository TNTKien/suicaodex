import { D1Adapter } from "@auth/d1-adapter"
import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Discord],
    //adapter: D1Adapter(process.env.DATABASE_ID),
})
import type { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Discord, Google, GitHub],
  trustHost: true,
} satisfies NextAuthConfig;

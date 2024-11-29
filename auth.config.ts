import type { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Discord],
} satisfies NextAuthConfig;

import api, { APIError } from "@/apis/common/lib/axios";
import { UserType } from "@/types/UserType";
import NextAuth, { CredentialsSignin, DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Custom error classes for invalid credentials.
export class InvalidCredentials extends CredentialsSignin {
  code: string;

  constructor(error: string) {
    super(); // Call the parent class constructor
    this.code = error; // Assign the passed error string to the code property
  }
}

class UserNotFound extends CredentialsSignin {
  code = "User_not_found";
}
/**
 * Utility function to check if a token is expired
 * Adds a small buffer to prevent edge cases
 */
const isTokenExpired = (exp?: number): boolean => {
  if (!exp) return true;
  // Add 30-second buffer before actual expiration
  return Date.now() >= exp * 1000 - 30000;
};

declare module "next-auth" {
  interface User {
    access_token: string;
    role:string;
    exp: number;
  }

  interface Session {
    user:{
      role:string
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // Add logic here to look up the user from the credentials supplied
          const response = await api.post<User>("/api/auth/signin", {
            data: {
              username: credentials.username,
              password: credentials.password,
            }
          });
          if (!response || !response.access_token) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new InvalidCredentials("No access token found");
          }
          const userResponse = await api.get<UserType>("/api/auth/me", {
            headers: { Authorization: `Bearer ${response.access_token}` },
          });
          // If no user details are found, return null
          if (!userResponse) throw new UserNotFound();
          // return user object with their profile data

          return {
            id: userResponse._id,
            name: `${userResponse.firstName} ${userResponse.lastName}`,
            role:userResponse.role,
            email: userResponse.email,
            access_token: response.access_token,
            exp: response.exp,
          };
        } catch (error) {
          if (error instanceof APIError) {
            throw new InvalidCredentials(error.message);
          }
          throw new InvalidCredentials(error as string);
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    async session({ session, token }) {
      if (token) {
        if (isTokenExpired(token.exp)) {
          signOut();
        }  
        session.user = {
          ...session.user,
          role: token.role as string,
          id: token.sub!,
          access_token: token.access_token as string,
          exp: token.exp!,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.access_token = user.access_token;
        token.role = user.role;
        token.exp = user.exp;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});

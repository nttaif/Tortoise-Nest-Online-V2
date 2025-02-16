'use server'
import { signIn } from "@/lib/auth"
//call to server
//server returns response and we return to client
export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      email: email,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    });
    return r;
  } catch (error) {
    console.log(">>>>>>>>>>error", error);
  }
}
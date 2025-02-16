'use server'
import { InvalidCredentials, signIn } from "@/lib/auth"
//call to server
//server returns response and we return to client
export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    });
    return r;
  } catch (error) {
    if (error instanceof InvalidCredentials) {
    return { error: error?.code };
    }
    return { error: "Unknown" };
  }
}

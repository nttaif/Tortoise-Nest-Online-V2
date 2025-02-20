'use server'
import api from "@/apis/common/lib/axios";
import { InvalidCredentials, signIn } from "@/lib/auth"
import { ResponseListData } from "@/types/ResponseListData";
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

export async function reVerify(email: string) {
  try {
    const result = await api.post("/api/auth/re-verify", { data: {email:email} });
    return result;
  } catch (error) {
    return { error: error };
  }
}

export async function addUser(data:any) {
  try{
    const result = await api.post('/api/user', {data:data});
    return result;
  }catch(error){
    console.log(error);
    return {error: error};
  }
}

export async function getListTeacher() {
  let ListTeacher;
  try {
    ListTeacher = await api.get<ResponseListData>('/api/user', { params: { current: 1, pageSize: 10,role:'Teacher' }});
    return ListTeacher;
  } catch (error) {
    ListTeacher = { results: [] };
    return ListTeacher;
  }
}

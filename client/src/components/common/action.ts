'use server'
import api, { APIError } from "@/apis/common/lib/axios";
import { InvalidCredentials, signIn } from "@/lib/auth"
import { ResponseListTeacherData } from "@/types/ResponseListTeacherData";
import { UserType } from "@/types/UserType";
import { console } from "inspector";
import { string } from "zod";
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

export async function verifyCode(email: string, code: string) {
  try {
    const result = await api.post<{message:string,error:string,statusCode:number}>("/api/auth/verify", { data: { email: email, verificationCode: code } });
    return result;
  } catch (error) {
    if(error instanceof APIError){
      return { error: error.message };
    }
    return { error: "Unknown" };
  }
}

export async function addUser(data:any) {
  try{
    const result = await api.post<{
      _id:string,
      email: string,
      firstName: string,
      lastName: string,
      code_id: string,
  }>('/api/user', {data:data});
    return result;
  }catch(error){
    if(error instanceof APIError){
      return { error: error.message };
    }
    throw error;
  }
}

export async function updateTeacher(data:any) {
  const dataUpdate = {
    firstName: data.firstName,
    lastName: data.lastName,
    educationLevel: data.educationLevel,
    experienceYears: data.experienceYears,
    major: data.major,
    publications: data.publications,
    isActive: data.isActive,
    isClose: data.isClose,
    role: data.role
  }
  try{
    const result = await api.patch<{
      acknowledged: boolean,
      modifiedCount: number,
      upsertedId: null,
      upsertedCount: number,
      matchedCount: number
  }>(`/api/user/${data?._id}`, {data:dataUpdate});
    return result;
  }catch(error){
    if(error instanceof APIError){
      return { error: error.message };
    }
    throw error;
  }
}

export async function addTeacher(data:any) {
  try{
    const result = await api.post<{
      _id:string,
      email: string,
      firstName: string,
      lastName: string,
      code_id: string,
  }>('/api/user', {data:data});
    return result;
  }catch(error){
    if(error instanceof APIError){
      return { error: error.message };
    }
    throw error;
  }
}

export async function getListTeacher(current:number, pageSize:number) {
  let ListTeacher;
  try {
    ListTeacher = await api.get<ResponseListTeacherData>('/api/user', { params: { current: current, pageSize: pageSize,role:'Teacher' }});
    return ListTeacher;
  } catch (error) {
    ListTeacher = {
      results: [],
      meta: {
        current: 0,
        pageSize: 0,
        pages: 0,
        total: 0
      },
     };
    return ListTeacher;
  }
}

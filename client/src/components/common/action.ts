'use server'
import api, { APIError } from "@/apis/common/lib/axios";
import { InvalidCredentials, signIn } from "@/lib/auth"
import { Course } from "@/types/Courses";
import { ResponseListTeacherData } from "@/types/ResponseListTeacherData";
import axios from "axios";
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

export async function getListTeacher(current?:number, pageSize?:number) {
  if(!current || !pageSize){
    current = 1;
    pageSize = 10000;
  }
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


export async function getListStudents(current?:number, pageSize?:number) {
  if(!current || !pageSize){
    current = 1;
    pageSize = 10000;
  }
  let ListStudent;
  try {
    ListStudent = await api.get<ResponseListTeacherData>('/api/user', { params: { current: current, pageSize: pageSize,role:'Student' }});
    return ListStudent;
  } catch (error) {
    ListStudent = {
      results: [],
      meta: {
        current: 0,
        pageSize: 0,
        pages: 0,
        total: 0
      },
     };
    return ListStudent;
  }
}

export async function getAllCourses(){
  let listData
  try {
    listData = await api.get<Course[]>('/api/courses');
    return listData;
  } catch (error) {
    return listData;
  }
}
export async function getCoursesById(_id:string){
  let data
  try {
    data = await api.get<Course>(`/api/courses/${_id}`);
    return data;
  } catch (error) {
    return data;
  }
}

export async function addCourses(courses:Course) {
  let result
  try{
    const course = {
      name: courses.name,
      description: courses.description,
      image: courses.image,
      price: courses.price,
      discount: courses.discount,
      status: courses.status,
      category:courses.category,
      teacherId: courses.teacherId._id
    }
     result = await api.post('/api/courses', {
      data:course
    });
    return result;
  }catch(error){
    console.log('>>>>>>>>>check: ',error)
    return result;
  }
}

export const UploadImage = async (file: File) => {
  if (!file) return null; 

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset",`${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url; // Trả về URL ảnh
  } catch (error :any) {
    console.error("Lỗi upload ảnh lên Cloudinary:",error.response?.data || error);
    return null;
  }
};
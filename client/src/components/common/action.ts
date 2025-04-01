'use server'
import api, { APIError } from "@/apis/common/lib/axios";
import { InvalidCredentials, signIn } from "@/lib/auth"
import { Course } from "@/types/Courses";
import { Lesson } from "@/types/Lesson";
import { ResponseListTeacherData } from "@/types/ResponseListTeacherData";
import { Teacher } from "@/types/Teacher";
import { UserType } from "@/types/UserType";
import axios from "axios";
//call to server
//server returns response and we return to client
interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
}

// Kiểu phản hồi khi đăng ký thành công
interface SignUpSuccessResponse {
  message: string;
}

// Kiểu phản hồi khi đăng ký thất bại
interface SignUpErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export async function signUp(data: SignUpData): Promise<SignUpSuccessResponse | SignUpErrorResponse> {
  try {
    const response = await api.post<SignUpSuccessResponse>('/api/auth/signUp', { data });
    console.log('response: ',response)
    return response;
  } catch (error) {
    if (error instanceof APIError && error.response) {
      // Nếu APIError chứa phản hồi, trả về nó dưới dạng SignUpErrorResponse
      return error.response as SignUpErrorResponse;
    }
    throw error;
  }
}

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


export async function getTeacher(id:string) {
  let teacher;
  try {
    teacher = await api.get<Teacher>(`/api/user/${id}`);
    return teacher;
  } catch (error) {
    return teacher;
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

export async function getEnrollments() {
  try {
    // Giả sử backend trả về mảng Enrollment
    const result = await api.get("/api/enrollments");
    return result; // result.data là mảng enrollment
  } catch (error) {
    console.error("getEnrollments error:", error);
    return [];
  }
}

export async function getEnrollmentById(id: string) {
  try {
    const result = await api.get(`/api/enrollments/${id}`);
    return result;
  } catch (error) {
    console.error("getEnrollmentById error:", error);
    return null;
  }
}
  export async function getEnrollmentsByUserId(userId: string) {
    try {
      const result = await api.get(`/api/enrollments/user/${userId}`);
      return result;
    } catch (error) {
      console.error("getEnrollmentsByUserId error:", error);
      return null; // Trả về null nếu có lỗi
    }
  }


export async function addEnrollment(data: any) {
  try {
    // data có thể chứa { userId, courseId, ... }
    const result = await api.post("/api/enrollments", {
      data,
    });
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function updateEnrollment(id: string, data: any) {
  try {
    const result = await api.patch(`/api/enrollments/${id}`, {
      data,
    });
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function removeEnrollment(id: string) {
  try {
    const result = await api.delete(`/api/enrollments/${id}`);
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    throw error;
  }
}

// ---------------------------------------
//  TRANSACTION
// ---------------------------------------

export async function getTransactions() {
  try {
    const result = await api.get("/api/transactions");
    return result; // result.data là mảng transaction
  } catch (error) {
    console.error("getTransactions error:", error);
    return [];
  }
}

export async function getTransactionById(id: string) {
  try {
    const result = await api.get(`/api/transactions/${id}`);
    return result;
  } catch (error) {
    console.error("getTransactionById error:", error);
    return null;
  }
}

export async function addTransaction(data: any) {
  try {
    const result = await api.post("/api/transactions", {
      data,
    });
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function updateTransaction(id: string, data: any) {
  try {
    const result = await api.patch(`/api/transactions/${id}`, {
      data,
    });
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function removeTransaction(id: string) {
  try {
    const result = await api.delete(`/api/transactions/${id}`);
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    throw error;
  }
}
export async function getLessonsByCourse(courseId: string) {
  try {
    const result = await api.get(`/api/lessons/course/${courseId}`);
    return result;
  } catch (error) {
    console.error("getLessonsByCourse error:", error);
    return [];
  }
}

export async function getLessonById(id: string) {
  try {
    const result = await api.get(`/api/lessons/${id}`);
    return result;
  } catch (error) {
    console.error("getLessonById error:", error);
    return null;
  }
}

export async function addLesson(data: any) {
  try {
    const result = await api.post("/api/lessons", {
      data,
    });
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    throw error;
  }
}
export async function updateLesson(id: string, data: any) {
  try {
    const result = await api.put(`/api/lessons/${id}`, {
      data,
    });
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function removeLesson(id: string) {
  try {
    const result = await api.delete(`/api/lessons/${id}`);
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    throw error;
  }
}


export async function getTeacherCourses(teacherId: string): Promise<{
  activeCourses: Course[]
  draftCourses: Course[]
}> {
  try {
    const response = await api.get(`/api/courses/teacher/${teacherId}`)
    const teacherCourses = response as Course[]

    // Phân loại các khóa học thành active và draft
    const activeCourses = teacherCourses.filter((course: Course) => course.status)
    const draftCourses = teacherCourses.filter((course: Course) => !course.status)

    return { activeCourses, draftCourses }
  } catch (error) {
    console.error("Error fetching teacher courses:", error)
    return { activeCourses: [], draftCourses: [] }
  }
}

export async function getCourseSchedule(courseId?: string): Promise<Lesson[]> {
  try {
    if (courseId!== undefined) {
      const response = await api.get<Lesson[]>(`/api/lessons/schedules/${courseId}`)
      console.log("Fetched sas:", response) // Kiểm tra dữ liệu đã lấy
      return response
    }else {
      const response = await api.get<Lesson[]>(`/api/lessons/schedules`)
      console.log("Fetched sas:", response) // Kiểm tra dữ liệu đã lấy
      return response
    }

    
  } catch (error) {
    console.error("Error fetching course lessons:", error)
    return []
  }
}
export async function getLessons() {
  try {
    const result = await api.get("/api/lessons")
    return result
  } catch (error) {
    console.error("getLessons error:", error)
    return []
  }
}
export async function updateLessonContent(lessonId: string, content: any, contentId?: string) {
  try {
    let url = `/api/lessons/${lessonId}/contents`
    if (contentId) {
      url += `/${contentId}`
    }
    const result = await api.post(url, {
      data: content,
    })
    return result
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message }
    }
    throw error
  }
}
export async function deleteLessonContent(lessonId: string, contentId: string) {
  try {
    const result = await api.delete(`/api/lessons/${lessonId}/contents/${contentId}`)
    return result
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message }
    }
    throw error
  }
}

export async function updateLessonSchedule(lessonId: string, schedule: any, scheduleId?: string) {
  try {
    let url = `/api/lessons/${lessonId}/schedules`
    if (scheduleId) {
      url += `/${scheduleId}`
    }
    const result = await api.post(url, {
      data: schedule,
    })
    return result
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message }
    }
    throw error
  }
}
export async function deleteLessonSchedule(lessonId: string, scheduleId: string) {
  try {
    const result = await api.delete(`/api/lessons/${lessonId}/schedules/${scheduleId}`)
    return result
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message }
    }
    throw error
  }
}

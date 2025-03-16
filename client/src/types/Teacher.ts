import { Course } from "./Courses"

export type Teacher= {
    _id: string
    firstName: string
    lastName: string
    address: string
    avartar: string;
    email: string;
    role: string
    major: { name: string, color: string }[];
    educationLevel?: string;
    experienceYears?: number;
    publications?: string[];
    courses?: Course[]
    isActive: boolean;
    isClose: boolean;
    createdAt: string;
    updatedAt: string;
  }
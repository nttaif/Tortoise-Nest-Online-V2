import { Course } from "./Courses";
import { Teacher } from "./Teacher";

export type ContentType = 'video' | 'document';
export type DocumentType = 'word' | 'ppt' | 'pdf';

export interface LessonContent {
  _id?: string;
  title: string;
  description?: string;
  contentType: ContentType;
  url: string; // URL to the video or document
  documentType?: DocumentType; // Only applicable if contentType is 'document'
  duration?: number; // Duration in minutes (for videos)
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  _id: string;
  courseId: string | Course;
  title: string;
  description?: string;
  contents: LessonContent[];
  order: number; // Order in the course
  scheduledTime?: LessonSchedule[]; // Array of scheduled times
  createdAt: string;
  updatedAt: string;
}

export interface LessonSchedule {
  _id?: string;
  lessonId: string | Lesson;
  teacherId: string | Teacher;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  meetingUrl?: string; // Jitsi meeting URL
  meetingId?: string; // Jitsi meeting ID
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
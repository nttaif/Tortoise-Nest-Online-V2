// src/lessons/schemas/lesson.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
export type LessonDocument = HydratedDocument<Lesson>;
@Schema({ timestamps: true })
export class Lesson {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Course", required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        contentType: { type: String, enum: ["video", "document"], required: true },
        url: { type: String, required: true },
        duration: { type: Number }, 
        documentType: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  contents: {
    title: string;
    description: string;
    contentType: "video" | "document";
    url: string;
    duration?: number;
    documentType?: string;
    createdAt: Date;
    updatedAt: Date;
  }[];

  @Prop({ required: true })
  order: number;

  @Prop({
    type: [
      {
        teacherId: { type: Types.ObjectId, ref: "User", required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        meetingId: { type: String, required: true },
        status: {
          type: String,
          enum: ["scheduled", "ongoing", "completed", "cancelled"],
          default: "scheduled",
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  scheduledTime: {
    teacherId: Types.ObjectId;
    startTime: Date;
    endTime: Date;
    meetingId: string;
    status: "scheduled" | "ongoing" | "completed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
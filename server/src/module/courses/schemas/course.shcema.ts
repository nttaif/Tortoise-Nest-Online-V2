import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CourseDocument = HydratedDocument<Course>;
@Schema({ timestamps: true })
export class Course {
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    image: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    discount: number;

    @Prop({ required: true })
    status: boolean;

    @Prop({ required: true })
    category: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    teacherId: Types.ObjectId;

}
export const CoursesSchema = SchemaFactory.createForClass(Course);
CoursesSchema.virtual("lessons", {
    ref: "Lesson",
    localField: "_id",
    foreignField: "courseId",
});

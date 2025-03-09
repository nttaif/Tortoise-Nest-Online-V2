// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema(
  { timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 })
export class User {
  _id: Types.ObjectId;
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  address: string;

  @Prop({default: 'https://res.cloudinary.com/dkkgmzpqd/image/upload/v1633660734/avatars/avt1.png'})
  avartar: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: 'Student' })
  role: string;

  @Prop()
  major?: { name: string, color: string }[];

  @Prop()
  educationLevel?: string;

  @Prop()
  experienceYears?: number;

  @Prop()
  publications?: string[];


  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isClose: boolean;

  @Prop()
  codeId: string;

  @Prop()
  codeExpired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<UserDocument>('save', function (next) {
  if (this.role === 'Student' || this.role === 'Admin') {
    this.major = undefined;
    this.educationLevel = undefined;
    this.experienceYears = undefined;
    this.publications = undefined;
  }
  next();
});
// Virtual populate để lấy các course của teacher
UserSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'teacherId',
});

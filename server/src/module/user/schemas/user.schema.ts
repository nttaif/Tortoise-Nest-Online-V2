// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  cognitoSub?: string; //for tracking Cognito user ID
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 });

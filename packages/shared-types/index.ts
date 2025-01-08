import { Types } from "mongoose";

export enum UserRole {
  SUPER_ADMIN,
  ORG_ADMIN,
  MANAGER,
  AGENT,
  LOAN_OFFICER,
  TC,
  STAFF
}

// export type PipelineType = {
//   _id: Types.ObjectId;
//   name: string;
//   description?: string;
//   type: PipelineTypeEnum;
//   orderWeight: number;
//   status: PipelineStatusEnum;
//   isPublished: boolean;
//   isDefault: boolean;
//   organizationId: Types.ObjectId;
//   createdBy: Types.ObjectId;
//   color?: string;
//   icon?: string;
//   metadata: PipelineMetadata;
//   rules: PipelineRules;
//   deletedAt?: Date;
//   createdAt: Date;
//   updatedAt: Date;
// };

export type User= {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  roles: UserRole[];
  organizationId: Types.ObjectId;
  createdBy: Types.ObjectId;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
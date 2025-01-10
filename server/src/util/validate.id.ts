import { Types } from "mongoose";
import { BadRequestException } from "@nestjs/common";
export const  validateID = (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }
  }
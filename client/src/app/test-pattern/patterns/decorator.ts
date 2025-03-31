import type { User, UserDisplayData } from "../types/user"
import type { UserDisplay } from "./abstract-factory"

// Base Decorator
export abstract class UserDisplayDecorator implements UserDisplay {
  protected wrapped: UserDisplay
  constructor(userDisplay: UserDisplay) {
    this.wrapped = userDisplay
  }

  displayUser(user: User): UserDisplayData {
    return this.wrapped.displayUser(user)
  }
}

// Concrete Decorators
export class ActiveStatusDecorator extends UserDisplayDecorator {
  displayUser(user: User): UserDisplayData {
    const data = this.wrapped.displayUser(user)

    // Đảm bảo status luôn có
    data.status = {
      ...data.status,
      isActive: user.isActive,
    }

    return data
  }
}

export class ExperienceDecorator extends UserDisplayDecorator {
  displayUser(user: User): UserDisplayData {
    const data = this.wrapped.displayUser(user)

    if (user.role === "teacher" && user.experienceYears) {
      data.status = {
        ...data.status,
        isExperienced: user.experienceYears >= 5,
      }
    }

    return data
  }
}


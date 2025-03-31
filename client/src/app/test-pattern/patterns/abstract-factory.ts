import type { User, UserDisplayData } from "../types/user"

// Abstract Product interfaces
export interface UserDisplay {
  displayUser(user: User): UserDisplayData
}

// Concrete Products
export class TeacherDisplay implements UserDisplay {
  displayUser(user: User): UserDisplayData {
    return {
      basicInfo: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        address: user.address,
      },
      teacherInfo: {
        educationLevel: user.educationLevel,
        experienceYears: user.experienceYears,
        major: user.major,
        publications: user.publications,
        courses: user.courses,
      },
      status: {
        isActive: user.isActive,
        isExperienced: user.experienceYears ? user.experienceYears >= 5 : false,
      },
    }
  }
}

export class StudentDisplay implements UserDisplay {
  displayUser(user: User): UserDisplayData {
    return {
      basicInfo: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        address: user.address,
      },
      status: {
        isActive: user.isActive,
      },
    }
  }
}

// Abstract Factory
export interface UserDisplayFactory {
  createUserDisplay(): UserDisplay
}

// Concrete Factories
export class TeacherDisplayFactory implements UserDisplayFactory {
  createUserDisplay(): UserDisplay {
    return new TeacherDisplay()
  }
}

export class StudentDisplayFactory implements UserDisplayFactory {
  createUserDisplay(): UserDisplay {
    return new StudentDisplay()
  }
}

// Factory Creator
export const createUserDisplayFactory = (user: User): UserDisplayFactory => {
  if (user.role === "teacher") {
    return new TeacherDisplayFactory()
  } else {
    return new StudentDisplayFactory()
  }
}

import type { Teacher } from "@/types/Teacher";

export const teacherData: Teacher = {
  _id: "67d65f88b90b8dbec6d342a0",
  firstName: "Ngô Thanh",
  lastName: "Tài",
  address: "No information yet",
  avartar: "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1633660734/avatars/avt1.png",
  email: "nt.tai5304@gmail.com",
  role: "Teacher",
  major: [
    {
      name: "Chemistry",
      color: "#ffeaea",
    },
    {
      name: "Engineering",
      color: "#a833ff3b",
    },
    {
      name: "Biology",
      color: "#33a8ff63",
    },
  ],
  educationLevel: "Master's Degree",
  experienceYears: 8,
  publications: ["Cẩm nang công nghệ enzyme và vi sinh vật trong lĩnh vực công nghiệp chế biến"],
  isActive: true,
  isClose: false,
  createdAt: "2025-03-16T05:20:08.576Z",
  updatedAt: "2025-03-16T08:32:04.463Z",
  courses: [
    {
      _id: "67d66105b90b8dbec6d342ad",
      name: "Developing Back-End Apps with Node.js and Express",
      description:
        "In a recent Stack Overflow survey, Node.js was used by about 50% of the developers who answered the survey, making it the most used server-side technology. Express ranked as the fourth most popular web technology overall, making it the most popular server-side web framework.   \n\nIn this course, you will focus on Node.js and Express. Specifically, you will \n\n- develop applications using asynchronous callbacks and promises\n\n- create REST APIs and perform CRUD operations\n\n- implement authentication and session management\n\nThroughout the course, you will complete numerous hands-on labs to gain practical experience. At the end of the course, you will demonstrate your Node skills with a final project to build your portfolio.\n \nThis course will help you succeed as a back-end or full-stack developer. It suits those in IT looking to step up in their careers or new graduates seeking to establish their server-side skills. This course suits those who need to manage cloud-centric projects.\n\nNote: This course requires knowledge of JavaScript and Git.",
      image: "https://res.cloudinary.com/dhogczuic/image/upload/v1742102789/cdnanspjgillcdifas7c.jpg",
      price: 1090000,
      discount: 25,
      status: true,
      category: "Programming",
      teacherId: "67d65f88b90b8dbec6d342a0",
      createdAt: "2025-03-16T05:26:29.615Z",
      updatedAt: "2025-03-16T05:26:29.615Z",
    },
    {
      _id: "67d662eeb90b8dbec6d342cc",
      name: "Business Foundations Specialization",
      description:
        "In this Specialization, you'll develop basic literacy in the language of business, which you can use to transition to a new career, start or improve your own small business, or apply to business school to continue your education. In five courses, you'll learn the fundamentals of marketing, accounting, operations, and finance. In the final Capstone Project, you'll apply the skills learned by developing a go-to-market strategy to address a real business challenge.",
      image: "https://res.cloudinary.com/dhogczuic/image/upload/v1742103277/sy4j6dtxeevozpddlmws.avif",
      price: 0,
      discount: 18,
      status: true,
      category: "Design",
      teacherId: "67d65f88b90b8dbec6d342a0",
      createdAt: "2025-03-16T05:34:38.431Z",
      updatedAt: "2025-03-16T05:34:38.431Z",
    },
    {
      _id: "67d66528b90b8dbec6d342f0",
      name: "Fundamentals of NestJS",
      description:
        'Welcome to the "Fundamentals of NestJS" course for Modern Backend Development, where you will embark on a comprehensive journey to become a proficient NestJS developer. This course is divided into two modules, each focused on essential aspects of NestJS development. In Module 1, we\'ll get you started with NestJS, covering the fundamentals and project setup. Module 2 delves into more advanced concepts, including services, middleware, and exception handling.\n\nIn Module 1, "Getting Started with NestJS," we embark on a journey to explore the fundamental concepts and setup of this powerful Node.js framework. In Lesson 1, we provide an introduction to NestJS, give an overview of its capabilities, guide you through setting up the development environment, and delve into the project structure. In Lesson 2, we focus on controllers and routing, understanding their roles, handling route parameters and query strings, and effectively managing requests and responses.\n\nIn Module 2, "Services, Middleware, and Exception Filters," we dive deeper into NestJS, exploring essential concepts for building robust and modular applications. In Lesson 1, we\'ll focus on services and dependency injection, covering how to create services, utilize providers, and manage service scopes within modules. In Lesson 2, we\'ll delve into middleware and exception filters, understanding their roles, implementing exception filters, and effectively putting all these concepts together in your NestJS applications.\n\nOur target learner is anyone with a basic understanding of JavaScript and web development concepts, eager to delve into the world of Nest.js. Whether you\'re a beginner looking to start your backend development journey or an experienced developer aiming to enhance your skillset with Nest.js, this course is tailored for you.',
      image: "https://res.cloudinary.com/dhogczuic/image/upload/v1742103848/j02u90t6uzizldnov0s5.png",
      price: 1200000,
      discount: 2,
      status: true,
      category: "Programming",
      teacherId: "67d65f88b90b8dbec6d342a0",
      createdAt: "2025-03-16T05:44:08.837Z",
      updatedAt: "2025-03-16T05:44:08.837Z",
    },
    {
      _id: "67d66676b90b8dbec6d34316",
      name: "PepsiCo: Water Stewardship Specialization",
      description:
        'Welcome to the Water Stewardship Training Program from PepsiCo. In this course, faculty from diverse scholarly backgrounds at Arizona State University  - alongside a module developed by The Nature Conservancy -  will provide a water-related curriculum in the form of online micro-lectures designed to improve learning outcomes for professional learners with busy schedules. \n\nYou will learn about the water cycle, hydrology, groundwater models, human impacts on freshwater ecosystems, water governance, water law, the economics of water infrastructure and water stakeholdering. In addition to this "basic knowledge" content, you will also learn about the history of corporate water stewardship and the new gold standard—Science-Based Targets and how to set them and advance your water stewardship goals in an intervention-based approach. \n\n  \n\nApplied Learning Project\n\nLearners will identify local and global contexts where water resources and sustainability are particularly significant and research the natural resources, corporate and organizational influence, and relevant legal and ethical frameworks. Learners will then take what they learn and develop recommendations for changes to support more sustainable practices within their chosen context.\n\nRead less',
      image: "https://res.cloudinary.com/dhogczuic/image/upload/v1742104181/eme3ow4o60tiemay2pcs.jpg",
      price: 200000,
      discount: 14,
      status: true,
      category: "Business",
      teacherId: "67d65f88b90b8dbec6d342a0",
      createdAt: "2025-03-16T05:49:42.152Z",
      updatedAt: "2025-03-16T05:49:42.152Z",
    },
  ],
}


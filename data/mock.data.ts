import { Booking, Category, Review, TutorProfile, User } from "@/types";

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Web Development", slug: "web-development" },
  { id: "cat-2", name: "Data Science", slug: "data-science" },
  { id: "cat-3", name: "Mathematics", slug: "mathematics" },
  { id: "cat-4", name: "English Literature", slug: "english-literature" },
];

export const mockUsers: User[] = [
  {
    id: "usr-1",
    name: "Admin SkillBridge",
    email: "admin@skillbridge.com",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: new Date(),
  },
  {
    id: "usr-2",
    name: "Jhankar Mahbub",
    email: "jhankar@tutor.com",
    role: "TUTOR",
    status: "ACTIVE",
    createdAt: new Date(),
  },
  {
    id: "usr-3",
    name: "Anisul Islam",
    email: "anisul@tutor.com",
    role: "TUTOR",
    status: "ACTIVE",
    createdAt: new Date(),
  },
  {
    id: "usr-4",
    name: "Rahat Khan",
    email: "rahat@student.com",
    role: "STUDENT",
    status: "ACTIVE",
    createdAt: new Date(),
  },
];

export const mockTutorProfiles: TutorProfile[] = [
  {
    id: "tut-1",
    userId: "usr-2",
    bio: "Senior Web Developer with 8+ years of experience. Specializes in React, Next.js, and Node.js. Love to teach with fun examples!",
    pricePerHour: 25,
    rating: 4.9,
    availability: {
      Monday: ["10:00 AM", "02:00 PM", "04:00 PM"],
      Wednesday: ["10:00 AM", "02:00 PM"],
      Friday: ["04:00 PM", "06:00 PM"],
    },
  },
  {
    id: "tut-2",
    userId: "usr-3",
    bio: "Software Engineer and Content Creator. Teaching Computer Science fundamentals and Full-Stack development to thousands of students worldwide.",
    pricePerHour: 20,
    rating: 4.8,
    availability: {
      Tuesday: ["11:00 AM", "03:00 PM"],
      Thursday: ["11:00 AM", "03:00 PM", "07:00 PM"],
      Saturday: ["09:00 AM"],
    },
  },
];

export const mockBookings: Booking[] = [
  {
    id: "bk-1",
    studentId: "usr-4",
    tutorProfileId: "tut-1",
    slot: "Monday, 2026-06-22 at 10:00 AM",
    status: "CONFIRMED",
    createdAt: new Date(),
  },
  {
    id: "bk-2",
    studentId: "usr-4",
    tutorProfileId: "tut-2",
    slot: "Tuesday, 2026-06-16 at 03:00 PM",
    status: "COMPLETED",
    createdAt: new Date(),
  },
];

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    studentId: "usr-4",
    tutorProfileId: "tut-1",
    rating: 5,
    comment: "Amazing teaching style! Everything was crystal clear.",
    createdAt: new Date(),
  },
];

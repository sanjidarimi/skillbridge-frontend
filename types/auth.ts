export type UserRole = "student" | "tutor";

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role: UserRole | "admin";
  };
}
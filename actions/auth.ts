"use server";

import { AuthResponse, UserRole } from "../../types/auth";

// Simulation delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function handleSignIn(
  prevState: unknown,
  formData: FormData,
): Promise<AuthResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await delay(1500); // Simulate network lag

  /* // BACKEND READY BLUEPRINT:
  try {
    const res = await fetch("https://api.skillbridge.com/v1/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error("Invalid credentials");
    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
  */

  if (email === "admin@skillbridge.com" && password === "password") {
    return {
      success: true,
      message: "Welcome back, Admin!",
      user: { id: "1", email, role: "admin" },
    };
  }

  return {
    success: true,
    message: "Successfully signed in!",
    user: { id: "2", email, role: "student" },
  };
}

export async function handleSignUp(
  prevState: unknown,
  formData: FormData,
): Promise<AuthResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  const role = formData.get("role") as UserRole;

  await delay(1500);

  /* // BACKEND READY BLUEPRINT:
  try {
    const res = await fetch("https://api.skillbridge.com/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    });
    return await res.json();
  } catch (error) { ... }
  */

  return {
    success: true,
    message: `Account created successfully as a ${role}!`,
    user: { id: "3", name, email, role },
  };
}

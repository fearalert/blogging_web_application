/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { UserAuthForm } from "@/components/AuthForm";
import { loginUser } from "@/app/api/api";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as { email: FormDataEntryValue; password: FormDataEntryValue };
  
    const userData: LoginData = {
      email: String(data.email), 
      password: String(data.password)
    };

    if (!userData.email || !userData.password) {
        setError("Email and password are required.");
        return;
      }

    console.log("User dataaa", data);
  
    try {
      const response = await loginUser(userData);
      console.log("Login successful:", response);
      // Redirect or perform additional actions
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message);
    }
  }
  

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container flex-col items-center justify-center lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] bg-card border border-border text-foreground p-8 rounded-md shadow-md">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome Back to Blogging Website
              </p>
            </div>
            <UserAuthForm
              formType="login"
              onSubmit={handleSubmit}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <p className="px-8 text-center text-sm text-muted-foreground">
              or{" "}
              <br />
              <span>Don’t have an account?</span>{" "}
              <Link
                href="/auth/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

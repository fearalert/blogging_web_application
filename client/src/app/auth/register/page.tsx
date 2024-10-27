/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { UserAuthForm } from "@/components/AuthForm";
import { registerUser } from "@/app/api/api";

interface RegisterData {
    email: string;
    password: string;
  }
  
export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as { email: FormDataEntryValue; password: FormDataEntryValue };
  
    const userData: RegisterData = {
      email: String(data.email), 
      password: String(data.password)
    };

    try {
      const response = await registerUser(userData);
      console.log("Registration successful:", response);
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container flex-col items-center justify-center lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] bg-card border border-border text-foreground p-8 rounded-md shadow-md">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Join Us
              </h1>
              <p className="white text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
            <UserAuthForm
              formType="register"
              onSubmit={handleSubmit}
            />

            <p className="px-8 text-center text-sm text-muted-foreground">
              or{" "}
              <br />
              <span>
                Have an account?
              </span>{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

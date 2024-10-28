"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangleIcon } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 px-4 text-center space-y-6">
      <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg border border-red-200">
        <AlertTriangleIcon className="w-16 h-16 text-red-400" />
      </div>
      <h1 className="text-3xl font-semibold text-red-800">Something Went Wrong</h1>
      <p className="text-red-600 max-w-md">
        An unexpected error has occurred. Please try again later, or go back to the homepage.
      </p>
      <div className="flex space-x-4">
        <Button variant="default" onClick={() => router.push("/")}>
          Go to Homepage
        </Button>
        <Button variant="outline" onClick={() => router.refresh()}>
          Retry
        </Button>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FrownIcon } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 text-center space-y-6">
      <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <FrownIcon className="w-16 h-16 text-gray-400" />
      </div>
      <h1 className="text-3xl font-semibold text-gray-800">Page Not Found</h1>
      <p className="text-gray-600 max-w-md">
        Oops! The page you are looking for does not exist or may have been moved. Please check the URL or go back to the homepage.
      </p>
      <Button variant="outline" className="mt-4" onClick={() => router.push("/")}>
        Go to Homepage
      </Button>
    </div>
  );
}

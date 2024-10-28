"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { XIcon } from "lucide-react";

export function Toast({ title, description }: { title: string; description: string }) {
  return (
    <ToastPrimitive.Root
      className="bg-white text-gray-900 shadow-lg rounded-lg p-4 border border-gray-300 flex items-start space-x-3"
    >
      <div>
        <h4 className="font-medium text-lg">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <ToastPrimitive.Close asChild>
        <button
          className="text-gray-500 hover:text-gray-700 ml-auto"
          aria-label="Close"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}

export function ToastViewport() {
  return (
    <ToastPrimitive.Viewport className="fixed bottom-4 right-4 flex flex-col space-y-2" />
  );
}

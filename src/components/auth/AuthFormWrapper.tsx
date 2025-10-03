"use client";
import React from "react";

export const AuthFormWrapper: React.FC<{
  children: React.ReactNode;
  formTitle: string;
  formSubtitle: string;
}> = ({ children, formTitle, formSubtitle }) => (
  <div className="flex max-h-fit w-full flex-col items-center justify-center space-y-1 rounded-lg bg-white p-4 max-sm:w-[480px] sm:w-[480px] md:w-[550px] md:space-y-3 lg:p-10">
    <div className="gap-2 text-center select-none">
      <h1 className="text-2xl font-semibold">{formTitle}</h1>
      <p
        className="text-xs text-gray-500"
        dangerouslySetInnerHTML={{ __html: formSubtitle }}
      />
    </div>
    {children}
  </div>
);

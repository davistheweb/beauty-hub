"use client";
import Image from "next/image";
import React from "react";
import { AuthFormWrapper } from "./AuthFormWrapper";

export const AuthWrapper: React.FC<{
  children: React.ReactNode;
  title: string;
  subtitle: string;
  formTitle: string;
  formSubtitle: string;
}> = ({ children, title, subtitle, formTitle, formSubtitle }) => (
  <section className="flex h-screen w-full flex-col justify-center gap-4 bg-[#292F2A] p-4 lg:min-h-screen lg:flex-row lg:justify-around lg:p-10">
    <div className="flex flex-col items-center justify-center lg:hidden">
      <h1 className="text-xl font-medium">{title}</h1>
      <p
        className="hidden text-center md:block"
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    </div>
    <aside className="hidden flex-col items-center justify-center gap-10 text-white lg:flex">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-medium lg:text-4xl">{title}</h1>
        <p
          className="w-[19.5rem]"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      </div>
      <div>
        <Image
          src="/images/authbg.png"
          alt="illustration"
          width={300}
          height={300}
          draggable={false}
        />
      </div>
    </aside>
    <main className="mt-2 flex items-center justify-center md:mt-5 lg:items-start lg:justify-start">
      <AuthFormWrapper
        formTitle={formTitle}
        formSubtitle={formSubtitle}
      >
        {children}
      </AuthFormWrapper>
    </main>
  </section>
);

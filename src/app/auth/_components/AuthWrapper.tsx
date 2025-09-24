"use client";
import Image from "next/image";
import React from "react";
import { AuthFormWrapper } from "./AuthFormWrapper";

export const AuthWrapper: React.FC<{
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  formTitle: string;
  formSubtitle: string;
}> = ({
  children,
  title = "Welcome Back, Admin",
  subtitle = "Manage barbers, users, and appointments seamlessly. <br/> Your control panel for keeping the beauty hub running smoothly.",
  formTitle,
  formSubtitle,
}) => (
  <div className="flex h-full w-full items-center justify-center">
    <section className="flex h-screen max-h-[800px] w-full max-w-[1400px] flex-col lg:items-start justify-center gap-4 bg-[#292F2A] p-4 lg:min-h-screen lg:flex-row lg:justify-around lg:p-10">
      {/* <div className="flex flex-col items-center justify-center lg:hidden">
      <h1 className="text-xl font-medium">{title}</h1>
      <p
        className="hidden text-center md:block"
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    </div> */}
      <aside className="hidden flex-col items-center justify-center gap-10 text-white lg:flex mt-10">
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
      <main className="-mt-20 flex items-center justify-center md:mt-5 lg:items-start lg:justify-start">
        <AuthFormWrapper
          formTitle={formTitle}
          formSubtitle={formSubtitle}
        >
          {children}
        </AuthFormWrapper>
      </main>
    </section>
  </div>
);

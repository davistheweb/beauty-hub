"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function ({ url }: { url: string }) {
  const router = useRouter();
  React.useEffect(() => {
    router.replace(url.startsWith("/") ? url : `/${url}`);
  }, []);

  return null;
}

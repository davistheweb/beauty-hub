"use client";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

export default function Redirect({ url }: { url: string }) {
  const router = useRouter();
  React.useEffect(() => {
    router.replace(url.startsWith("/") ? url : `/${url}`);
  }, [router, url]);

  return null;
}

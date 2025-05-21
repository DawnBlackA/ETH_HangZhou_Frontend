"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/login");
  }, [router]);
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-center">重定向中...</p>
    </div>
  );
} 
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthChecker({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return children;
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../lib/auth";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(isAuthenticated() ? "/dashboard" : "/login");
  }, [router]);

  return (
    <ClientOnly>
      <p>Redirecting...</p>
    </ClientOnly>
  );
}

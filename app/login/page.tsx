"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import ClientOnly from "@/components/ClientOnly";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) router.push("/dashboard");
    else alert("Invalid credentials");
  };

  return (
    <ClientOnly>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="p-6 border rounded shadow">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2 p-2 border w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 p-2 border w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </ClientOnly>
  );
}

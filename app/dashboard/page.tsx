"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/");
      } else {
        setUser(data.session.user);
      }
    }

    checkUser();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Welcome, {user.email}</p>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </main>
  );
}
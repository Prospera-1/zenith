"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function register() {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }

  }

async function login() {
  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    router.push("/dashboard");
  }
}

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Zenith</h1>

      {user ? (
        <>
          <p>Logged in as: {user.email}</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <button
            onClick={register}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Register
          </button>

          <button
            onClick={login}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Login
          </button>
        </>
      )}
    </main>
  );
}
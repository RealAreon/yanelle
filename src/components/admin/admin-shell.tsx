"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const storageKey = "yanelle-admin-access";
const authEvent = "yanelle-admin-auth";

function subscribeToAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(authEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(authEvent, callback);
  };
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const authenticated = useSyncExternalStore(
    subscribeToAuth,
    () => localStorage.getItem(storageKey) === "granted",
    () => false,
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ee] p-6">
        <form
          className="w-full max-w-sm border bg-white p-8"
          onSubmit={(event) => {
            event.preventDefault();
            if (password === "yanelle2026") {
              localStorage.setItem(storageKey, "granted");
              window.dispatchEvent(new Event(authEvent));
            } else setError("Incorrect demo password.");
          }}
        >
          <LockKeyhole className="text-[#c4a574]" />
          <h1 className="mt-6 font-serif text-4xl">Admin access</h1>
          <p className="mt-3 text-xs leading-5 text-neutral-500">Demo-only localStorage gate. This is not production security.</p>
          <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="mt-6 h-11 rounded-none" />
          {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
          <Button type="submit" className="mt-4 h-11 w-full rounded-none">Enter</Button>
        </form>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#1c1917]">
      <header className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/admin" className="font-serif text-xl tracking-[0.25em]">ＹＡＮÈＬＬＥ ADMIN</Link>
        <nav className="flex items-center gap-5 text-xs uppercase tracking-wider">
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
          <button type="button" className="cursor-pointer" onClick={() => { localStorage.removeItem(storageKey); window.dispatchEvent(new Event(authEvent)); }}>Logout</button>
        </nav>
      </header>
      <main className="p-6 lg:p-10">{children}</main>
    </div>
  );
}

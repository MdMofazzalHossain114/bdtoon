"use client";
import { login, logout } from "@/lib/actions/auth";

export default function Home() {
  return (
    <div>
      <h1>You are not signed in</h1>
      <button className="bg-gray-400 p-4" onClick={() => login("github")}>
        Click to Sign in with GitHub
      </button>
    </div>
  );
}

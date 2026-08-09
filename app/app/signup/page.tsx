"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "../../components/Logo";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 md:p-0">
        <div className="grid min-h-[520px] grid-cols-1 overflow-hidden rounded-[32px] md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col justify-center gap-6 bg-white px-8 py-10 sm:px-12 sm:py-12">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Create account</h1>
              <p className="mt-2 text-sm text-slate-600">Set up your FusionNet account to get started.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm text-slate-700">
                Email address
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
                />
              </label>

              <label className="block text-sm text-slate-700">
                Password
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Create a password"
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
                />
              </label>

              {password ? (
                <label className="block text-sm text-slate-700">
                  Confirm password
                  <input
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    type="password"
                    placeholder="Confirm password"
                    className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
                  />
                </label>
              ) : null}

              {error ? <p className="text-sm text-rose-500">{error}</p> : null}

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create account
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
              <span className="h-px flex-1 bg-slate-200"></span>
              or continue with
              <span className="h-px flex-1 bg-slate-200"></span>
            </div>

            <button
              type="button"
              onClick={() => router.push("/home")}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              <Image src="/google.svg" alt="Google icon" width={20} height={20} />
              <span>Continue with Google</span>
            </button>

            <div className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/" className="text-slate-900 font-semibold hover:text-slate-700">
                Sign in
              </Link>
            </div>
          </div>

          <div className="hidden flex-col items-center justify-center gap-6 border-l border-slate-200 bg-slate-50 p-8 sm:p-12 md:flex">
            <div className="h-36 w-36 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64">
              <Logo className="h-full w-full" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-900">FusionNet</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Professional access to your FusionNet workspace. Create your account and manage your network and team activities from one centralized place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

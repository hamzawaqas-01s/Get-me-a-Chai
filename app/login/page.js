"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SOCIAL_PROVIDERS = [
  {
    id: "google",
    label: "Continue with Google",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.7-2.6C16.9 3.4 14.7 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 11.7s4.2 9.3 9.3 9.3c5.4 0 9-3.8 9-9.1 0-.6-.07-1.1-.15-1.6H12z"
        />
      </svg>
    ),
  },
  {
    id: "github",
    label: "Continue with GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2.2C6.5 2.2 2 6.7 2 12.2c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.6 1 1.5 1 2.6 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.5C22 6.7 17.5 2.2 12 2.2z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Continue with Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="#1877F2"
          d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.78 8.44-4.94 8.44-9.94z"
        />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "Continue with LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="#0A66C2"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"
        />
      </svg>
    ),
  },
  {
    id: "x",
    label: "Continue with X",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
        <path d="M13.6 10.6 20.9 2h-1.7l-6.3 7.5L7.9 2H2l7.6 11L2 22h1.7l6.7-8 5.3 8H21l-7.4-11.4zm-2.4 2.8-.8-1.1L4.3 3.3h2.7l5 7.1.8 1.1 6.4 9.2h-2.7l-5.3-7.3z" />
      </svg>
    ),
  },
];

export default function LoginPage({ onSocialLogin, onEmailLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const { data:session } = useSession();

  if(session){
    const router = useRouter()
    router.push("/dashboard")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    try {
      await onEmailLogin?.({ email, password });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F4EDE0] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-105">
        {/* Brand mark */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-2xg font-bold text-[#2B2118] tracking-tight">
            Get me a Chai
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#FBF8F1] border border-[#DDD2BE] rounded-2xl px-8 py-9 shadow-[0_1px_2px_rgba(43,33,24,0.04)]">
          {/* Eyebrow, echoing the "| | Live right now" mark from the site */}
          <div className="flex items-center gap-2 mb-5">
            <span className="flex gap-0.75">
              <span className="w-0.75 h-4 bg-[#8A9A7E] rounded-full" />
              <span className="w-0.75 h-4 bg-[#8A9A7E] rounded-full" />
            </span>
            <span className="text-sm text-[#6B6055]">Welcome back</span>
          </div>

          <h1 className="font-serif text-[28px] leading-[1.15] text-[#2B2118] mb-2">
            Log in to your page
          </h1>
          <p className="text-[15px] text-[#6B6055] mb-7">
            Pick up right where you left off — your chai is waiting.
          </p>

          {/* Social providers */}
          <div className="flex flex-col gap-2.5">
            {SOCIAL_PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                
                type="button"
                onClick={() => signIn(provider.id)}
                className="w-full flex items-center gap-3 border border-[#DDD2BE] bg-white rounded-lg px-4 py-2.5 text-[14.5px] font-medium text-[#2B2118] hover:bg-[#F4EDE0] hover:border-[#C9BBA0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B5652B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F1]"
              >
                {provider.icon}
                <span>{provider.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-[#DDD2BE]" />
            <span className="text-xs text-[#9A8E7E]">or continue with email</span>
            <div className="h-px flex-1 bg-[#DDD2BE]" />
          </div>

          {/* Email / password form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-[#4A4038] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#DDD2BE] bg-white px-3.5 py-2.5 text-[14.5px] text-[#2B2118] placeholder:text-[#B3A793] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B5652B] focus:border-[#B5652B]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-[13px] font-medium text-[#4A4038]"
                >
                  Password
                </label>
                <a
                  href="#forgot-password"
                  className="text-[13px] text-[#B5652B] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#DDD2BE] bg-white px-3.5 py-2.5 pr-11 text-[14.5px] text-[#2B2118] placeholder:text-[#B3A793] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B5652B] focus:border-[#B5652B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A8E7E] hover:text-[#4A4038] text-[12.5px]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 w-full rounded-lg bg-[#B5652B] hover:bg-[#9F5623] disabled:opacity-60 text-white text-[14.5px] font-medium py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B5652B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F1]"
            >
              {submitting ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="text-center text-[13.5px] text-[#6B6055] mt-6">
            New here?{" "}
            <a href="#sign-up" className="text-[#B5652B] font-medium hover:underline">
              Create your page
            </a>
          </p>
        </div>

        <p className="text-center text-[12.5px] text-[#9A8E7E] mt-6 px-6">
          By continuing, you agree to Get me a Chai's{" "}
          <a href="#terms" className="underline hover:text-[#6B6055]">
            Terms
          </a>{" "}
          and{" "}
          <a href="#privacy" className="underline hover:text-[#6B6055]">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
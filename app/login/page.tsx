"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@tremor/react";
import Image from "next/image";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  KeyIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  BeakerIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

interface FormData {
  email: string;
  password: string;
  username: string;
  otp: string;
}

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
      username: "",
      otp: "",
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setProgress(30);

    try {
      const endpoint = showOTP
        ? "/api/auth/verify-otp"
        : isLogin
        ? "/api/auth/login"
        : "/api/auth/register";

      setProgress(60);

      const payload = showOTP
        ? {
            email: formData.email,
            otp: formData.otp.trim(),
          }
        : {
            email: formData.email,
            password: formData.password,
            ...(!isLogin &&
              formData.username && { username: formData.username }),
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setProgress(90);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      setProgress(100);

      if (data.requiresOTP) {
        setShowOTP(true);
        setError(""); // Clear any existing errors
      } else if (data.success) {
        // Add a small delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push("/");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "otp" ? value.replace(/\D/g, "").slice(0, 6) : value,
    }));
  };

  const handleBack = () => {
    setShowOTP(false);
    setFormData((prev) => ({ ...prev, otp: "" }));
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <div className="w-20 h-20 relative mx-auto mb-4">
              <Image
                src="/images/logo.png"
                alt="X-ray Portal Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {showOTP
                ? "Verify Your Email"
                : isLogin
                ? "Welcome Back"
                : "Join Us"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {showOTP
                ? `Enter the code sent to ${formData.email}`
                : isLogin
                ? "Access your medical analysis dashboard"
                : "Create an account to get started"}
            </p>
          </div>

          <Card className="mt-8 p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {showOTP ? (
                // OTP Verification Form
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Code
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="otp"
                        required
                        maxLength={6}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder="Enter 6-digit code"
                        value={formData.otp}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    <ArrowRightIcon className="h-4 w-4 mr-1" />
                    Back to {isLogin ? "login" : "registration"}
                  </button>
                </div>
              ) : (
                // Login/Register Form
                <>
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="username"
                          required
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                          placeholder="Choose a username"
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder={
                          isLogin ? "Enter your password" : "Create a password"
                        }
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </div>
                ) : showOTP ? (
                  "Verify Code"
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Toggle Login/Register */}
              {!showOTP && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      clearForm();
                    }}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Sign in"}
                  </button>
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>

      {/* Right Side - Info & Features */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex-1 flex flex-col justify-between p-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              X-ray Analysis Portal 🇹🇱
            </h1>
            <p className="text-lg text-gray-600 mb-12">
              Advanced medical imaging analysis powered by LLAMA 3.2 AI
              technology
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-6 mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BeakerIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Instant Analysis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get immediate insights from your X-ray images using
                      state-of-the-art AI
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Secure & Private
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your medical data is protected with enterprise-grade
                      security
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <ChartBarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Detailed Reports
                    </h3>
                    <p className="text-sm text-gray-600">
                      Comprehensive analysis with actionable insights
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-auto">
            <div className="border-t border-gray-200 pt-8">
              <blockquote>
                <p className="text-lg text-gray-600 italic">
                  &ldquo;Revolutionizing medical imaging analysis with advanced
                  AI technology&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="text-base font-semibold text-gray-900">
                    Powered by LLAMA 3.2
                  </p>
                  <p className="text-sm text-gray-600">
                    State-of-the-art vision model
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Progress */}
      {loading && (
        <div className="fixed top-0 left-0 w-full">
          <Progress value={progress} className="w-full h-1" />
        </div>
      )}
    </div>
  );
}

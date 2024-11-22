// components/Navbar.tsx
"use client";
import { useState } from "react";
import { FileText, LogOut, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with redirect even if API call fails
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                X-ray Portal
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link
              href="/"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 font-medium"
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 font-medium"
            >
              Features
            </Link>
            <Link
              href="/contact"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 font-medium"
            >
              Contact
            </Link>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 font-medium disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600" />
              ) : (
                <LogOut className="h-5 w-5" />
              )}
              Log Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-900"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/features"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/contact"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 font-medium disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600" />
                ) : (
                  <LogOut className="h-5 w-5" />
                )}
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

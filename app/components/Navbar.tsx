// components/Navbar.tsx
import { FileText } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                X-ray Portal
              </span>
            </div>
          </div>
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <a
              href="/"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 font-medium"
            >
              About
            </a>
            <a
              href="/features"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 font-medium"
            >
              Features
            </a>
            <a
              href="/contact"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 font-medium"
            >
              Contact
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

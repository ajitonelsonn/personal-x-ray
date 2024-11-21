// app/about/page.tsx
"use client";
import Navbar from "../components/Navbar";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Footer from "../components/Footer";

interface DeveloperProfile {
  name: string;
  role: string;
  image: string;
  bio: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

const developer: DeveloperProfile = {
  name: "Ajito Nelson",
  role: "Big Data Engineer | AI Enthusiast",
  image: "/images/ajito.jpg", // Update path to start from public directory
  bio: "Full-stack developer with expertise in AI and medical imaging systems. Passionate about creating healthcare solutions and implementing cutting-edge technologies for better medical analysis.",
  github: "https://github.com/ajitonelsonn",
  linkedin: "https://linkedin.com/in/ajitonelson",
  email: "ajitonelson@example.com",
};

const DeveloperCard = ({ developer }: { developer: DeveloperProfile }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto transition-transform hover:-translate-y-1">
    <div className="md:flex">
      <div className="md:w-1/2">
        <div className="aspect-square w-full overflow-hidden bg-gray-200 relative">
          <Image
            src={developer.image}
            alt={developer.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="md:w-1/2 p-8">
        <h3 className="text-2xl font-semibold text-gray-900">
          {developer.name}
        </h3>
        <p className="text-lg text-blue-600 mb-4">{developer.role}</p>
        <p className="text-gray-600 mb-6">{developer.bio}</p>
        <div className="flex space-x-6">
          {developer.github && (
            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
          )}
          {developer.linkedin && (
            <a
              href={developer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {developer.email && (
            <a
              href={`mailto:${developer.email}`}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        {/* About Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About X-ray Analysis Portal
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our mission is to revolutionize medical imaging analysis through
              advanced AI technology, making accurate diagnoses more accessible
              and efficient for healthcare professionals worldwide.
            </p>
          </div>

          {/* Vision and Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600">
                To empower individuals globally with AI-driven insights from
                medical imaging, offering accessible and accurate
                interpretations of X-rays and other scans to better understand
                and manage their health.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600">
                To revolutionize healthcare by providing both individuals and
                professionals with advanced AI tools that simplify the
                understanding of medical images, ensuring quicker and more
                accurate interpretations to support informed health decisions
                and improved outcomes.
              </p>
            </div>
          </div>

          {/* Team Profile */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              The brilliant mind behind our X-ray Analysis Portal
            </p>
          </div>

          <DeveloperCard developer={developer} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

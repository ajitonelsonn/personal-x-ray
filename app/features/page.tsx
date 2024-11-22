"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Brain,
  Scan,
  Zap,
  ShieldCheck,
  Clock,
  LineChart,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: Brain,
    title: "Advanced AI Model",
    description:
      "Powered by LLAMA 3.2-11B-Vision-Instruct-Turbo, a state-of-the-art large language model specifically tuned for medical image analysis.",
  },
  {
    icon: Scan,
    title: "Precise Analysis",
    description:
      "Accurate interpretation of X-ray images with detailed findings, potential conditions, and professional recommendations.",
  },
  {
    icon: Clock,
    title: "Real-time Processing",
    description:
      "Instant analysis results with minimal processing time, enabling quick medical decision-making.",
  },
  {
    icon: LineChart,
    title: "Comprehensive Reports",
    description:
      "Detailed reports covering key findings, anatomical structures, and potential medical conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Processing",
    description:
      "Advanced security measures to protect sensitive medical data and maintain patient confidentiality.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description:
      "Optimized for speed and accuracy, handling various types of X-ray images with consistent reliability.",
  },
];

const FeatureCard = ({ feature }: { feature: FeatureCard }) => {
  const Icon = feature.icon;
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:-translate-y-1">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {feature.title}
      </h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
};

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by LLAMA 3.2
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform utilizes the advanced LLAMA
              3.2-11B-Vision-Instruct-Turbo model, a cutting-edge AI system
              specifically designed for medical image analysis.
            </p>
          </div>

          {/* Model Information */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About LLAMA 3.2 Model
            </h2>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                LLAMA 3.2-11B-Vision-Instruct-Turbo is a state-of-the-art
                multimodal AI model that combines advanced computer vision
                capabilities with natural language processing. This model has
                been specifically fine-tuned for medical image analysis,
                enabling:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>High-accuracy interpretation of X-ray images</li>
                <li>Natural language explanations of medical findings</li>
                <li>Detailed analysis of anatomical structures</li>
                <li>Identification of potential medical conditions</li>
                <li>Professional medical report generation</li>
              </ul>
              <p>
                With 11 billion parameters, the model provides exceptional
                performance in understanding and analyzing medical imaging data,
                making it a reliable tool for healthcare professionals.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the powerful capabilities of our X-ray analysis platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Experience Advanced X-ray Analysis
              </h3>
              <p className="text-gray-600 mb-6">
                Upload your X-ray image now and see the power of LLAMA 3.2 in
                action
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

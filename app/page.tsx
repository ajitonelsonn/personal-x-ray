// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import {
  Upload,
  Volume2,
  Pause,
  AlertCircle,
  X,
  FileText,
  History,
  Shield,
  Info,
} from "lucide-react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification = ({ message, onClose }: NotificationProps) => {
  return (
    <div className="animate-slide-up fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] bg-white rounded-lg shadow-lg border border-red-100 z-50">
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-red-800">
              Attention required
            </div>
            <div className="mt-1 text-sm text-red-600">{message}</div>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onClose}
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

// Add new ResultsTable component
const ResultsTable = ({ data }: { data: any }) => (
  <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Parameter
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Value
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Object.entries(data).map(([key, value]: [string, any], index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {key}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {value.value}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                ${
                  value.status === "normal"
                    ? "bg-green-100 text-green-800"
                    : value.status === "warning"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {value.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const cleanTextForSpeech = (text: string) => {
  return text.replace(/[•]/g, "").replace(/\n+/g, ". ").trim();
};

const AnalysisDisplay = ({ analysis }: { analysis: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const sections = analysis.split("\n\n").map((section) => section.trim());

  const speakAnalysis = () => {
    if (!speechSynthesis) return;

    speechSynthesis.cancel();
    const cleanedText = cleanTextForSpeech(analysis);
    const utterance = new SpeechSynthesisUtterance(cleanedText);

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const toggleSpeech = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      speakAnalysis();
    }
  };

  return (
    <div className="prose max-w-none">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <h2 className="text-xl font-semibold text-gray-900 m-0">
          Analysis Results
        </h2>
        <button
          onClick={toggleSpeech}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
          aria-label={isPlaying ? "Stop reading" : "Read analysis"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600">Stop</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600">Read Analysis</span>
            </>
          )}
        </button>
      </div>

      <div
        className={`space-y-6 ${
          isPlaying
            ? "bg-blue-50 p-4 rounded-lg transition-colors duration-200"
            : ""
        }`}
      >
        {sections.map((section, index) => {
          const [title, ...content] = section.split("\n");

          return (
            <div key={index} className="mb-6">
              {title.includes(":") && (
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
              )}
              <div className="space-y-2">
                {content.map((line, lineIndex) => (
                  <p key={lineIndex} className="text-gray-700">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // File size validation
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError("File size should be less than 5MB");
        return;
      }

      setLoading(true);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to analyze image");
        }

        setAnalysis(data.analysis);
      } catch (error) {
        console.error("Error analyzing image:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Failed to analyze image";
        setError(errorMessage);
        setAnalysis(null);
        setSelectedImage(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              X-ray Analysis Portal
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Upload your X-ray images for instant AI-powered analysis. Get
              detailed insights and professional medical interpretation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {!selectedImage && (
            <div className="mb-8">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    X-ray image (PNG, JPG, JPEG)
                  </p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}

          {error && (
            <Notification message={error} onClose={() => setError(null)} />
          )}

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Analyzing your X-ray...</p>
            </div>
          )}

          {selectedImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-4 bg-gray-50">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Uploaded X-ray
                </h2>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={selectedImage}
                    alt="Uploaded X-ray"
                    className="object-contain w-full h-full"
                  />
                </div>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysis(null);
                    setError(null);
                  }}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Upload a different image
                </button>
              </div>

              <div className="border rounded-lg p-4">
                {analysis ? (
                  <div className="overflow-y-auto max-h-[600px]">
                    <AnalysisDisplay analysis={analysis} />
                  </div>
                ) : (
                  !loading &&
                  !error && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 text-center">
                        No analysis available yet. Please wait while we process
                        your image.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info Cards moved to bottom */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our X-ray Analysis Portal?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={Shield}
              title="Secure Analysis"
              description="Your medical data is protected with enterprise-grade security"
            />
            <InfoCard
              icon={FileText}
              title="Detailed Reports"
              description="Get comprehensive analysis of your X-ray images"
            />
            <InfoCard
              icon={History}
              title="Quick Results"
              description="Receive instant AI-powered analysis"
            />
            <InfoCard
              icon={Info}
              title="Expert Insights"
              description="Powered by LLMA 3.2 Model"
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

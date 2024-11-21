// app/page.tsx
"use client";
import { useState } from "react";
import { Upload, AlertTriangle } from "lucide-react";

const AnalysisDisplay = ({ analysis }: { analysis: string }) => {
  // Split the analysis into sections
  const sections = analysis.split("\n\n").map((section) => section.trim());

  return (
    <div className="prose max-w-none">
      {sections.map((section, index) => {
        const [title, ...content] = section.split("\n");

        return (
          <div key={index} className="mb-6">
            {title.includes(":") && (
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
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
  );
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to analyze image");
        }

        const data = await response.json();
        setAnalysis(data.analysis);
      } catch (error) {
        console.error("Error analyzing image:", error);
        setError(
          error instanceof Error ? error.message : "Failed to analyze image"
        );
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          X-ray Analysis Portal
        </h1>

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
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Analyzing your X-ray...</p>
            </div>
          )}

          {selectedImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-4">
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
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Analysis Results
                </h2>
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

        <footer className="text-center text-gray-500 text-sm">
          <p>Upload your X-ray image for instant AI-powered analysis</p>
        </footer>
      </div>
    </main>
  );
}

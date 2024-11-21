// app/page.tsx
import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

// Add this component to your page.tsx

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification = ({ message, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative animate-slide-down bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-start gap-3 p-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-red-800">
              Attention required
            </h3>
            <p className="mt-1 text-sm text-red-600">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-1.5 inline-flex text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-100 rounded-b-lg overflow-hidden">
          <div className="h-full bg-red-500 animate-shrink" />
        </div>
      </div>
      {/* Semi-transparent backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10" />
    </div>
  );
};

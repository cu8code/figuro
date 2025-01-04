"use client";

import React, { useEffect, useState } from "react";
import * as deeplab from "../lib/tf_segmentation";
import { createContext } from "react";
import { Loader } from 'lucide-react'; // Importing a loader icon from lucide-react

// Create a context for the model
export const ModelContext = createContext<deeplab.SemanticSegmentation | null>(null);

interface ModelProviderProps {
  children: React.ReactNode;
}

// Loading Spinner Component
const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <Loader className="animate-spin h-16 w-16 text-gray-900 mb-4" />
    <p className="text-lg text-gray-600 text-center">Loading segmentation model...</p>
    <p className="text-sm text-gray-500 text-center">This might take up to a minute, but it will be faster next time!</p>
  </div>
);

// Error Component
const ErrorComponent: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <p className="text-lg text-red-500 text-center">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
    >
      Retry
    </button>
  </div>
);

// Main Model Provider Component
export const ModelProvider: React.FC<ModelProviderProps> = ({ children }) => {
  const [model, setModel] = useState<deeplab.SemanticSegmentation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      console.log("Model loading initiated...");
      try {
        setLoading(true);
        console.time("Model loading time");
        
        const loadedModel = await deeplab.load({
          base: "pascal",
          quantizationBytes: 4,
        });
        
        console.timeEnd("Model loading time");
        console.log("Model loaded successfully:", loadedModel);
        setModel(loadedModel);
      } catch (err) {
        console.error("Failed to load model:", err);
        setError("Failed to load the segmentation model");
      } finally {
        setLoading(false);
        console.log("Model loading process completed.");
      }
    };

    loadModel();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  console.log("Model successfully loaded and available in context.");
  return <ModelContext.Provider value={model}>{children}</ModelContext.Provider>;
};

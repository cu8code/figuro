"use client";

import React, { useEffect, useState } from "react";
import * as deeplab from "../lib/tf_segmentation";
import { createContext } from "react";

export const ModelContext = createContext<deeplab.SemanticSegmentation | null>(null);

interface ModelProviderProps {
  children: React.ReactNode;
}

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
    console.log("Model is currently loading...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-lg text-gray-600">Loading segmentation model...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.log("Error encountered while loading the model:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p className="text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  console.log("Model successfully loaded and available in context.");
  return <ModelContext.Provider value={model}>{children}</ModelContext.Provider>;
};

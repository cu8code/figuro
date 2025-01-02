"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Canvas from "@/components/MaskCanvas";
import { Warning } from "@/components/message";

const MaskEditor: React.FC = () => {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");

  return (
    <div className="flex min-h-screen bg-white text-black relative flex-col">
      {/* Instructions Section moved to the top */}
      <Warning />

    {/* Canvas container with overflow handling */}
    <div className="relative flex-grow overflow-auto mt-4 bg-gray-100 flex justify-center items-center">
        <Canvas imageUrl={imageUrl ?? ""} />
    </div>
    </div>
  );
};

export default MaskEditor;

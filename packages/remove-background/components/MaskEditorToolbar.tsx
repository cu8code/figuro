import React from "react";
import { Download } from "lucide-react";

interface ToolbarProps {
  onDownload: () => void;
  onPreview: () => void;
}

const MaskEditorToolbar: React.FC<ToolbarProps> = ({ onDownload, onPreview }) => (
  <nav className="bg-white border-b p-4 sticky top-0 z-10">
    <div className="max-w-4xl mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Mask Editor</h1>
      <div className="flex gap-2">
        <button
          onClick={onPreview}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
        >
          Preview
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          <Download size={20} />
          Save Image
        </button>
      </div>
    </div>
  </nav>
);

export default MaskEditorToolbar;

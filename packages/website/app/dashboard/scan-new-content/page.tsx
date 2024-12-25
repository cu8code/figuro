"use client";

import { useState } from "react";
import {
  Globe,
  Youtube,
  Instagram,
  CheckCircle,
} from "lucide-react";

export default function ScanNewContent() {
  const [url, setUrl] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleScanSubmit = async () => {
    setIsScanning(true);
    setStatus(null);

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setStatus("Scan Completed. Matches found: 3.");
    }, 3000);
  };

  return (
    <main className="flex-1 bg-gray-100 p-4 space-y-6">
      {/* Page Title */}
      <section>
        <h1 className="text-2xl font-semibold">Scan New Content</h1>
        <p className="text-gray-500">
          Enter the details below to scan your content for copyright violations.
        </p>
      </section>

      {/* Form for Scan */}
      <section className="p-6 rounded border border-gray-300 space-y-4">
        <div>
          <label htmlFor="contentUrl" className="block text-sm font-semibold">
            Content URL
          </label>
          <div className="flex items-center border border-gray-300 rounded mt-2">
            <input
              type="url"
              id="contentUrl"
              className="w-full p-3 bg-gray-50 rounded-l focus:outline-none"
              placeholder="Enter the URL of the content to scan"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <span className="p-3 text-gray-500">
              <Globe size={20} />
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="platform" className="block text-sm font-semibold">
            Platform
          </label>
          <select
            id="platform"
            className="w-full p-3 mt-2 bg-gray-50 rounded border border-gray-300 focus:outline-none"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">Select a platform</option>
            <option value="YouTube">YouTube</option>
            <option value="Instagram">Instagram</option>
            <option value="Website">Website</option>
            <option value="Twitter">Twitter</option>
            <option value="Torrent">Torrent</option>
          </select>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          onClick={handleScanSubmit}
          disabled={isScanning || !url || !platform}
        >
          {isScanning ? "Scanning..." : "Start Scan"}
        </button>
      </section>

      {/* Status Message */}
      {status && (
        <section className="p-6 rounded border border-green-400 flex items-center">
          <CheckCircle className="text-green-500 mr-3" size={24} />
          <div>
            <p className="text-lg font-semibold text-green-500">Scan Status:</p>
            <p>{status}</p>
          </div>
        </section>
      )}

      {/* Section for Scan History or Results */}
      <section className="p-6 rounded border border-gray-300 mt-6">
        <h2 className="text-xl font-semibold mb-4">Previous Scans</h2>
        <div className="space-y-4">
          <div className="p-4 flex items-center border border-gray-300 rounded">
            <Youtube className="text-red-500 mr-4" size={24} />
            <div>
              <p className="font-semibold">Content Title - URL</p>
              <p className="text-sm text-gray-500">Platform: YouTube</p>
              <p className="text-sm text-gray-400">Scan Completed: 12/20/2024</p>
              <span className="text-green-500">Matches Found: 3</span>
            </div>
          </div>
          <div className="p-4 flex items-center border border-gray-300 rounded">
            <Instagram className="text-pink-500 mr-4" size={24} />
            <div>
              <p className="font-semibold">Content Title - URL</p>
              <p className="text-sm text-gray-500">Platform: Instagram</p>
              <p className="text-sm text-gray-400">Scan Completed: 12/19/2024</p>
              <span className="text-red-500">Matches Found: 1</span>
            </div>
          </div>
          <div className="p-4 flex items-center border border-gray-300 rounded">
            <Globe className="text-blue-500 mr-4" size={24} />
            <div>
              <p className="font-semibold">Content Title - URL</p>
              <p className="text-sm text-gray-500">Platform: Website</p>
              <p className="text-sm text-gray-400">Scan Completed: 12/18/2024</p>
              <span className="text-yellow-500">Matches Found: 0</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

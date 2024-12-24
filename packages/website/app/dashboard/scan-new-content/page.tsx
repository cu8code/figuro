"use client"

import { useState } from "react";

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
        <p className="text-gray-500">Enter the details below to scan your content for copyright violations.</p>
      </section>

      {/* Form for Scan */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label htmlFor="contentUrl" className="block text-sm font-semibold">Content URL</label>
          <input
            type="url"
            id="contentUrl"
            className="w-full p-3 mt-2 bg-gray-50 rounded border border-gray-300"
            placeholder="Enter the URL of the content to scan"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="platform" className="block text-sm font-semibold">Platform</label>
          <select
            id="platform"
            className="w-full p-3 mt-2 bg-gray-50 rounded border border-gray-300"
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
        <section className="bg-white p-6 rounded shadow mt-4">
          <p className="text-lg font-semibold">Scan Status:</p>
          <p className="text-green-500">{status}</p>
        </section>
      )}

      {/* Section for Scan History or Results */}
      <section className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-xl font-semibold">Previous Scans</h2>
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-gray-50 rounded">
            <p className="font-semibold">Content Title - URL</p>
            <p className="text-sm text-gray-500">Platform: YouTube</p>
            <p className="text-sm text-gray-400">Scan Completed: 12/20/2024</p>
            <span className="text-green-500">Matches Found: 3</span>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <p className="font-semibold">Content Title - URL</p>
            <p className="text-sm text-gray-500">Platform: Instagram</p>
            <p className="text-sm text-gray-400">Scan Completed: 12/19/2024</p>
            <span className="text-red-500">Matches Found: 1</span>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <p className="font-semibold">Content Title - URL</p>
            <p className="text-sm text-gray-500">Platform: Website</p>
            <p className="text-sm text-gray-400">Scan Completed: 12/18/2024</p>
            <span className="text-yellow-500">Matches Found: 0</span>
          </div>
        </div>
      </section>
      
    </main>
  );
}

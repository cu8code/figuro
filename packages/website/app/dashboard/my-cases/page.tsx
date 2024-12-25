"use client"

import { useState } from "react";

export default function MyCases() {
  const [cases, ] = useState([
    {
      id: 1,
      title: "Copyright Violation on YouTube Channel",
      platform: "YouTube",
      status: "Pending",
      dateFiled: "12/22/2024",
      description: "Violation of copyright detected on the specified YouTube channel.",
    },
    {
      id: 2,
      title: "Pirated Website Usage",
      platform: "Website",
      status: "Resolved",
      dateFiled: "12/20/2024",
      description: "Pirated content detected on the website, action taken to remove.",
    },
    {
      id: 3,
      title: "Infringement on Instagram Account",
      platform: "Instagram",
      status: "Ongoing",
      dateFiled: "12/18/2024",
      description: "Content infringement case is still under review.",
    },
  ]);

  return (
    <main className="flex-1 bg-gray-100 p-4 space-y-6">
      <section>
        <h1 className="text-2xl font-semibold">My Cases</h1>
        <p className="text-gray-500">View and manage your ongoing and resolved cases here.</p>
      </section>

      {/* Cases List */}
      <section className="bg-white p-6 rounded shadow space-y-6">
        <h2 className="text-xl font-semibold">Active Cases</h2>
        <div className="space-y-4">
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="p-4 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold text-lg">{caseItem.title}</h3>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    caseItem.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : caseItem.status === "Resolved"
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {caseItem.status}
                </span>
              </div>
              <p className="text-gray-500 mt-1">{caseItem.description}</p>
              <p className="text-sm text-gray-400 mt-2">Filed on: {caseItem.dateFiled}</p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="#"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details
                </a>
                <a
                  href="#"
                  className="text-red-600 hover:underline text-sm"
                >
                  Contact Support
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

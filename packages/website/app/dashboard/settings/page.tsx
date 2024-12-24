"use client"

import { useState } from "react";

export default function SettingsAndBilling() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("");

  return (
    <main className="flex-1 bg-gray-100 p-4 space-y-6">
      {/* Settings Section */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Settings</h2>
        <form>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </form>
      </section>

      {/* Billing Section */}
      

      
    </main>
  );
}

"use client";

export default function Support() {
    return (
      <section className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Support</h2>
      <p className="mt-4 text-gray-600">
        Need help? Contact our support team for assistance with any issues you might have.
      </p>
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="font-medium">Email Support</h3>
          <p className="text-sm text-gray-500">support@yourcompany.com</p>
        </div>
        <div>
          <h3 className="font-medium">Phone Support</h3>
          <p className="text-sm text-gray-500">+1 234 567 890</p>
        </div>
        <div>
          <h3 className="font-medium">Live Chat</h3>
          <p className="text-sm text-gray-500">Click the chat icon in the bottom-right corner for live support.</p>
        </div>
      </div>

      <button
        onClick={() => alert("Redirecting to Support Page...")}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Support Center
      </button>
    </section>
    )
}
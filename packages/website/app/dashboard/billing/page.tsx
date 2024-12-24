"use client"
import { useState } from "react";

export default function Billings() {
    const [billingPlan, setBillingPlan] = useState("Basic");
    const [cardNumber, setCardNumber] = useState("**** **** **** 1234");
  
    return (
        <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Billing</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Current Plan: <strong>{billingPlan}</strong></p>
        </div>
        <div className="mt-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-600">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            readOnly
            className="mt-1 p-3 w-full border rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => setBillingPlan("Pro")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Upgrade Plan
          </button>
          <button
            onClick={() => alert("Canceling subscription...")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Cancel Plan
          </button>
        </div>
      </section>
    )
}
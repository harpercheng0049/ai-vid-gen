"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const isMonthly = billingCycle === "monthly";

  const plans = [
    {
      name: "Free",
      features: ["30 Credits", "Basic AI Tools", "Limited Video Exports"],
      monthly: 0,
      yearly: 0,
      actionLabel: "Current Plan",
      disabled: true,
    },
    {
      name: "Professional",
      features: [
        "Unlimited Credits",
        "HD Video Exports",
        "Priority Processing",
      ],
      monthly: 9.99,
      yearly: 89.99,
      actionLabel: "Start Now",
      disabled: false,
    },
    {
      name: "Enterprise",
      features: ["Team Collaboration", "Custom Branding", "Dedicated Support"],
      monthly: 99,
      yearly: 999,
      actionLabel: "Start Now",
      disabled: false,
    },
  ];

  return (
    <div className="p-10 text-center">
      <h2 className="font-medium text-4xl text-center mb-4">Pricing Plans</h2>
      <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
        Choose the plan that fits your content creation needs — unlock AI video
        power, expand your reach, and create without limits.
      </p>

      {/* Toggle */}
      <div className="flex justify-center gap-2 mb-10">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            isMonthly ? "bg-black text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle("yearly")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            !isMonthly ? "bg-black text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Yearly
        </button>
      </div>

      {/* Plans */}
      <div className="mt-20 flex flex-col md:flex-row justify-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm border"
          >
            <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
            <ul className="text-gray-600 mb-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <p className="text-xl font-bold mb-4">
              ${isMonthly ? plan.monthly : plan.yearly}
              <span className="text-sm text-gray-500">
                /{isMonthly ? "month" : "year"}
              </span>
            </p>
            <Button
              className={`w-full ${
                plan.disabled
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
              }`}
            >
              {plan.actionLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

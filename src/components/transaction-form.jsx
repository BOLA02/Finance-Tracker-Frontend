"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle, PlusCircle } from "lucide-react";

export function TransactionForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.title || !formData.category || formData.amount <= 0) {
      setMessage({
        type: "error",
        text: "Please fill in all fields with valid values",
      });
      return;
    }

    try {
      await onSubmit(formData);
      setMessage({ type: "success", text: "Transaction added successfully!" });

      setFormData({
        title: "",
        amount: 0,
        category: "",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.message || "Failed to add transaction",
      });
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";

  return (
    <div className="p-6 rounded-xl shadow-lg bg-white border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-blue-100">
          <PlusCircle className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Add Transaction</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-800">Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Monthly Salary"
            value={formData.title}
            onChange={handleChange}
            disabled={isLoading}
            className={inputClass}
          />
        </div>

        {/* Amount */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-800">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="0.00"
            value={formData.amount || ""}
            onChange={handleChange}
            step="0.01"
            min="0"
            disabled={isLoading}
            className={inputClass}
          />
        </div>

        {/* Category + Type */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-800">
              Category
            </label>
            <input
              type="text"
              name="category"
              placeholder="e.g., Food"
              value={formData.category}
              onChange={handleChange}
              disabled={isLoading}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-800">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={isLoading}
              className={inputClass}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-800">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            disabled={isLoading}
            className={inputClass}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 h-10 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add Transaction"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}
    </div>
  );
}

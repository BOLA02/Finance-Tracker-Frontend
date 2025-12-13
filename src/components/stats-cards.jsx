"use client";

import { ArrowUpRight, ArrowDownLeft, DollarSign } from "lucide-react";

export  function StatsCards({ transactions }) {

  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const income = safeTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = safeTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Balance */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${balance.toFixed(2)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-blue-200">
            <DollarSign className="w-6 h-6 text-blue-700" />
          </div>
        </div>
      </div>

      {/* Income */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-green-100 to-green-50 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Income</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${income.toFixed(2)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-green-200">
            <ArrowDownLeft className="w-6 h-6 text-green-700" />
          </div>
        </div>
      </div>

      {/* Expenses */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-red-100 to-red-50 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Expenses</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${expenses.toFixed(2)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-red-200">
            <ArrowUpRight className="w-6 h-6 text-red-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

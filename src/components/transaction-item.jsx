"use client";

import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";

// Simple Card wrapper
function Card({ children, className }) {
  return (
    <div className={`rounded-xl bg-white border shadow-sm ${className || ""}`}>
      {children}
    </div>
  );
}

// Simple Button wrapper
function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-md transition text-red-600 hover:bg-red-100`}
    >
      {children}
    </button>
  );
}

export  function TransactionItem({ transaction, onDelete, isDeleting }) {
  const isIncome = transaction.type === "income";

  const bgGradient = isIncome
    ? "bg-green-50 border-green-200"
    : "bg-red-50 border-red-200";

  const iconBg = isIncome ? "bg-green-100" : "bg-red-100";
  const iconColor = isIncome ? "text-green-600" : "text-red-600";
  const amountColor = isIncome ? "text-green-600" : "text-red-600";

  return (
    <Card className={`p-4 flex items-center justify-between ${bgGradient}`}>
      <div className="flex items-center gap-4 flex-1">
        {/* Icon Bubble */}
        <div className={`p-3 rounded-lg ${iconBg}`}>
          {isIncome ? (
            <TrendingUp className={`w-5 h-5 ${iconColor}`} />
          ) : (
            <TrendingDown className={`w-5 h-5 ${iconColor}`} />
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">
            {transaction.title}
          </h3>

          <div className="flex gap-3 mt-1.5 text-xs text-gray-500">
            <span className="capitalize px-2 py-1 rounded bg-gray-200 text-gray-700">
              {transaction.category}
            </span>

            <span>{format(new Date(transaction.date), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </div>

      {/* Amount + Delete Btn */}
      <div className="flex items-center gap-4">
        <span className={`text-lg font-bold ${amountColor}`}>
          {isIncome ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
        </span>

        <Button onClick={() => onDelete(transaction.id)} disabled={isDeleting}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

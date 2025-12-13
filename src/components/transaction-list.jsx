"use client"

import { useEffect, useState } from "react"
import {
  getAllTransactions,
  getIncomeTransactions,
  getExpenseTransactions,
  deleteTransaction,
} from "@/lib/api"
import { TransactionItem } from "./transaction-item"
import { AlertCircle, Loader2, RefreshCw } from "lucide-react"

export function TransactionList({ filter = "all", refreshTrigger = 0 }) {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

useEffect(() => {
  const fetchTransactions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      let data
      if (filter === "income") {
        data = await getIncomeTransactions()
      } else if (filter === "expense") {
        data = await getExpenseTransactions()
      } else {
        data = await getAllTransactions()
      }

      // ensure array
      setTransactions(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || "Failed to load transactions")
      setTransactions([])
    } finally {
      setIsLoading(false)
    }
  }

  fetchTransactions()
}, [filter, refreshTrigger])


  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return

    setDeletingId(id)
    try {
      await deleteTransaction(id)
      setTransactions(transactions.filter((t) => t.id !== id))
    } catch (err) {
      setError("Failed to delete transaction")
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-500 text-sm">Loading transactions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border border-red-300 rounded-lg space-y-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700">Unable to Load Transactions</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <p className="text-xs text-gray-500 mt-2">
              Make sure your backend server is running at the configured API URL.
            </p>
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex p-3 rounded-lg bg-gray-200 mb-4">
          <AlertCircle className="w-6 h-6 text-gray-500" />
        </div>
        <p className="text-lg font-semibold text-gray-800">No transactions yet</p>
        <p className="text-sm text-gray-500 mt-2">
          Start by adding your first transaction using the form on the left
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={handleDelete}
          isDeleting={deletingId === transaction.id}
        />
      ))}
    </div>
  )
}

"use client";

import { useState, useCallback, useEffect } from "react";
import {TransactionList} from "./transaction-list";
import {TransactionForm } from "./transaction-form";
import {StatsCards} from "./stats-cards";

import { createTransaction, getAllTransactions } from "@/lib/api";

import { Filter } from "lucide-react";

// Simple Button component
function Button({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={
        `px-4 py-2 rounded-md text-sm font-medium transition ` +
        (active
          ? "bg-blue-600 text-white shadow"
          : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100")
      }
    >
      {children}
    </button>
  );
}

// Simple Card component
function Card({ children, className }) {
  return (
    <div className={`rounded-xl bg-white shadow ${className || ""}`}>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data || []);
      } catch {
        setTransactions([]);
      } finally {
        setIsLoadingStats(false);
      }
    };

    loadTransactions();
  }, [refreshTrigger]);

  const handleAddTransaction = useCallback(async (transaction) => {
    setIsSubmitting(true);
    try {
      await createTransaction(transaction);
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Finance Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Monitor your income and expenses in real-time
          </p>
        </div>

        {/* Stats Cards */}
        {!isLoadingStats && <StatsCards transactions={transactions} />}

        {/* Main Content Area */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form Column */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <TransactionForm
                onSubmit={handleAddTransaction}
                isLoading={isSubmitting}
              />
            </Card>
          </div>

          {/* Transactions Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Filter Section */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-800">Filter By</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setFilter("all")} active={filter === "all"}>
                  All Transactions
                </Button>

                <Button onClick={() => setFilter("income")} active={filter === "income"}>
                  Income
                </Button>

                <Button onClick={() => setFilter("expense")} active={filter === "expense"}>
                  Expenses
                </Button>
              </div>
            </Card>

            {/* Transactions List */}
            <Card className="p-6">
              <TransactionList filter={filter} refreshTrigger={refreshTrigger} />
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}

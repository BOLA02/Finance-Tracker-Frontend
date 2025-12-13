const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
console.log("API Base URL:", API_BASE_URL)
const BASE = `${API_BASE_URL}/transactions`

export async function getAllTransactions() {
  const res = await fetch(`${BASE}/`)
  if (!res.ok) throw new Error("Failed to fetch transactions")
  const data = await res.json()
  return data.transactions || []
}

export async function getIncomeTransactions() {
  const res = await fetch(`${BASE}/income`)
  if (!res.ok) throw new Error("Failed to fetch income transactions")
  const data = await res.json()
  return data.transactions || []
}

export async function getExpenseTransactions() {
  const res = await fetch(`${BASE}/expense`)
  if (!res.ok) throw new Error("Failed to fetch expense transactions")
  const data = await res.json()
  return data.transactions || []
}

export async function createTransaction(payload) {
  const res = await fetch(`${BASE}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create transaction")
  return await res.json()
}

export async function deleteTransaction(id) {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) throw new Error("Failed to delete transaction")
}

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [balance, setBalance] = useState(() => {
    return localStorage.getItem("balance") || "0";
  });
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, transactions]);

  const addTransaction = () => {
    if (!description || !amount) return;
    const value = parseFloat(amount) * (type === "expense" ? -1 : 1);
    const newTransaction = {
      id: transactions.length + 1,
      description,
      amount: value,
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTransaction, ...transactions]);
    setBalance((prev) => (parseFloat(prev) + value).toString());
    setDescription("");
    setAmount("");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center p-4 bg-black text-white">
      <h1 className="text-3xl font-bold text-center text-white">MoneyMate</h1>
      <div className="mt-4 p-4 w-full max-w-lg rounded-lg border border-white">
        <h2 className="text-lg text-white">Balance:</h2>
        <input
          type="text"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="w-full p-2 mt-2 rounded text-white bg-transparent border border-white"
        />
      </div>
      <div className="mt-4 w-full max-w-lg p-4 rounded-lg">
        <h2 className="text-lg font-bold text-white">Add Transaction</h2>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mt-2 rounded text-white bg-transparent border border-white"
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mt-2 rounded text-white bg-transparent border border-white"
        />
        <div className="flex justify-between mt-2">
          <button
            onClick={() => setType("income")}
            className={`p-2 w-1/2 rounded border border-green-500 transition-all duration-300 ${type === "income" ? "bg-green-500 text-white" : "bg-transparent text-white"}`}
          >
            Income
          </button>
          <button
            onClick={() => setType("expense")}
            className={`p-2 w-1/2 rounded border border-red-500 transition-all duration-300 ${type === "expense" ? "bg-red-500 text-white" : "bg-transparent text-white"}`}
          >
            Expense
          </button>
        </div>
        <button
          onClick={addTransaction}
          className="w-full mt-2 p-2 border border-white text-white rounded transition-all duration-300 hover:bg-white hover:text-black"
        >
          Add
        </button>
      </div>
      <div className="mt-4 w-full max-w-lg h-64 overflow-y-auto p-4 rounded-lg border border-white">
        <h2 className="text-lg font-bold text-white">Transactions</h2>
        <ul className="mt-2 space-y-2">
          {transactions.map((tx) => (
            <li key={tx.id} className="p-2 rounded flex justify-between shadow-lg text-white border border-white">
              <span>{tx.description}</span>
              <span className={tx.amount < 0 ? "text-green-400" : "text-red-400"}>
                {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

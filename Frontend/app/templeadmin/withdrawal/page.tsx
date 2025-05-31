"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet, TrendingUp, Copy, ExternalLink } from "lucide-react"

export default function Withdrawal() {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin")
  const [amount, setAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")

  const cryptoBalances = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", balance: "2.45", usdValue: "₹20,15,000", icon: "₿" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", balance: "15.8", usdValue: "₹8,50,000", icon: "Ξ" },
    { id: "usdt", name: "Tether", symbol: "USDT", balance: "5000", usdValue: "₹4,15,000", icon: "₮" },
  ]

  const recentTransactions = [
    { type: "Withdrawal", amount: "0.5 BTC", date: "2023-06-15", status: "Completed", hash: "0x8f7d...3b2a" },
    { type: "Withdrawal", amount: "2.0 ETH", date: "2023-06-10", status: "Pending", hash: "0x2a1b...9c4d" },
    { type: "Withdrawal", amount: "1000 USDT", date: "2023-06-05", status: "Completed", hash: "0x7e3f...5d2c" },
  ]

  const handleWithdraw = () => {
    // Handle withdrawal logic here
    console.log("Withdrawing:", { selectedCrypto, amount, walletAddress })
  }

  return (
    <div className="p-8 space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cryptocurrency Withdrawal</h1>
          <p className="text-gray-600 mt-2">Manage and withdraw your temple's cryptocurrency funds</p>
        </div>
      </motion.div>

      {/* Crypto Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cryptoBalances.map((crypto, index) => (
          <motion.div
            key={crypto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{crypto.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{crypto.name}</h3>
                  <p className="text-gray-600 text-sm">{crypto.symbol}</p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-800">
                {crypto.balance} {crypto.symbol}
              </p>
              <p className="text-gray-600">{crypto.usdValue}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Withdrawal Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Withdraw Cryptocurrency</h2>

          <div className="space-y-6">
            {/* Select Cryptocurrency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Cryptocurrency</label>
              <select
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {cryptoBalances.map((crypto) => (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name} ({crypto.symbol}) - {crypto.balance} available
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {cryptoBalances.find((c) => c.id === selectedCrypto)?.symbol}
                </span>
              </div>
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Wallet Address</label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter wallet address"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Network Fee */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Network Fee</span>
                <span className="font-medium text-gray-800">0.0005 BTC</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">You will receive</span>
                <span className="font-bold text-gray-800">
                  {amount ? (Number.parseFloat(amount) - 0.0005).toFixed(4) : "0.0000"} BTC
                </span>
              </div>
            </div>

            {/* Withdraw Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWithdraw}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2"
            >
              <Wallet className="w-5 h-5" />
              <span>Withdraw Cryptocurrency</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Transactions</h2>

          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.type}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{transaction.amount}</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-mono">{transaction.hash}</span>
                  <div className="flex space-x-2">
                    <button className="text-orange-500 hover:text-orange-600">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="text-orange-500 hover:text-orange-600">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

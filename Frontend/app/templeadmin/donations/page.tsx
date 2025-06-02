"use client"

import { motion } from "framer-motion"
import { Search, Calendar, Filter, Download, ExternalLink } from "lucide-react"
import AuthWrapper from "@/app/components/AuthWrapper"

const donations = [
  {
    id: "DON-001",
    donor: "Rajesh Sharma",
    amount: "₹25,000",
    date: "17/5/2023",
    mode: "UPI",
    hash: "0x8f7d...3b2a",
    status: "Verified",
  },
  {
    id: "DON-002",
    donor: "Priya Patel",
    amount: "₹10,000",
    date: "16/5/2023",
    mode: "Credit Card",
    hash: "0x2a1b...9c4d",
    status: "Verified",
  },
  {
    id: "DON-003",
    donor: "Amit Singh",
    amount: "₹50,000",
    date: "15/5/2023",
    mode: "Bank Transfer",
    hash: "0x7e3f...5d2c",
    status: "Verified",
  },
  {
    id: "DON-004",
    donor: "Sunita Gupta",
    amount: "₹5,000",
    date: "14/5/2023",
    mode: "UPI",
    hash: "0x4b2c...8e1a",
    status: "Verified",
  },
  {
    id: "DON-005",
    donor: "Anonymous",
    amount: "₹15,000",
    date: "13/5/2023",
    mode: "Cash",
    hash: "0x9d4e...2f7b",
    status: "Verified",
  },
]

export default function Donations() {
  return (
    <AuthWrapper role="templeAdmin">
      <div className="p-8 space-y-6 h-full overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Donations</h1>
            <p className="text-gray-600 mt-2">Track and manage all donations received by the temple</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </motion.button>
        </motion.div>

        {/* Donation Tracker Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">Donation Tracker</h2>
          <p className="text-gray-600 mb-6">Track and manage all donations received by the temple</p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search donations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Pick a date</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Filter</span>
            </motion.button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-medium text-gray-600">ID</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Donor</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Payment Mode</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Blockchain Hash</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <motion.tr
                    key={donation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-800">{donation.id}</td>
                    <td className="py-4 px-4 text-gray-800 font-medium">{donation.donor}</td>
                    <td className="py-4 px-4 text-gray-800 font-bold">{donation.amount}</td>
                    <td className="py-4 px-4 text-gray-600">{donation.date}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {donation.mode}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-mono text-sm">{donation.hash}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {donation.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">Previous</button>
            <button className="px-3 py-2 bg-orange-500 text-white rounded-lg">1</button>
            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">2</button>
            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">Next</button>
          </div>
        </motion.div>
      </div>
    </AuthWrapper>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Share2, Eye, X } from "lucide-react"

const initialCampaigns = [
  {
    id: 1,
    title: "Renovate Bhakt Niwas",
    description: "Renovation of the pilgrim rest house to accommodate more devotees",
    progress: 60,
    raised: "₹15,00,000",
    goal: "₹25,00,000",
    status: "Active",
    startDate: "1/4/2023",
    endDate: "31/7/2023",
  },
  {
    id: 2,
    title: "Temple Kitchen Expansion",
    description: "Expanding the temple kitchen to serve more prasad daily",
    progress: 85,
    raised: "₹8,50,000",
    goal: "₹10,00,000",
    status: "Active",
    startDate: "15/3/2023",
    endDate: "15/6/2023",
  },
  {
    id: 3,
    title: "Annual Festival Fund",
    description: "Fundraising for the annual Ram Navami celebrations",
    progress: 100,
    raised: "₹5,00,000",
    goal: "₹5,00,000",
    status: "Completed",
    startDate: "1/2/2023",
    endDate: "30/4/2023",
  },
]

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    goal: "",
    startDate: "",
    endDate: "",
  })

  const handleAddCampaign = () => {
    if (
      newCampaign.title &&
      newCampaign.description &&
      newCampaign.goal &&
      newCampaign.startDate &&
      newCampaign.endDate
    ) {
      const campaign = {
        id: campaigns.length + 1,
        title: newCampaign.title,
        description: newCampaign.description,
        progress: 0,
        raised: "₹0",
        goal: `₹${newCampaign.goal}`,
        status: "Active",
        startDate: newCampaign.startDate,
        endDate: newCampaign.endDate,
      }
      setCampaigns([...campaigns, campaign])
      setNewCampaign({ title: "", description: "", goal: "", startDate: "", endDate: "" })
      setShowAddForm(false)
    }
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
          <h1 className="text-3xl font-bold text-gray-800">Campaigns</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Campaign</span>
        </motion.button>
      </motion.div>

      {/* Add Campaign Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Create New Campaign</h2>
                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Title</label>
                  <input
                    type="text"
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                    placeholder="Enter campaign title"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                    placeholder="Enter campaign description"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Goal Amount (₹)</label>
                  <input
                    type="number"
                    value={newCampaign.goal}
                    onChange={(e) => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                    placeholder="Enter goal amount"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newCampaign.startDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={newCampaign.endDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCampaign}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium"
                  >
                    Create Campaign
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            {/* Campaign Image Placeholder */}
            <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl mb-6 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🏛️</span>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">{campaign.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    campaign.status === "Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm">{campaign.description}</p>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-bold text-gray-800">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${campaign.progress}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Funding Info */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Raised</p>
                  <p className="font-bold text-gray-800">{campaign.raised}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Goal</p>
                  <p className="font-bold text-gray-800">{campaign.goal}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="text-sm text-gray-600">
                <p>Started: {campaign.startDate}</p>
                <p>Ends: {campaign.endDate}</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg font-medium shadow-lg flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

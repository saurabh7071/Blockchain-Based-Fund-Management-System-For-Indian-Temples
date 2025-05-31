"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Calendar, Clock, MapPin, Share2, Edit, X } from "lucide-react"

const initialEvents = [
  {
    id: 1,
    title: "Ram Navami Celebration",
    description: "Annual celebration of Lord Ram's birth",
    date: "30/6/2023",
    time: "06:00 AM - 09:00 PM",
    type: "Festival",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Hanuman Jayanti",
    description: "Celebration of Lord Hanuman's birth",
    date: "15/7/2023",
    time: "06:00 AM - 09:00 PM",
    type: "Festival",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Bhagavad Gita Discourse",
    description: "Weekly discourse on Bhagavad Gita by Swami Ramdev",
    date: "25/6/2023",
    time: "06:00 PM - 08:00 PM",
    type: "Discourse",
    status: "Upcoming",
  },
  {
    id: 4,
    title: "Saraswati Puja",
    description: "Special puja for Goddess Saraswati",
    date: "20/6/2023",
    time: "10:00 AM - 12:00 PM",
    type: "Puja",
    status: "Upcoming",
  },
]

const initialNotices = [
  {
    id: 1,
    title: "Temple Renovation Notice",
    description:
      "The main hall will be under renovation from June 15-20. Please use the side entrance during this period.",
    priority: "High",
    postedOn: "10/6/2023",
  },
  {
    id: 2,
    title: "Change in Aarti Timing",
    description: "Evening Aarti timing has been changed to 7:30 PM from 7:00 PM starting June 25.",
    priority: "Medium",
    postedOn: "18/6/2023",
  },
  {
    id: 3,
    title: "Special Prasad Distribution",
    description: "Special prasad will be distributed after morning Aarti on June 30.",
    priority: "Low",
    postedOn: "25/6/2023",
  },
]

export default function Events() {
  const [activeTab, setActiveTab] = useState("events")
  const [events, setEvents] = useState(initialEvents)
  const [notices, setNotices] = useState(initialNotices)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showNoticeForm, setShowNoticeForm] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "",
  })
  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
    priority: "Medium",
  })

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.date && newEvent.time && newEvent.type) {
      const event = {
        id: events.length + 1,
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        time: newEvent.time,
        type: newEvent.type,
        status: "Upcoming",
      }
      setEvents([...events, event])
      setNewEvent({ title: "", description: "", date: "", time: "", type: "" })
      setShowEventForm(false)
    }
  }

  const handleAddNotice = () => {
    if (newNotice.title && newNotice.description) {
      const notice = {
        id: notices.length + 1,
        title: newNotice.title,
        description: newNotice.description,
        priority: newNotice.priority,
        postedOn: new Date().toLocaleDateString(),
      }
      setNotices([notice, ...notices])
      setNewNotice({ title: "", description: "", priority: "Medium" })
      setShowNoticeForm(false)
    }
  }

  const sortedNotices = [...notices].sort((a, b) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
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
          <h1 className="text-3xl font-bold text-gray-800">Events & Notices</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (activeTab === "events" ? setShowEventForm(true) : setShowNoticeForm(true))}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>{activeTab === "events" ? "Add Event" : "Add Notice"}</span>
        </motion.button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex space-x-2"
      >
        {["events", "notices"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-medium transition-all capitalize ${
              activeTab === tab
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showEventForm && (
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
                <h2 className="text-xl font-bold text-gray-800">Add New Event</h2>
                <button onClick={() => setShowEventForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Enter event description"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    placeholder="e.g., 06:00 AM - 09:00 PM"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Festival">Festival</option>
                    <option value="Puja">Puja</option>
                    <option value="Discourse">Discourse</option>
                    <option value="Ceremony">Ceremony</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowEventForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Notice Modal */}
      <AnimatePresence>
        {showNoticeForm && (
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
                <h2 className="text-xl font-bold text-gray-800">Add New Notice</h2>
                <button onClick={() => setShowNoticeForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Title</label>
                  <input
                    type="text"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="Enter notice title"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newNotice.description}
                    onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                    placeholder="Enter notice description"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowNoticeForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNotice}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium"
                  >
                    Add Notice
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {activeTab === "events" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">Upcoming Events</h2>
          <p className="text-gray-600 mb-6">Manage temple events, festivals, and special occasions</p>

          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {event.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 rounded-lg shadow-lg"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">Temple Notices</h2>
          <p className="text-gray-600 mb-6">Manage important announcements and notices</p>

          <div className="space-y-4">
            {sortedNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{notice.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(notice.priority)}`}
                      >
                        {notice.priority} Priority
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{notice.description}</p>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Posted on: {notice.postedOn}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

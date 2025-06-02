"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Upload, Clock, Globe, Facebook, Instagram, Youtube, Twitter } from "lucide-react"
import AuthWrapper from "@/app/components/AuthWrapper"



export default function TempleInfo() {
  const [activeTab, setActiveTab] = useState("general")
  const [templeData, setTempleData] = useState({
    name: "Shree Ram Temple",
    description:
      "Shree Ram Temple is a historic temple dedicated to Lord Ram, built in the traditional architectural style. The temple serves as a spiritual center for the community and hosts various religious ceremonies throughout the year.",
    address: "123 Temple Street, Ayodhya, Uttar Pradesh, India - 224123",
    phone: "+91 9876543210",
    email: "info@shreeratemple.org",
    history: "",
  })

  const [socialMedia, setSocialMedia] = useState({
    website: "https://www.shreeratemple.org",
    facebook: "https://facebook.com/shreeratemple",
    instagram: "https://instagram.com/shreeratemple",
    youtube: "https://youtube.com/shreeratemple",
    twitter: "https://twitter.com/shreeratemple",
  })

  const [timings, setTimings] = useState({
    monday: { opening: "05:00", closing: "21:00" },
    tuesday: { opening: "05:00", closing: "21:00" },
    wednesday: { opening: "05:00", closing: "21:00" },
    thursday: { opening: "05:00", closing: "21:00" },
    friday: { opening: "05:00", closing: "21:00" },
    saturday: { opening: "05:00", closing: "21:00" },
    sunday: { opening: "05:00", closing: "21:00" },
    morningAarti: "06:00",
    eveningAarti: "19:00",
  })

  const [images, setImages] = useState([
    { id: 1, name: "Temple Front View", url: null },
    { id: 2, name: "Inner Sanctum", url: null },
    { id: 3, name: "Temple Garden", url: null },
  ])

  const handleSave = () => {
    console.log("Saving temple information...")
    // Handle save logic here
  }

  const handleImageUpload = (imageId) => {
    // Handle image upload logic here
    console.log("Uploading image for:", imageId)
  }

  const handleImageRemove = (imageId) => {
    setImages(images.map((img) => (img.id === imageId ? { ...img, url: null } : img)))
  }

  const renderGeneralTab = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Temple Name</label>
        <input
          type="text"
          value={templeData.name}
          onChange={(e) => setTempleData({ ...templeData, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          rows={4}
          value={templeData.description}
          onChange={(e) => setTempleData({ ...templeData, description: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          rows={3}
          value={templeData.address}
          onChange={(e) => setTempleData({ ...templeData, address: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={templeData.phone}
            onChange={(e) => setTempleData({ ...templeData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={templeData.email}
            onChange={(e) => setTempleData({ ...templeData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Temple History</label>
        <textarea
          rows={6}
          value={templeData.history}
          onChange={(e) => setTempleData({ ...templeData, history: e.target.value })}
          placeholder="Share the history and significance of your temple..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
      </div>
    </motion.div>
  )

  const renderImagesTab = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Temple Images</h3>
        <p className="text-gray-600 mb-6">Upload images of your temple to showcase its beauty</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="space-y-4">
            <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
              {image.url ? (
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No image uploaded</p>
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">{image.name}</h4>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleImageUpload(image.id)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200"
                >
                  Replace
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleImageRemove(image.id)}
                  className="bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600"
                >
                  Remove
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg flex items-center space-x-2"
      >
        <Upload className="w-5 h-5" />
        <span>Upload New Image</span>
      </motion.button>
    </motion.div>
  )

  const renderTimingsTab = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Temple Timings</h3>
        <p className="text-gray-600 mb-6">Set the opening and closing times for your temple</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 font-medium text-gray-600 border-b pb-2">
          <span>Day</span>
          <span>Opening Time</span>
          <span>Closing Time</span>
        </div>

        {Object.entries(timings)
          .slice(0, 7)
          .map(([day, times]) => (
            <div key={day} className="grid grid-cols-3 gap-4 items-center">
              <span className="font-medium text-gray-800 capitalize">{day}</span>
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  value={times.opening}
                  onChange={(e) =>
                    setTimings({
                      ...timings,
                      [day]: { ...times, opening: e.target.value },
                    })
                  }
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  value={times.closing}
                  onChange={(e) =>
                    setTimings({
                      ...timings,
                      [day]: { ...times, closing: e.target.value },
                    })
                  }
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
      </div>

      <div className="border-t pt-6">
        <h4 className="font-bold text-gray-800 mb-4">Special Timings for Aarti</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Morning Aarti</label>
            <div className="flex items-center space-x-2">
              <input
                type="time"
                value={timings.morningAarti}
                onChange={(e) => setTimings({ ...timings, morningAarti: e.target.value })}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Evening Aarti</label>
            <div className="flex items-center space-x-2">
              <input
                type="time"
                value={timings.eveningAarti}
                onChange={(e) => setTimings({ ...timings, eveningAarti: e.target.value })}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderSocialMediaTab = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Social Media Links</h3>
        <p className="text-gray-600 mb-6">Connect your temple's social media accounts</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Website</span>
          </label>
          <input
            type="url"
            value={socialMedia.website}
            onChange={(e) => setSocialMedia({ ...socialMedia, website: e.target.value })}
            placeholder="https://www.yourtemple.org"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
          </label>
          <input
            type="url"
            value={socialMedia.facebook}
            onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
            placeholder="https://facebook.com/yourtemple"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </label>
          <input
            type="url"
            value={socialMedia.instagram}
            onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
            placeholder="https://instagram.com/yourtemple"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <Youtube className="w-4 h-4" />
            <span>YouTube</span>
          </label>
          <input
            type="url"
            value={socialMedia.youtube}
            onChange={(e) => setSocialMedia({ ...socialMedia, youtube: e.target.value })}
            placeholder="https://youtube.com/yourtemple"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <Twitter className="w-4 h-4" />
            <span>Twitter</span>
          </label>
          <input
            type="url"
            value={socialMedia.twitter}
            onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
            placeholder="https://twitter.com/yourtemple"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
    </motion.div>
  )

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
            <h1 className="text-3xl font-bold text-gray-800">Temple Information</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </motion.button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-2"
        >
          {[
            { id: "general", label: "General" },
            { id: "images", label: "Images" },
            { id: "timings", label: "Timings" },
            { id: "social", label: "Social Media" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          {activeTab === "general" && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-2">General Information</h2>
              <p className="text-gray-600 mb-6">Update the basic information about your temple</p>
              {renderGeneralTab()}
            </>
          )}
          {activeTab === "images" && renderImagesTab()}
          {activeTab === "timings" && renderTimingsTab()}
          {activeTab === "social" && renderSocialMediaTab()}
        </motion.div>
      </div>
    </AuthWrapper>
  )
}

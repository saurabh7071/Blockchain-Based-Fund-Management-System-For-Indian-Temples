"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthWrapper from "@/app/components/AuthWrapper";
import LogoutButton from "@/app/components/LogoutButton";
import {
  BarChart3,
  Heart,
  Image,
  DollarSign,
  Calendar,
  Settings,
  User,
  Menu,
  X,
  TrendingUp,
  Users,
  IndianRupee,
  LogOut,
  ChevronUp,
  Plus,
} from "lucide-react";

const TempleAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "donations", label: "Donations", icon: Heart },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "expenses", label: "Expenses", icon: DollarSign },
    { id: "events", label: "Events", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    templeName: string;
    templeLocation: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (!user) {
      router.push("/templelogin");
    } else {
      setUserData(JSON.parse(user));
    }
  }, [router]);
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Donations
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹2,45,680
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <IndianRupee className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12.5%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Monthly Expenses
                    </p>
                    <p className="text-2xl font-bold text-gray-900">₹45,320</p>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-red-600">+5.2%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Events
                    </p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-500">3 upcoming this week</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Devotees
                    </p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600">+23</span>
                  <span className="text-gray-500 ml-1">new this month</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Donations
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Rajesh Kumar",
                      amount: "₹5,000",
                      time: "2 hours ago",
                      type: "General Fund",
                    },
                    {
                      name: "Priya Sharma",
                      amount: "₹2,500",
                      time: "4 hours ago",
                      type: "Festival Fund",
                    },
                    {
                      name: "Anonymous",
                      amount: "₹10,000",
                      time: "6 hours ago",
                      type: "Construction",
                    },
                    {
                      name: "Amit Patel",
                      amount: "₹1,000",
                      time: "1 day ago",
                      type: "General Fund",
                    },
                  ].map((donation, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {donation.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {donation.type} • {donation.time}
                        </p>
                      </div>
                      <span className="font-semibold text-green-600">
                        {donation.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Diwali Celebration",
                      date: "Nov 12, 2024",
                      attendees: "500+",
                    },
                    {
                      name: "Monthly Abhishek",
                      date: "Nov 15, 2024",
                      attendees: "200+",
                    },
                    {
                      name: "Bhajan Sandhya",
                      date: "Nov 18, 2024",
                      attendees: "150+",
                    },
                    {
                      name: "Annakut Festival",
                      date: "Nov 25, 2024",
                      attendees: "800+",
                    },
                  ].map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {event.name}
                        </p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {event.attendees}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "donations":
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Donation Management
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold">Rajesh Kumar</h3>
                  <p className="text-gray-600">
                    rajesh@email.com • +91 98765 43210
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹5,000</p>
                  <p className="text-sm text-gray-500">General Fund</p>
                </div>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold">Priya Sharma</h3>
                  <p className="text-gray-600">
                    priya@email.com • +91 87654 32109
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹2,500</p>
                  <p className="text-sm text-gray-500">Festival Fund</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "gallery":
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Temple Gallery
              </h2>
              <button
                onClick={() => setShowAddPhotoModal(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Photo</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Diwali Celebration 2024",
                  description: "Beautiful decorations during Diwali festival",
                },
                {
                  title: "Morning Aarti",
                  description: "Daily morning prayer session",
                },
                {
                  title: "Temple Renovation",
                  description: "Recent renovation of the main hall",
                },
                {
                  title: "Festival Preparations",
                  description: "Volunteers preparing for upcoming festival",
                },
                {
                  title: "Evening Prayer",
                  description: "Devotees during evening prayer",
                },
                {
                  title: "Temple Architecture",
                  description: "Beautiful carved pillars of the temple",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <Image className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "expenses":
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Expense Management
              </h2>
              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Expense</span>
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  category: "Maintenance",
                  amount: "₹15,000",
                  date: "Nov 10, 2024",
                  description: "Temple cleaning and repairs",
                },
                {
                  category: "Utilities",
                  amount: "₹8,500",
                  date: "Nov 09, 2024",
                  description: "Electricity and water bills",
                },
                {
                  category: "Festival Supplies",
                  amount: "₹12,000",
                  date: "Nov 08, 2024",
                  description: "Decorations and materials for Diwali",
                },
                {
                  category: "Staff Salary",
                  amount: "₹25,000",
                  date: "Nov 01, 2024",
                  description: "Monthly salary for temple staff",
                },
              ].map((expense, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{expense.category}</h3>
                      <p className="font-bold text-red-600">{expense.amount}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {expense.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{expense.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "events":
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Event Management
              </h2>
              <button
                onClick={() => setShowAddEventModal(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Event</span>
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Diwali Celebration",
                  date: "Nov 12, 2024",
                  status: "Upcoming",
                  description: "Grand celebration with lights and prayers",
                  time: "6:00 PM - 9:00 PM",
                },
                {
                  name: "Monthly Abhishek",
                  date: "Nov 15, 2024",
                  status: "Planned",
                  description: "Monthly ritual ceremony for the deity",
                  time: "7:00 AM - 8:00 AM",
                },
                {
                  name: "Bhajan Sandhya",
                  date: "Nov 18, 2024",
                  status: "Planned",
                  description: "Evening devotional music session",
                  time: "7:00 PM - 8:30 PM",
                },
                {
                  name: "Annakut Festival",
                  date: "Nov 25, 2024",
                  status: "Upcoming",
                  description: "Food offering festival with community feast",
                  time: "10:00 AM - 2:00 PM",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {event.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        event.status === "Upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date}
                    </span>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temple Name
                </label>
                <input
                  type="text"
                  defaultValue="Shri Ram Mandir"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temple Address
                </label>
                <textarea
                  defaultValue="123 Temple Street, Sacred City, State - 123456"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content for {activeSection}</div>;
    }
  };

  return (
    <AuthWrapper role="templeAdmin">
      <div className="min-h-screen bg-gray-50">
        {/* Add Expense Modal */}
        {showAddExpenseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add New Expense
                </h3>
                <button
                  onClick={() => setShowAddExpenseModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select Category</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="utilities">Utilities</option>
                    <option value="supplies">Festival Supplies</option>
                    <option value="salary">Staff Salary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter expense description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddExpenseModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Expense added successfully!");
                      setShowAddExpenseModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Photo Modal */}
        {showAddPhotoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add New Photo
                </h3>
                <button
                  onClick={() => setShowAddPhotoModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter photo title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter photo description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-orange-500 transition-colors">
                    <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer inline-block mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Choose File
                    </label>
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddPhotoModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Photo added successfully!");
                      setShowAddPhotoModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Add Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Event Modal */}
        {showAddEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add New Event
                </h3>
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter event name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter event description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option value="planned">Planned</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Attendees
                  </label>
                  <input
                    type="number"
                    placeholder="Enter expected number of attendees"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddEventModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Event added successfully!");
                      setShowAddEventModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Top Navbar */}
        <nav className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Temple Admin Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">Shri Ram Mandir</p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out flex flex-col`}
          >
            <div className="flex-1 pt-6">
              <div className="px-6 pb-6">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 px-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === item.id
                          ? "bg-orange-100 text-orange-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Account Info at bottom */}
            <div className="p-4 border-t border-gray-200 relative">
              {/* Account Dropdown */}
              {accountDropdownOpen && (
                <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <LogoutButton
                    logoutUrl="http://localhost:5050/api/v1/templeAdmin/logout-Temple-Admin"
                    redirectTo="/templelogin"
                    onLogoutClick={() => setAccountDropdownOpen(false)}
                  >
                    <div className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </div>
                  </LogoutButton>
                </div>
              )}

              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="w-full flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    admin@temple.org
                  </p>
                </div>
                <ChevronUp
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    accountDropdownOpen ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            <main className="p-6">{renderContent()}</main>
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        {(sidebarOpen || accountDropdownOpen) && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => {
              setSidebarOpen(false);
              setAccountDropdownOpen(false);
            }}
          />
        )}
      </div>
    </AuthWrapper>
  );
};

export default TempleAdminDashboard;

"use client";

import React from 'react';
import { 
  Building2, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Eye
} from 'lucide-react';


export default function SuperAdminDashboard(){
  return (

    <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Total Temples</h3>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <Building2 className="w-10 h-10 opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Total Donations</h3>
                    <p className="text-3xl font-bold">₹15.2L</p>
                  </div>
                  <DollarSign className="w-10 h-10 opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Active Connections</h3>
                    <p className="text-3xl font-bold">18</p>
                  </div>
                  <TrendingUp className="w-10 h-10 opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Total Withdrawals</h3>
                    <p className="text-3xl font-bold">₹8.7L</p>
                  </div>
                  <TrendingDown className="w-10 h-10 opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visitor Count</h3>
                    <p className="text-3xl font-bold">2,847</p>
                  </div>
                  <Eye className="w-10 h-10 opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
                    <p className="text-3xl font-bold">6</p>
                  </div>
                  <Users className="w-10 h-10 opacity-80" />
                </div>
              </div>
            </div>
          </div>
  );
};
"use client";

import React from "react";

export default function TempleList() {
    const registeredTemples = [
    { id: 1, name: "Shree Krishna Temple", location: "Vrindavan", status: "Active", funds: "₹2,45,000" },
    { id: 2, name: "Ganesh Mandir", location: "Pune", status: "Active", funds: "₹1,87,500" },
    { id: 3, name: "Durga Temple", location: "Kolkata", status: "Active", funds: "₹3,12,000" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">
        All Registered Temples
      </h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Temple Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Total Funds
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {registeredTemples.map((temple) => (
                <tr key={temple.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {temple.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {temple.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {temple.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {temple.funds}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

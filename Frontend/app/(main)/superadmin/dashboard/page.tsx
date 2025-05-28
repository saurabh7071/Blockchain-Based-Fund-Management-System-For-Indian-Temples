"use client";
import Card from "@/app/components/Card";
import { FaDonate, FaPlaceOfWorship, FaUsers } from "react-icons/fa";


import AuthWrapper from "@/app/components/AuthWrapper";

const DashboardPage = () => {
  return (
    <AuthWrapper role="superAdmin">
      <div className="home-container">
        <h1>Welcome Super Admin. What will you like to do today??</h1>
      </div>
    </AuthWrapper>
  );
};

export default DashboardPage;
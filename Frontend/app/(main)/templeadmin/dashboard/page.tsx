"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthWrapper from "@/app/components/AuthWrapper";

export default function DashboardPage() {
  const [userData, setUserData] = useState<{ name: string; email: string; templeName: string; templeLocation: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (!user) {
      router.push("/templelogin");
    } else {
      setUserData(JSON.parse(user));
    }
  }, [router]);

  return (
    <AuthWrapper role="templeAdmin">
      <div className="home-container">
        <h1>Welcome to the Temple Admin Dashboard</h1>
        {userData && (
          <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Temple Name: {userData.templeName}</p>
            <p>Temple Location: {userData.templeLocation}</p>
          </div>
        )}
      </div>
    </AuthWrapper>
  );
}
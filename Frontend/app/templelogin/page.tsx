"use client";
import { useState } from "react";
import {
  IconAt,
  IconLock,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import "../superadminlogin/login.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (typeof window.ethereum === "undefined") {
      router.push("/templeadmin/connect-wallet");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      console.log("Connected account:", account);

      // 🔥 Call your backend API to check registration
      const res = await fetch(`/api/templeadmin/check-registration?address=${account}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to verify registration");

      if (data.registered) {
        router.push("/templeadmin/dashboard");
      } else {
        router.push("/templeadmin/make-a-request");
      }
    } catch (error) {
      console.error("Error:", error);
      router.push("/templeadmin/connect-wallet");
    }
  };

  return (
    <div className="full-page">
      <div className="left-half"></div>

      <div className="right-half">
        <div className="login-container">
          <form className="form_main" onSubmit={handleLogin}>
            <p className="heading">Temple Admin</p>
            <p className="subheading">Login</p>

            <div className="inputContainer">
              <IconAt size={16} stroke={2} className="inputIcon" />
              <input placeholder="Username" id="username" className="inputField" type="text" />
            </div>

            <div className="inputContainer">
              <IconLock size={16} stroke={2} className="inputIcon" />
              <input
                placeholder="Password"
                id="password"
                className="inputField"
                type={showPassword ? "text" : "password"}
              />
              <div className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IconEyeOff size={16} stroke={2} /> : <IconEye size={16} stroke={2} />}
              </div>
            </div>
            <button id="button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

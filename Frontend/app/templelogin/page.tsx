"use client";
import { useState, useEffect } from "react";
import {
  IconAt,
  IconLock,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // import toast for notifications
import "../superadminlogin/login.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/templeadmin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }
    setIsLoading(true);

    try {
      // 🔥 Call your backend API to check registration
      const response = await fetch("http://localhost:5050/api/v1/templeAdmin/login-Temple-Admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message || "Failed to login. Please try again.");
        return;
      }
      const result = await response.json();

      if (result.success) {
        toast.success("Logged in successfully!");

        // Store tokens and user data
        sessionStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("user_data", JSON.stringify(result.data.user));

        // Check if Metamask wallet address is stored in the database
        const walletAddress = result.data.user.walletAddress;

        if (!walletAddress) {
          // Redirect to connect-wallet page if wallet address is not stored
          router.push("/templeadmin/connect-wallet");
        } else {
          // Redirect to dashboard if wallet address is already stored
          router.push("/templeadmin/dashboard");
        }
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
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
              <input
                placeholder="Email"
                id="email"
                className="inputField"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="inputContainer">
              <IconLock size={16} stroke={2} className="inputIcon" />
              <input
                placeholder="Password"
                id="password"
                className="inputField"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IconEyeOff size={16} stroke={2} /> : <IconEye size={16} stroke={2} />}
              </div>
            </div>
            <button id="button" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

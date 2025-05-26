"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconAt, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { toast } from "react-toastify"; // import toast
import "./login.css";
import { apiClient } from "@/app/utils/apiClient"; // Import your API client

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/superadmin/dashboard");
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient("http://localhost:5050/api/v1/superAdmin/login-superAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include cookies in the request
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

        // Redirect to the dashboard
        router.push("/superadmin/dashboard");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="full-page">
      <div className="left-half"></div>

      <div className="right-half">
        <div className="login-container">
          <form
            className="form_main"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <p className="heading">Login</p>

            <div className="inputContainer">
              <IconAt size={16} stroke={2} className="inputIcon" />
              <input
                placeholder="Email ID"
                id="email"
                className="inputField"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
              <div
                className="eyeIcon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IconEyeOff size={16} stroke={2} />
                ) : (
                  <IconEye size={16} stroke={2} />
                )}
              </div>
            </div>

            <button id="button" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

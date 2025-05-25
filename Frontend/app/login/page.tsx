"use client";
import { useState } from "react";
import { IconAt, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { toast } from "react-toastify"; // import toast
import "./login.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Simple validation example
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }
    // Here you can add your login API call
    // On success:
    toast.success("Logged in successfully!");
    // On failure, use toast.error("Login failed message");
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

            <button id="button" type="submit">
              Login
            </button>

            <h5>Don't have an account</h5>

            <div className="signupContainer">
              <a href="/signup">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

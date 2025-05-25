"use client";
import { useState } from "react";
import {
  IconAt,
  IconLock,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import "./login.css"; // Ensure path is correct

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="full-page">
      <div className="left-half"></div>

      <div className="right-half">
        <div className="login-container">
          <form className="form_main" onSubmit={(e) => e.preventDefault()}>
            <p className="heading">Login</p>

            <div className="inputContainer">
              <IconAt size={16} stroke={2} className="inputIcon" />
              <input
                placeholder="Username"
                id="username"
                className="inputField"
                type="text"
              />
            </div>

            <div className="inputContainer">
              <IconLock size={16} stroke={2} className="inputIcon" />
              <input
                placeholder="Password"
                id="password"
                className="inputField"
                type={showPassword ? "text" : "password"}
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

            <button id="button">Submit</button>

            <p id="or">----------OR----------</p>

            <button id="google">Sign up with Google</button>

            <h5>Don't have an account</h5>

            <div className="signupContainer">
              <a href="#">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

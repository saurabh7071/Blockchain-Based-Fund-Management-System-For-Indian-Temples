"use client";
import { useState, useEffect } from "react";
import {
  IconUser,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import Image from "next/image";
import metamaskLogo from "@/public/metamask-logo.png";
import "./signup.css";
import { useMetamask } from "@/app/hooks/useMetamask";

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const { connectWallet, account} = useMetamask();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  // Single string for toast error messages
  const [toastError, setToastError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear errors & toast on input change
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
    setToastError("");
  };

  const validateStepOne = (): boolean => {
    const errors: typeof formErrors = {
      name: "",
      phone: "",
      email: "",
      password: "",
    };

    if (!formData.name.trim()) {
      errors.name = "Full Name is required.";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Mobile Number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = "Enter a valid 10-digit mobile number.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must include at least one uppercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = "Password must include at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = "Password must include at least one special character.";
    }

    setFormErrors(errors);

    // Collect error messages to toast string
    const errorMessages = Object.values(errors).filter((e) => e !== "");
    if (errorMessages.length > 0) {
      setToastError(errorMessages.join(" | "));
      return false;
    } else {
      setToastError("");
      return true;
    }
  };

  const handleOTPSubmit = () => {
    if (formData.otp !== "123456") {
      setToastError("Invalid or expired OTP");
      return;
    }
    setToastError("");
    setStep(3);
  };

  const handleSubmitSignup = async () => {
    if (!account) {
      alert("Please connect your wallet before submitting.");
      return;
    }

    const completeForm = {
      ...formData,
      walletAddress: account,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completeForm),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        console.log("Saved user:", result);
      } else {
        alert(`Signup failed: ${result.message}`);
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleConnectWallet = () => {
    connectWallet((message, redirectToMetaMask) => {
      setToastError(message);
      if (redirectToMetaMask) {
        setTimeout(() => {
          window.open("https://metamask.io/download/", "_blank");
          setToastError("");
        }, 4000);
      } else {
        setTimeout(() => setToastError(""), 4000);
      }
    });
  };

  return (
    <div className="full-page">
      <div className="left-half"></div>

      <div className="right-half">
        <div className="login-container">
          {/* Toast Error above the form */}
          {toastError && (
            <div className="toastError" role="alert" aria-live="assertive">
              {toastError}
            </div>
          )}

          <form className="form_main" onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <>
                <p className="heading">Sign Up</p>
                <div className="inputContainer">
                  <IconUser size={16} stroke={2} className="inputIcon" />
                  <input
                    placeholder="Full Name"
                    id="name"
                    className="inputField"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="inputContainer">
                  <IconUser size={16} stroke={2} className="inputIcon" />
                  <input
                    placeholder="Mobile Number"
                    id="phone"
                    className="inputField"
                    type="text"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="inputContainer">
                  <IconMail size={16} stroke={2} className="inputIcon" />
                  <input
                    placeholder="Email"
                    id="email"
                    className="inputField"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="inputContainer">
                  <IconLock size={16} stroke={2} className="inputIcon" />
                  <input
                    placeholder="Password"
                    id="password"
                    className="inputField"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
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

                <button
                  id="button"
                  type="button"
                  onClick={() => {
                    if (validateStepOne()) {
                      setStep(2);
                    }
                  }}
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <p className="heading">OTP Verification</p>
                <p
                  style={{
                    marginBottom: "15px",
                    textAlign: "center",
                    fontSize: "0.9em",
                  }}
                >
                  We have sent an email verification OTP on your email ID.
                  <br />
                  This OTP lasts only for 5 minutes.
                </p>
                <div className="inputContainer">
                  <input
                    placeholder="Enter OTP"
                    id="otp"
                    className="inputField"
                    type="text"
                    value={formData.otp}
                    onChange={handleInputChange}
                  />
                </div>
                <button id="button" type="button" onClick={handleOTPSubmit}>
                  Submit OTP
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <Image
                    src={metamaskLogo}
                    alt="MetaMask"
                    width={60}
                    height={60}
                    priority
                  />
                </div>
                <p className="connect">Connect Your Metamask</p>
                <p className="connect">Wallet</p>
                <button
                  id="button"
                  type="button"
                  onClick={handleConnectWallet}
                >
                  {account ? "Wallet Connected" : "Connect Wallet"}
                </button>
                {account && (
                  <div className="connectedAccount">Connected: {account}</div>
                )}
                <button id="button" type="button" onClick={handleSubmitSignup}>
                  Register
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

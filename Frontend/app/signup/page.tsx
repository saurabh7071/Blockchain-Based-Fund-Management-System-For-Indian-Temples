"use client";
import { useState } from "react";
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
import { toast } from "react-toastify";

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const { connectWallet, account } = useMetamask();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateStepOne = (): boolean => {
    if (!formData.name.trim()) {
      toast.error("Full Name is required.");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Mobile Number is required.");
      return false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Enter a valid email address.");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required.");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      toast.error("Password must include at least one uppercase letter.");
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      toast.error("Password must include at least one number.");
      return false;
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(formData.password)) {
      toast.error("Password must include at least one special character.");
      return false;
    }

    return true;
  };

  const handleOTPSubmit = () => {
    if (formData.otp !== "123456") {
      toast.error("Invalid or expired OTP");
      return;
    }
    setStep(3);
  };

  const handleSubmitSignup = async () => {
    if (!account) {
      toast.error("Please connect your wallet before submitting.");
      return;
    }

    const completeForm = {
      ...formData,
      walletAddress: account,
      role: "user",
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completeForm),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Signup successful!");
        console.log("Saved user:", result);
      } else {
        toast.error(`Signup failed: ${result.message}`);
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleConnectWallet = () => {
    connectWallet((message, redirectToMetaMask) => {
      toast.error(message);
      if (redirectToMetaMask) {
        setTimeout(() => {
          window.open("https://metamask.io/download/", "_blank");
        }, 4000);
      }
    });
  };

  return (
    <div className="full-page">
      <div className="left-half"></div>

      <div className="right-half">
        <div className="login-container">
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
                    if (validateStepOne()) setStep(2);
                  }}
                >
                  Send OTP
                </button>
                <h5>Already have an account</h5>
            <div className="signupContainer">
              <a href="/login">Login</a>
            </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="heading">OTP Verification</p>
                <p className="otpText">
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
                <button id="button" type="button" onClick={handleConnectWallet}>
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

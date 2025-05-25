"use client";

import { useState } from "react";
import { toast } from "react-toastify"; // toast import
import "./register-temple.css";

const RegisterTemplePage = () => {
  const [form, setForm] = useState({
    templeName: "",
    authorityName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/temples/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      toast.success("✅ Temple registered successfully!");
      setForm({
        templeName: "",
        authorityName: "",
        email: "",
        phone: "",
        location: "",
      });
    } catch (error: any) {
      toast.error(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="text-white text-2xl font-bold text-center mb-4">
          Register Temple
        </h2>

        <div className="flex-column">
          <label>Temple Name</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter Temple Name"
            className="input"
            type="text"
            name="templeName"
            value={form.templeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-column">
          <label>Authority Name</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter Authority Name"
            className="input"
            type="text"
            name="authorityName"
            value={form.authorityName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-column">
          <label>Email Address</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter Email Address"
            className="input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-column">
          <label>Contact Number</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter Contact Number"
            className="input"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-column">
          <label>Temple Location</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter Temple Location"
            className="input"
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="button-submit"
        >
          {isLoading ? "Submitting..." : "Register Temple"}
        </button>
      </form>
    </div>
  );
};

export default RegisterTemplePage;

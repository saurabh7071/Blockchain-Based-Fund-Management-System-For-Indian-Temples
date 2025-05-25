// components/Loading.tsx
"use client";
import "./styles/loading.css"; // adjust if path differs
/*Loader By Nawsome */
const Loading = () => {
  return (
    <div className="loadingspinner-container" style={{ textAlign: "center" }}>
      <div className="loadingspinner">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div>
      <p style={{ marginTop: "1rem", color: "#4B2E2E", fontWeight: "600", fontSize: "1.1rem" }}>
        Connecting to Digital Seva...
      </p>
    </div>
  );
};

export default Loading;

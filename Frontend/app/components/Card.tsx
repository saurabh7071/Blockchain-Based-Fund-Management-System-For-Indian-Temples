// components/Card.tsx
import React from "react";
import "./styles/sidebar.css"; // Import your CSS styles

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  details?: string; // Optional details text
}

const Card: React.FC<CardProps> = ({ title, value, icon, details }) => {
  return (
    <div className="card">
      <div className="title">
        <span>{icon}</span>
        <p className="title-text">{title}</p>
      </div>
      <div className="data">
        <p>{value}</p>
        {details && <small className="details-text">{details}</small>}
      </div>
    </div>
  );
};

export default Card;

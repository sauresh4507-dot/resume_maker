import React from "react";

const Progress = ({ value = 0, max = 5, filledColor = '#2563eb', emptyColor = '#e0e7ff' }) => (
  <div className="flex gap-2">
    {[...Array(max)].map((_, i) => (
      <span
        key={i}
        className="w-4 h-4 rounded-md inline-block transition-colors duration-150"
        style={{
          background: i < Math.round(value / 20) ? filledColor : emptyColor,
        }}
      ></span>
    ))}
  </div>
);

export default Progress; 
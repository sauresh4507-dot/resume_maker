import React from 'react';

const WorkExperience = ({ company, role, duration, durationColor, description }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900">{company}</h3>
          <p className="text-[13px] text-gray-700 font-medium">{role}</p>
        </div>
        <span className="text-xs font-bold italic" style={{ color: durationColor }}>{duration}</span>
      </div>
      <p className="text-[13px] text-gray-600 font-medium italic mt-1">{description}</p>
    </div>
  );
};

export default WorkExperience;


import React from 'react';

const ContactInfo = ({ icon, iconBG, value }) => {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div
        className="w-7 h-7 flex items-center justify-center rounded-full"
        style={{ backgroundColor: iconBG }}
      >
        <span style={{ color: '#00bcd4' }}>{icon}</span>
      </div>
      <p className="flex-1 text-[13px] font-medium break-all">{value}</p>
    </div>
  );
};

export default ContactInfo;

import React from 'react';

const CertificationInfo = ({ title, issuer, year, bgColor }) => {
  return (
    <div className="mb-2">
      <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
      <div>
        {year && (
          <span
            className="text-[11px] font-bold text-gray-800 px-3 py-0.5 inline-block mt-2 rounded"
            style={{ backgroundColor: "#b3e5fc" }}
          >
            {year}
          </span>
        )}
        <p className="text-[12px] text-gray-700 font-semibold">{issuer}</p>
      </div>
    </div>
  );
};

export default CertificationInfo;

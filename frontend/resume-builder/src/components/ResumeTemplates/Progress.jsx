import React from 'react';

const Progress = ({ progress = 0, total = 5, color, bgColor }) => {
  return (
    <div className='flex gap-1'>
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className="w-2 h-2 rounded transition-all"
          style={{
            backgroundColor:
              index < progress
                ? color || "rgb(43, 195, 255)"
                : bgColor || "#b3e5fc"
          }}
        ></div>
      ))}
    </div>
  );
};

export default Progress;

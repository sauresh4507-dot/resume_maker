import React, { useEffect, useState } from 'react';
import { getLightColorFromImage } from '../../utils/helper';

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  // If you want to use dynamic background color in the future, keep this:
     const [bgColor, setBgColor] = useState("#ffffff");
     useEffect(() => {
       if (imgUrl) {
       getLightColorFromImage(imgUrl)
         .then((color) => {
            setBgColor(color);
         })
         .catch(() => {
            setBgColor("#ffffff");
         });
        }
   }, [imgUrl]);

  return <div
      className="min-h-[300px] flex flex-col justify-between bg-white rounded-lg border border-purple-100 hover:border-purple-300 overflow-hidden cursor-pointer shadow hover:shadow-lg transition"
      style={{ backgroundColor: bgColor }}
      onClick={onSelect}
    >
      <div className="p-4 flex-1 flex items-center justify-center">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt=""
            className="w-full h-[240px] object-cover rounded"
          />
        ) : null}
      </div>
      <div className="w-full bg-white px-4 py-3">
        <h5 className="text-sm font-medium">{title}</h5>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
};

export default ResumeSummaryCard;
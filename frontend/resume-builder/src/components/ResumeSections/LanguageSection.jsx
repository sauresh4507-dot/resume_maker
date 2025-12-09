import React from 'react';
import Progress from "../Progress";

const LanguageInfo = ({ language }) => {
  return (
    <div className="flex items-center justify-between">
        <p className={`text-[12px] font-semibold text-gray-900`}>{language.name}</p>
        {language.progress > 0 && (
            <Progress
            progress={language.progress}
            />
        )}
        </div>
  );
};


     
const LanguageSection = ({ languages, accentColor, bgColor }) => {
    return <div className='flex flex-col gap-2'>
        {languages?.map((language, index) => (
            <LanguageInfo
            key={`slanguage_${index}`}
            language={language}
            />
        ))}
    </div>
};

export default LanguageSection;

import React from 'react';
import Progress from "../Progress";

const SkillSection = ({ skills = [], accentColor = '#b3e5fc', bgColor = "#b3e5fc" }) => {
  return (
    <div className='flex flex-col gap-2 mb-5'>
      {skills.map((skill, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <span className="text-[13px] font-medium text-blue-900 min-w-[70px]">{skill.name}</span>
          <Progress
            value={skill.progress}
            filledColor={accentColor}
            emptyColor={bgColor}
          />
        </div>
      ))}
    </div>
  );
};

export default SkillSection;

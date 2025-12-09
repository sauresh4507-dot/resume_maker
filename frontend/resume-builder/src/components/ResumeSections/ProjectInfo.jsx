import React from 'react';
import ActionLink from './ActionLink';
import { LuGithub, LuExternalLink } from 'react-icons/lu';

const ProjectInfo = ({ title, description, github, liveDemoUrl, bgColor, isPreview }) => {
  return (
    <div className="mb-3">
      <h3 className={`font-semibold text-gray-900 ${isPreview ? 'text-xs' : 'text-base'}`}>{title}</h3>
      <p className="text-[13px] text-gray-700 font-medium mt-1">{description}</p>
      <div className="flex items-center gap-3 mt-2">
        {github && <ActionLink icon={<LuGithub />} link={github} bgColor={bgColor} />}
        {liveDemoUrl && <ActionLink icon={<LuExternalLink />} link={liveDemoUrl} bgColor={bgColor} />}
      </div>
    </div>
  );
};

export default ProjectInfo;

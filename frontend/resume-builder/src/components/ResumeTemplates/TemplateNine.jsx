import React, { useEffect, useRef, useState } from 'react';
import { LuUser } from "react-icons/lu";
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ["#f1f8e9", "#dcedc8", "#c5e1a5", "#9ccc65", "#558b2f"];

const TemplateNine = ({ resumeData, colorPalette, containerWidth }) => {
    const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (resumeRef.current) {
            setBaseWidth(resumeRef.current.offsetWidth);
            setScale(containerWidth / resumeRef.current.offsetWidth);
        }
    }, [containerWidth]);

    return (
        <div ref={resumeRef} className='bg-white' style={{ transform: containerWidth > 0 ? `scale(${scale})` : "none", transformOrigin: "top left", width: containerWidth > 0 ? `${baseWidth}px` : "auto" }}>
            <div className='grid grid-cols-4'>
                <div className='col-span-1 p-6' style={{ backgroundColor: themeColors[4], color: 'white' }}>
                    <div className='mb-6 text-center'>
                        <div className='w-24 h-24 rounded-full mx-auto mb-3 bg-white flex items-center justify-center'>
                            {resumeData.profileInfo.profilePreviewUrl ? <img src={resumeData.profileInfo.profilePreviewUrl} className='w-22 h-22 rounded-full' alt='Profile' /> : <LuUser className='text-4xl' style={{ color: themeColors[4] }} />}
                        </div>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-xs font-bold uppercase mb-2 pb-1 border-b border-white'>Contact</h3>
                        <div className='text-xs space-y-1'>
                            <div>{resumeData.contactInfo.email}</div>
                            <div>{resumeData.contactInfo.phone}</div>
                            <div>{resumeData.contactInfo.location}</div>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-xs font-bold uppercase mb-2 pb-1 border-b border-white'>Skills</h3>
                        <div className='text-xs space-y-1'>
                            {resumeData.skills.map((s, i) => <div key={i}>{s.name}</div>)}
                        </div>
                    </div>
                    <div>
                        <h3 className='text-xs font-bold uppercase mb-2 pb-1 border-b border-white'>Languages</h3>
                        <LanguageSection languages={resumeData.languages} />
                    </div>
                </div>
                <div className='col-span-3 p-8'>
                    <h1 className='text-4xl font-extrabold mb-1' style={{ color: themeColors[4] }}>{resumeData.profileInfo.fullName}</h1>
                    <p className='text-lg font-semibold mb-4 text-gray-600'>{resumeData.profileInfo.designation}</p>
                    <div className='mb-5'>
                        <h3 className='text-sm font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Profile</h3>
                        <p className='text-sm text-gray-700'>{resumeData.profileInfo.summary}</p>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-sm font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Experience</h3>
                        {resumeData.workExperience.map((data, i) => <WorkExperience key={i} company={data.company} role={data.role} duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`} durationColor={themeColors[4]} description={data.description} />)}
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-sm font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Education</h3>
                        {resumeData.education.map((data, i) => <div key={i} className='mb-2'><span className='block font-bold text-sm'>{data.degree}</span><span className='block text-sm text-gray-600'>{data.institution}</span><span className='block text-xs text-gray-500'>{formatYearMonth(data.startDate)} - {formatYearMonth(data.endDate)}</span></div>)}
                    </div>
                    <div>
                        <h3 className='text-sm font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Projects</h3>
                        {resumeData.projects.map((p, i) => <ProjectInfo key={i} title={p.title} description={p.description} github={p.github} liveDemoUrl={p.liveDemo} bgColor={themeColors[0]} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateNine;

import React, { useEffect, useRef, useState } from 'react';
import { LuUser } from "react-icons/lu";
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ["#f3e5f5", "#e1bee7", "#ce93d8", "#9c27b0", "#6a1b9a"];

const TemplateThirteen = ({ resumeData, colorPalette, containerWidth }) => {
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
        <div ref={resumeRef} className='p-10 bg-white' style={{ transform: containerWidth > 0 ? `scale(${scale})` : "none", transformOrigin: "top left", width: containerWidth > 0 ? `${baseWidth}px` : "auto" }}>
            <div className='flex gap-6 mb-8 pb-6 border-b-2' style={{ borderColor: themeColors[3] }}>
                <div className='w-28 h-28 rounded-full flex items-center justify-center flex-shrink-0' style={{ backgroundColor: themeColors[0] }}>
                    {resumeData.profileInfo.profilePreviewUrl ? <img src={resumeData.profileInfo.profilePreviewUrl} className='w-26 h-26 rounded-full' alt='Profile' /> : <LuUser className='text-5xl' style={{ color: themeColors[4] }} />}
                </div>
                <div className='flex-1'>
                    <h1 className='text-4xl font-black mb-2' style={{ color: themeColors[4] }}>{resumeData.profileInfo.fullName}</h1>
                    <p className='text-xl font-bold mb-3' style={{ color: themeColors[3] }}>{resumeData.profileInfo.designation}</p>
                    <div className='flex gap-3 text-sm text-gray-600'>
                        <span>{resumeData.contactInfo.email}</span>
                        <span>•</span>
                        <span>{resumeData.contactInfo.phone}</span>
                        <span>•</span>
                        <span>{resumeData.contactInfo.location}</span>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-8'>
                <div className='col-span-2'>
                    <div className='mb-6'>
                        <div className='inline-block px-4 py-1 mb-3 rounded-full' style={{ backgroundColor: themeColors[3], color: 'white' }}>
                            <h2 className='text-sm font-bold uppercase'>Summary</h2>
                        </div>
                        <p className='text-sm text-gray-700'>{resumeData.profileInfo.summary}</p>
                    </div>
                    <div className='mb-6'>
                        <div className='inline-block px-4 py-1 mb-3 rounded-full' style={{ backgroundColor: themeColors[3], color: 'white' }}>
                            <h2 className='text-sm font-bold uppercase'>Experience</h2>
                        </div>
                        {resumeData.workExperience.map((data, i) => <WorkExperience key={i} company={data.company} role={data.role} duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`} durationColor={themeColors[4]} description={data.description} />)}
                    </div>
                    <div>
                        <div className='inline-block px-4 py-1 mb-3 rounded-full' style={{ backgroundColor: themeColors[3], color: 'white' }}>
                            <h2 className='text-sm font-bold uppercase'>Projects</h2>
                        </div>
                        {resumeData.projects.map((p, i) => <ProjectInfo key={i} title={p.title} description={p.description} github={p.github} liveDemoUrl={p.liveDemo} bgColor={themeColors[0]} />)}
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='mb-6'>
                        <div className='inline-block px-4 py-1 mb-3 rounded-full' style={{ backgroundColor: themeColors[3], color: 'white' }}>
                            <h2 className='text-sm font-bold uppercase'>Education</h2>
                        </div>
                        {resumeData.education.map((data, i) => <div key={i} className='mb-3'><div className='font-bold text-sm'>{data.degree}</div><div className='text-sm text-gray-600'>{data.institution}</div></div>)}
                    </div>
                    <div className='mb-6'>
                        <div className='inline-block px-4 py-1 mb-3 rounded-full' style={{ backgroundColor: themeColors[3], color: 'white' }}>
                            <h2 className='text-sm font-bold uppercase'>Skills</h2>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {resumeData.skills.map((s, i) => <div key={i} className='px-3 py-1 rounded-full text-xs font-medium' style={{ backgroundColor: themeColors[0], color: themeColors[4] }}>{s.name}</div>)}
                        </div>
                    </div>
                    <div>
                        <div className='inline-block px-4 py-1 mb-3 rounded-full' style={{ backgroundColor: themeColors[3], color: 'white' }}>
                            <h2 className='text-sm font-bold uppercase'>Languages</h2>
                        </div>
                        <LanguageSection languages={resumeData.languages} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateThirteen;

import React, { useEffect, useRef, useState } from 'react';
import { LuUser } from "react-icons/lu";
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ["#e8f5e9", "#c8e6c9", "#a5d6a7", "#66bb6a", "#2e7d32"];

const TemplateFourteen = ({ resumeData, colorPalette, containerWidth }) => {
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
        <div ref={resumeRef} className='p-8 bg-white' style={{ transform: containerWidth > 0 ? `scale(${scale})` : "none", transformOrigin: "top left", width: containerWidth > 0 ? `${baseWidth}px` : "auto" }}>
            <div className='mb-8 p-6 rounded-xl' style={{ backgroundColor: themeColors[0] }}>
                <div className='flex items-center gap-6'>
                    <div className='w-24 h-24 rounded-xl flex items-center justify-center' style={{ backgroundColor: themeColors[3] }}>
                        {resumeData.profileInfo.profilePreviewUrl ? <img src={resumeData.profileInfo.profilePreviewUrl} className='w-22 h-22 rounded-xl' alt='Profile' /> : <LuUser className='text-4xl text-white' />}
                    </div>
                    <div className='flex-1'>
                        <h1 className='text-4xl font-black mb-1' style={{ color: themeColors[4] }}>{resumeData.profileInfo.fullName}</h1>
                        <p className='text-lg font-bold mb-2' style={{ color: themeColors[3] }}>{resumeData.profileInfo.designation}</p>
                        <div className='flex gap-3 text-sm text-gray-700'>
                            <span>{resumeData.contactInfo.email}</span>
                            <span>|</span>
                            <span>{resumeData.contactInfo.phone}</span>
                            <span>|</span>
                            <span>{resumeData.contactInfo.location}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-6'>
                <div className='flex items-center gap-2 mb-3'>
                    <div className='w-1 h-6 rounded' style={{ backgroundColor: themeColors[3] }}></div>
                    <h2 className='text-base font-bold uppercase' style={{ color: themeColors[4] }}>Professional Summary</h2>
                </div>
                <p className='text-sm text-gray-700 ml-3'>{resumeData.profileInfo.summary}</p>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-2'>
                    <div className='mb-6'>
                        <div className='flex items-center gap-2 mb-3'>
                            <div className='w-1 h-6 rounded' style={{ backgroundColor: themeColors[3] }}></div>
                            <h2 className='text-base font-bold uppercase' style={{ color: themeColors[4] }}>Work Experience</h2>
                        </div>
                        <div className='ml-3'>
                            {resumeData.workExperience.map((data, i) => <WorkExperience key={i} company={data.company} role={data.role} duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`} durationColor={themeColors[4]} description={data.description} />)}
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-2 mb-3'>
                            <div className='w-1 h-6 rounded' style={{ backgroundColor: themeColors[3] }}></div>
                            <h2 className='text-base font-bold uppercase' style={{ color: themeColors[4] }}>Projects</h2>
                        </div>
                        <div className='ml-3'>
                            {resumeData.projects.map((p, i) => <ProjectInfo key={i} title={p.title} description={p.description} github={p.github} liveDemoUrl={p.liveDemo} bgColor={themeColors[0]} />)}
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='mb-6'>
                        <div className='flex items-center gap-2 mb-3'>
                            <div className='w-1 h-6 rounded' style={{ backgroundColor: themeColors[3] }}></div>
                            <h2 className='text-base font-bold uppercase' style={{ color: themeColors[4] }}>Education</h2>
                        </div>
                        <div className='ml-3'>
                            {resumeData.education.map((data, i) => <div key={i} className='mb-2'><div className='font-bold text-sm'>{data.degree}</div><div className='text-sm text-gray-600'>{data.institution}</div></div>)}
                        </div>
                    </div>
                    <div className='mb-6'>
                        <div className='flex items-center gap-2 mb-3'>
                            <div className='w-1 h-6 rounded' style={{ backgroundColor: themeColors[3] }}></div>
                            <h2 className='text-base font-bold uppercase' style={{ color: themeColors[4] }}>Skills</h2>
                        </div>
                        <div className='ml-3'>
                            <div className='space-y-1'>
                                {resumeData.skills.map((s, i) => <div key={i} className='text-sm'>{s.name}</div>)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-2 mb-3'>
                            <div className='w-1 h-6 rounded' style={{ backgroundColor: themeColors[3] }}></div>
                            <h2 className='text-base font-bold uppercase' style={{ color: themeColors[4] }}>Languages</h2>
                        </div>
                        <div className='ml-3'>
                            <LanguageSection languages={resumeData.languages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateFourteen;

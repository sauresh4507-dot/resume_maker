import React, { useEffect, useRef, useState } from 'react';
import { LuUser } from "react-icons/lu";
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ["#fff3e0", "#ffe0b2", "#ffcc80", "#ff9800", "#e65100"];

const TemplateTwelve = ({ resumeData, colorPalette, containerWidth }) => {
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
        <div ref={resumeRef} className='p-0 bg-white' style={{ transform: containerWidth > 0 ? `scale(${scale})` : "none", transformOrigin: "top left", width: containerWidth > 0 ? `${baseWidth}px` : "auto" }}>
            <div className='p-10' style={{ backgroundColor: themeColors[4], color: 'white' }}>
                <div className='flex items-center gap-6'>
                    <div className='w-24 h-24 rounded-full bg-white flex items-center justify-center'>
                        {resumeData.profileInfo.profilePreviewUrl ? <img src={resumeData.profileInfo.profilePreviewUrl} className='w-22 h-22 rounded-full' alt='Profile' /> : <LuUser className='text-4xl' style={{ color: themeColors[4] }} />}
                    </div>
                    <div>
                        <h1 className='text-4xl font-black'>{resumeData.profileInfo.fullName}</h1>
                        <p className='text-xl font-semibold opacity-90'>{resumeData.profileInfo.designation}</p>
                    </div>
                </div>
                <div className='mt-4 flex gap-4 text-sm opacity-90'>
                    <span>{resumeData.contactInfo.email}</span>
                    <span>|</span>
                    <span>{resumeData.contactInfo.phone}</span>
                    <span>|</span>
                    <span>{resumeData.contactInfo.location}</span>
                </div>
            </div>
            <div className='p-10'>
                <div className='mb-6'>
                    <h2 className='text-base font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Summary</h2>
                    <p className='text-sm text-gray-700'>{resumeData.profileInfo.summary}</p>
                </div>
                <div className='grid grid-cols-3 gap-8'>
                    <div className='col-span-2'>
                        <div className='mb-6'>
                            <h2 className='text-base font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Experience</h2>
                            {resumeData.workExperience.map((data, i) => <WorkExperience key={i} company={data.company} role={data.role} duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`} durationColor={themeColors[4]} description={data.description} />)}
                        </div>
                        <div>
                            <h2 className='text-base font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Projects</h2>
                            {resumeData.projects.map((p, i) => <ProjectInfo key={i} title={p.title} description={p.description} github={p.github} liveDemoUrl={p.liveDemo} bgColor={themeColors[0]} />)}
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='mb-6'>
                            <h2 className='text-base font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Education</h2>
                            {resumeData.education.map((data, i) => <div key={i} className='mb-2'><div className='font-bold text-sm'>{data.degree}</div><div className='text-sm text-gray-600'>{data.institution}</div></div>)}
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-base font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Skills</h2>
                            <div className='space-y-1'>
                                {resumeData.skills.map((s, i) => <div key={i} className='text-sm'>{s.name}</div>)}
                            </div>
                        </div>
                        <div>
                            <h2 className='text-base font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Languages</h2>
                            <LanguageSection languages={resumeData.languages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateTwelve;

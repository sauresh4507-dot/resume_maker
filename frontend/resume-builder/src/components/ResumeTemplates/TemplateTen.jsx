import React, { useEffect, useRef, useState } from 'react';
import { LuUser } from "react-icons/lu";
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ["#fce4ec", "#f8bbd0", "#f48fb1", "#e91e63", "#880e4f"];

const TemplateTen = ({ resumeData, colorPalette, containerWidth }) => {
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
            <div className='text-center mb-8 pb-6 border-b-4' style={{ borderColor: themeColors[3] }}>
                <h1 className='text-5xl font-black mb-2' style={{ color: themeColors[4] }}>{resumeData.profileInfo.fullName}</h1>
                <p className='text-xl font-bold mb-3' style={{ color: themeColors[3] }}>{resumeData.profileInfo.designation}</p>
                <div className='flex justify-center gap-3 text-sm'>
                    <span>{resumeData.contactInfo.email}</span><span>•</span>
                    <span>{resumeData.contactInfo.phone}</span><span>•</span>
                    <span>{resumeData.contactInfo.location}</span>
                </div>
            </div>
            <div className='mb-6'>
                <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 rounded-full flex items-center justify-center' style={{ backgroundColor: themeColors[3] }}>
                        <span className='text-white font-bold'>P</span>
                    </div>
                    <h2 className='text-lg font-bold' style={{ color: themeColors[4] }}>PROFILE</h2>
                </div>
                <p className='text-sm text-gray-700 ml-13'>{resumeData.profileInfo.summary}</p>
            </div>
            <div className='mb-6'>
                <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 rounded-full flex items-center justify-center' style={{ backgroundColor: themeColors[3] }}>
                        <span className='text-white font-bold'>E</span>
                    </div>
                    <h2 className='text-lg font-bold' style={{ color: themeColors[4] }}>EXPERIENCE</h2>
                </div>
                <div className='ml-13'>
                    {resumeData.workExperience.map((data, i) => <WorkExperience key={i} company={data.company} role={data.role} duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`} durationColor={themeColors[4]} description={data.description} />)}
                </div>
            </div>
            <div className='grid grid-cols-2 gap-8'>
                <div>
                    <div className='flex items-center gap-3 mb-3'>
                        <div className='w-10 h-10 rounded-full flex items-center justify-center' style={{ backgroundColor: themeColors[3] }}>
                            <span className='text-white font-bold'>S</span>
                        </div>
                        <h2 className='text-lg font-bold' style={{ color: themeColors[4] }}>SKILLS</h2>
                    </div>
                    <div className='ml-13'>
                        <SkillSection skills={resumeData.skills} accentColor={themeColors[3]} bgColor={themeColors[0]} />
                    </div>
                </div>
                <div>
                    <div className='flex items-center gap-3 mb-3'>
                        <div className='w-10 h-10 rounded-full flex items-center justify-center' style={{ backgroundColor: themeColors[3] }}>
                            <span className='text-white font-bold'>D</span>
                        </div>
                        <h2 className='text-lg font-bold' style={{ color: themeColors[4] }}>EDUCATION</h2>
                    </div>
                    <div className='ml-13'>
                        {resumeData.education.map((data, i) => <div key={i} className='mb-2'><span className='block font-bold text-sm'>{data.degree}</span><span className='block text-sm text-gray-600'>{data.institution}</span></div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateTen;

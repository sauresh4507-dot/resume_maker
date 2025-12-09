import React, { useEffect, useRef, useState } from 'react';
import { LuUser } from "react-icons/lu";
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ["#e8eaf6", "#c5cae9", "#9fa8da", "#5c6bc0", "#283593"];

const TemplateEight = ({ resumeData, colorPalette, containerWidth }) => {
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
            <div className='flex gap-8'>
                <div className='w-2 rounded-full' style={{ backgroundColor: themeColors[3] }}></div>
                <div className='flex-1'>
                    <div className='mb-6'>
                        <h1 className='text-5xl font-black mb-2' style={{ color: themeColors[4] }}>{resumeData.profileInfo.fullName}</h1>
                        <p className='text-xl font-semibold' style={{ color: themeColors[3] }}>{resumeData.profileInfo.designation}</p>
                        <div className='flex gap-4 mt-3 text-sm text-gray-600'>
                            <span>{resumeData.contactInfo.email}</span>
                            <span>|</span>
                            <span>{resumeData.contactInfo.phone}</span>
                            <span>|</span>
                            <span>{resumeData.contactInfo.location}</span>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-sm font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Summary</h3>
                        <p className='text-sm text-gray-700'>{resumeData.profileInfo.summary}</p>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-sm font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Experience</h3>
                        {resumeData.workExperience.map((data, i) => <WorkExperience key={i} company={data.company} role={data.role} duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`} durationColor={themeColors[4]} description={data.description} />)}
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-sm font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Education</h3>
                        {resumeData.education.map((data, i) => <div key={i} className='mb-2'><span className='block font-bold text-sm'>{data.degree}</span><span className='block text-sm text-gray-600'>{data.institution}</span></div>)}
                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        <div>
                            <h3 className='text-sm font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Skills</h3>
                            <SkillSection skills={resumeData.skills} accentColor={themeColors[3]} bgColor={themeColors[0]} />
                        </div>
                        <div>
                            <h3 className='text-sm font-bold uppercase mb-2' style={{ color: themeColors[4] }}>Languages</h3>
                            <LanguageSection languages={resumeData.languages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateEight;

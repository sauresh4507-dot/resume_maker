import React, { useEffect, useRef, useState } from 'react';
import { LuUser } from "react-icons/lu";
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ["#e0f2f1", "#b2dfdb", "#80cbc4", "#26a69a", "#00695c"];

const TemplateEleven = ({ resumeData, colorPalette, containerWidth }) => {
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
            <div className='grid grid-cols-5'>
                <div className='col-span-2 p-8' style={{ backgroundColor: themeColors[0] }}>
                    <div className='mb-6'>
                        <div className='w-32 h-32 rounded-lg mx-auto mb-4 flex items-center justify-center' style={{ backgroundColor: themeColors[3] }}>
                            {resumeData.profileInfo.profilePreviewUrl ? <img src={resumeData.profileInfo.profilePreviewUrl} className='w-30 h-30 rounded-lg' alt='Profile' /> : <LuUser className='text-5xl text-white' />}
                        </div>
                        <h1 className='text-2xl font-extrabold text-center mb-1' style={{ color: themeColors[4] }}>{resumeData.profileInfo.fullName}</h1>
                        <p className='text-center font-semibold' style={{ color: themeColors[3] }}>{resumeData.profileInfo.designation}</p>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-xs font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Contact</h3>
                        <div className='text-xs space-y-1 text-gray-700'>
                            <div>{resumeData.contactInfo.email}</div>
                            <div>{resumeData.contactInfo.phone}</div>
                            <div>{resumeData.contactInfo.location}</div>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-xs font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Skills</h3>
                        <SkillSection skills={resumeData.skills} accentColor={themeColors[3]} bgColor="white" />
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-xs font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Education</h3>
                        {resumeData.education.map((data, i) => <div key={i} className='mb-2 text-xs'><div className='font-bold'>{data.degree}</div><div className='text-gray-600'>{data.institution}</div></div>)}
                    </div>
                    <div>
                        <h3 className='text-xs font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Languages</h3>
                        <LanguageSection languages={resumeData.languages} />
                    </div>
                </div>
                <div className='col-span-3 p-8'>
                    <div className='mb-6'>
                        <h2 className='text-sm font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>About</h2>
                        <p className='text-sm text-gray-700'>{resumeData.profileInfo.summary}</p>
                    </div>
                    <div className='mb-6'>
                        <h2 className='text-sm font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Experience</h2>
                        {resumeData.workExperience.map((data, i) => <WorkExperience key={i} company={data.company} role={data.role} duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`} durationColor={themeColors[4]} description={data.description} />)}
                    </div>
                    <div className='mb-6'>
                        <h2 className='text-sm font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Projects</h2>
                        {resumeData.projects.map((p, i) => <ProjectInfo key={i} title={p.title} description={p.description} github={p.github} liveDemoUrl={p.liveDemo} bgColor={themeColors[0]} />)}
                    </div>
                    <div>
                        <h2 className='text-sm font-bold uppercase mb-2 pb-1 border-b' style={{ borderColor: themeColors[3], color: themeColors[4] }}>Certifications</h2>
                        {resumeData.certifications.map((data, i) => <CertificationInfo key={i} title={data.title} issuer={data.issuer} year={data.year} bgColor={themeColors[0]} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateEleven;

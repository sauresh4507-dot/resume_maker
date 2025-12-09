import React, { useEffect, useRef, useState } from 'react';
import {
    LuMapPinHouse,
    LuMail,
    LuPhone,
    LuRss,
    LuGithub,
    LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from '../ResumeSections/ContactInfo';
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import EducationInfo from '../ResumeSections/EducationInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = [
    "#fff8e1", // light amber background
    "#ffecb3", // lighter amber
    "#ffe082", // medium amber
    "#ffc107", // accent amber
    "#ff6f00"  // dark orange for text
];

const Title = ({ text, color }) => (
    <div className="mb-3">
        <h2
            className="text-base font-extrabold uppercase tracking-wide inline-block px-3 py-1"
            style={{ backgroundColor: color, color: 'white' }}
        >
            {text}
        </h2>
    </div>
);

const TemplateSeven = ({ resumeData, colorPalette, containerWidth }) => {
    const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (resumeRef.current) {
            const actualBaseWidth = resumeRef.current.offsetWidth;
            setBaseWidth(actualBaseWidth);
            setScale(containerWidth / actualBaseWidth);
        }
    }, [containerWidth]);

    return (
        <div
            ref={resumeRef}
            className='bg-white'
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                height: "auto",
            }}
        >
            {/* Top Banner */}
            <div className='py-6 px-10' style={{ backgroundColor: themeColors[3] }}>
                <div className='flex items-center gap-6'>
                    <div
                        className='w-[90px] h-[90px] rounded-full flex items-center justify-center border-4 border-white flex-shrink-0'
                        style={{ backgroundColor: 'white' }}
                    >
                        {resumeData.profileInfo.profilePreviewUrl ? (
                            <img
                                src={resumeData.profileInfo.profilePreviewUrl}
                                className='w-[82px] h-[82px] rounded-full object-cover'
                                alt='Profile'
                            />
                        ) : (
                            <div
                                className='w-[82px] h-[82px] flex items-center justify-center text-4xl rounded-full'
                                style={{ color: themeColors[3] }}
                            >
                                <LuUser />
                            </div>
                        )}
                    </div>
                    <div className='flex-1 text-white'>
                        <h1 className='text-4xl font-extrabold mb-1'>
                            {resumeData.profileInfo.fullName}
                        </h1>
                        <p className='text-xl font-medium opacity-95'>
                            {resumeData.profileInfo.designation}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Bar */}
            <div className='py-2 px-10 flex flex-wrap gap-4 text-xs border-b-2' style={{ borderColor: themeColors[3] }}>
                {resumeData.contactInfo.email && (
                    <div className='flex items-center gap-1'>
                        <LuMail style={{ color: themeColors[4] }} />
                        <span>{resumeData.contactInfo.email}</span>
                    </div>
                )}
                {resumeData.contactInfo.phone && (
                    <div className='flex items-center gap-1'>
                        <LuPhone style={{ color: themeColors[4] }} />
                        <span>{resumeData.contactInfo.phone}</span>
                    </div>
                )}
                {resumeData.contactInfo.location && (
                    <div className='flex items-center gap-1'>
                        <LuMapPinHouse style={{ color: themeColors[4] }} />
                        <span>{resumeData.contactInfo.location}</span>
                    </div>
                )}
                {resumeData.contactInfo.linkedin && (
                    <div className='flex items-center gap-1'>
                        <RiLinkedinLine style={{ color: themeColors[4] }} />
                        <span>{resumeData.contactInfo.linkedin}</span>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className='px-10 py-6'>
                {/* Summary */}
                <div className='mb-6'>
                    <Title text="About Me" color={themeColors[3]} />
                    <p className='text-sm text-gray-700 leading-relaxed'>
                        {resumeData.profileInfo.summary}
                    </p>
                </div>

                <div className='grid grid-cols-3 gap-8'>
                    {/* Left Column */}
                    <div className='col-span-2'>
                        {/* Experience */}
                        <div className='mb-6'>
                            <Title text="Experience" color={themeColors[3]} />
                            {resumeData.workExperience.map((data, index) => (
                                <WorkExperience
                                    key={`work_${index}`}
                                    company={data.company}
                                    role={data.role}
                                    duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                                    durationColor={themeColors[4]}
                                    description={data.description}
                                />
                            ))}
                        </div>

                        {/* Projects */}
                        <div>
                            <Title text="Projects" color={themeColors[3]} />
                            {resumeData.projects.map((project, index) => (
                                <ProjectInfo
                                    key={`project_${index}`}
                                    title={project.title}
                                    description={project.description}
                                    github={project.github}
                                    liveDemoUrl={project.liveDemo}
                                    bgColor={themeColors[0]}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='col-span-1'>
                        {/* Education */}
                        <div className='mb-6'>
                            <Title text="Education" color={themeColors[3]} />
                            {resumeData.education.map((data, index) => (
                                <div key={`education_${index}`} className='mb-3'>
                                    <span className='block font-bold text-xs text-gray-900'>{data.degree}</span>
                                    <span className='block text-xs text-gray-600'>{data.institution}</span>
                                    <span className='block text-xs text-gray-500 italic'>
                                        {`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Skills */}
                        <div className='mb-6'>
                            <Title text="Skills" color={themeColors[3]} />
                            <SkillSection
                                skills={resumeData.skills}
                                accentColor={themeColors[3]}
                                bgColor={themeColors[0]}
                            />
                        </div>

                        {/* Certifications */}
                        <div className='mb-6'>
                            <Title text="Certifications" color={themeColors[3]} />
                            {resumeData.certifications.map((data, index) => (
                                <CertificationInfo
                                    key={`cert_${index}`}
                                    title={data.title}
                                    issuer={data.issuer}
                                    year={data.year}
                                    bgColor={themeColors[0]}
                                />
                            ))}
                        </div>

                        {/* Languages */}
                        <div>
                            <Title text="Languages" color={themeColors[3]} />
                            <LanguageSection languages={resumeData.languages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateSeven;

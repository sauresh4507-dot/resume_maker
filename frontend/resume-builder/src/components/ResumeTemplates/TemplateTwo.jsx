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
    "#e8f5e9", // light green background
    "#c8e6c9", // lighter green
    "#a5d6a7", // medium green
    "#66bb6a", // accent green
    "#2e7d32"  // dark green for text
];

const Title = ({ text, color }) => (
    <div className="mb-3 pb-2 border-b-2" style={{ borderColor: color }}>
        <h2 className="text-lg font-bold uppercase tracking-wide" style={{ color: color }}>
            {text}
        </h2>
    </div>
);

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
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
            className='p-6 bg-white'
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                height: "auto",
            }}
        >
            {/* Header Section */}
            <div className='text-center mb-6 pb-6 border-b-4' style={{ borderColor: themeColors[4] }}>
                <div className='flex justify-center mb-4'>
                    <div
                        className='w-[120px] h-[120px] rounded-full flex items-center justify-center shadow-lg'
                        style={{ backgroundColor: themeColors[1] }}
                    >
                        {resumeData.profileInfo.profilePreviewUrl ? (
                            <img
                                src={resumeData.profileInfo.profilePreviewUrl}
                                className='w-[110px] h-[110px] rounded-full object-cover'
                                alt='Profile'
                            />
                        ) : (
                            <div
                                className='w-[110px] h-[110px] flex items-center justify-center text-6xl rounded-full'
                                style={{ color: themeColors[4], backgroundColor: themeColors[0] }}
                            >
                                <LuUser />
                            </div>
                        )}
                    </div>
                </div>
                <h1 className='text-4xl font-extrabold mb-2' style={{ color: themeColors[4] }}>
                    {resumeData.profileInfo.fullName}
                </h1>
                <p className='text-xl font-medium text-gray-600 mb-4'>
                    {resumeData.profileInfo.designation}
                </p>

                {/* Contact Info in Header */}
                <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-700'>
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
                </div>
                <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-700 mt-2'>
                    {resumeData.contactInfo.linkedin && (
                        <div className='flex items-center gap-1'>
                            <RiLinkedinLine style={{ color: themeColors[4] }} />
                            <span>{resumeData.contactInfo.linkedin}</span>
                        </div>
                    )}
                    {resumeData.contactInfo.github && (
                        <div className='flex items-center gap-1'>
                            <LuGithub style={{ color: themeColors[4] }} />
                            <span>{resumeData.contactInfo.github}</span>
                        </div>
                    )}
                    {resumeData.contactInfo.website && (
                        <div className='flex items-center gap-1'>
                            <LuRss style={{ color: themeColors[4] }} />
                            <span>{resumeData.contactInfo.website}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Professional Summary */}
            <div className='mb-6'>
                <Title text="Professional Summary" color={themeColors[4]} />
                <p className='text-sm text-gray-700 leading-relaxed'>
                    {resumeData.profileInfo.summary}
                </p>
            </div>

            {/* Two Column Layout */}
            <div className='grid grid-cols-3 gap-6'>
                {/* Left Column - 2/3 width */}
                <div className='col-span-2'>
                    {/* Work Experience */}
                    <div className='mb-6'>
                        <Title text="Work Experience" color={themeColors[4]} />
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
                    <div className='mb-6'>
                        <Title text="Projects" color={themeColors[4]} />
                        {resumeData.projects.map((project, index) => (
                            <ProjectInfo
                                key={`project_${index}`}
                                title={project.title}
                                description={project.description}
                                github={project.github}
                                liveDemoUrl={project.liveDemo}
                                bgColor={themeColors[1]}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Column - 1/3 width */}
                <div className='col-span-1'>
                    {/* Education */}
                    <div className='mb-6'>
                        <Title text="Education" color={themeColors[4]} />
                        {resumeData.education.map((data, index) => (
                            <div key={`education_${index}`} className='mb-4'>
                                <span className='block font-bold text-sm text-gray-900'>{data.degree}</span>
                                <span className='block text-xs text-gray-600'>{data.institution}</span>
                                <span className='block text-xs text-gray-500 italic'>
                                    {`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    <div className='mb-6'>
                        <Title text="Skills" color={themeColors[4]} />
                        <SkillSection
                            skills={resumeData.skills}
                            accentColor={themeColors[3]}
                            bgColor={themeColors[1]}
                        />
                    </div>

                    {/* Certifications */}
                    <div className='mb-6'>
                        <Title text="Certifications" color={themeColors[4]} />
                        {resumeData.certifications.map((data, index) => (
                            <CertificationInfo
                                key={`cert_${index}`}
                                title={data.title}
                                issuer={data.issuer}
                                year={data.year}
                                bgColor={themeColors[1]}
                            />
                        ))}
                    </div>

                    {/* Languages */}
                    <div className='mb-6'>
                        <Title text="Languages" color={themeColors[4]} />
                        <LanguageSection languages={resumeData.languages} />
                    </div>

                    {/* Interests */}
                    {resumeData.interests?.length > 0 && resumeData.interests[0] !== "" && (
                        <div>
                            <Title text="Interests" color={themeColors[4]} />
                            <div className='flex flex-wrap gap-2'>
                                {resumeData.interests.map((interest, index) => (
                                    interest && (
                                        <div
                                            key={`interest_${index}`}
                                            className='text-xs font-medium py-1 px-2 rounded'
                                            style={{ backgroundColor: themeColors[1], color: themeColors[4] }}
                                        >
                                            {interest}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateTwo;

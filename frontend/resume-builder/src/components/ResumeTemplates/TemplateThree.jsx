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
    "#fff3e0", // light orange background
    "#ffe0b2", // lighter orange
    "#ffcc80", // medium orange
    "#ff9800", // accent orange
    "#e65100"  // dark orange for text
];

const Title = ({ text, color }) => (
    <div className="mb-3">
        <h2
            className="text-base font-bold uppercase tracking-wider py-2 px-4 rounded-md text-white"
            style={{ backgroundColor: color }}
        >
            {text}
        </h2>
    </div>
);

const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {
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
            {/* Header Banner */}
            <div
                className='py-8 px-10 text-white'
                style={{ backgroundColor: themeColors[4] }}
            >
                <div className='flex items-center gap-6'>
                    <div
                        className='w-[100px] h-[100px] rounded-full flex items-center justify-center border-4 border-white shadow-lg flex-shrink-0'
                        style={{ backgroundColor: themeColors[0] }}
                    >
                        {resumeData.profileInfo.profilePreviewUrl ? (
                            <img
                                src={resumeData.profileInfo.profilePreviewUrl}
                                className='w-[92px] h-[92px] rounded-full object-cover'
                                alt='Profile'
                            />
                        ) : (
                            <div
                                className='w-[92px] h-[92px] flex items-center justify-center text-5xl rounded-full'
                                style={{ color: themeColors[4] }}
                            >
                                <LuUser />
                            </div>
                        )}
                    </div>
                    <div className='flex-1'>
                        <h1 className='text-4xl font-extrabold mb-2'>
                            {resumeData.profileInfo.fullName}
                        </h1>
                        <p className='text-xl font-medium opacity-90'>
                            {resumeData.profileInfo.designation}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Bar */}
            <div
                className='py-3 px-10 flex flex-wrap gap-x-6 gap-y-2 text-sm border-b-2'
                style={{ backgroundColor: themeColors[0], borderColor: themeColors[3] }}
            >
                {resumeData.contactInfo.email && (
                    <div className='flex items-center gap-1.5'>
                        <LuMail style={{ color: themeColors[4] }} />
                        <span className='text-gray-700'>{resumeData.contactInfo.email}</span>
                    </div>
                )}
                {resumeData.contactInfo.phone && (
                    <div className='flex items-center gap-1.5'>
                        <LuPhone style={{ color: themeColors[4] }} />
                        <span className='text-gray-700'>{resumeData.contactInfo.phone}</span>
                    </div>
                )}
                {resumeData.contactInfo.location && (
                    <div className='flex items-center gap-1.5'>
                        <LuMapPinHouse style={{ color: themeColors[4] }} />
                        <span className='text-gray-700'>{resumeData.contactInfo.location}</span>
                    </div>
                )}
                {resumeData.contactInfo.linkedin && (
                    <div className='flex items-center gap-1.5'>
                        <RiLinkedinLine style={{ color: themeColors[4] }} />
                        <span className='text-gray-700'>{resumeData.contactInfo.linkedin}</span>
                    </div>
                )}
                {resumeData.contactInfo.github && (
                    <div className='flex items-center gap-1.5'>
                        <LuGithub style={{ color: themeColors[4] }} />
                        <span className='text-gray-700'>{resumeData.contactInfo.github}</span>
                    </div>
                )}
                {resumeData.contactInfo.website && (
                    <div className='flex items-center gap-1.5'>
                        <LuRss style={{ color: themeColors[4] }} />
                        <span className='text-gray-700'>{resumeData.contactInfo.website}</span>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className='px-10 py-6'>
                {/* Professional Summary */}
                <div className='mb-6'>
                    <Title text="Professional Summary" color={themeColors[3]} />
                    <p className='text-sm text-gray-700 leading-relaxed px-4'>
                        {resumeData.profileInfo.summary}
                    </p>
                </div>

                {/* Work Experience */}
                <div className='mb-6'>
                    <Title text="Work Experience" color={themeColors[3]} />
                    <div className='px-4'>
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
                </div>

                {/* Education */}
                <div className='mb-6'>
                    <Title text="Education" color={themeColors[3]} />
                    <div className='px-4'>
                        {resumeData.education.map((data, index) => (
                            <div key={`education_${index}`} className='mb-4'>
                                <span className='block font-bold text-sm text-gray-900'>{data.degree}</span>
                                <span className='block text-sm text-gray-600'>{data.institution}</span>
                                <span className='block text-xs text-gray-500 italic'>
                                    {`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects */}
                <div className='mb-6'>
                    <Title text="Projects" color={themeColors[3]} />
                    <div className='px-4'>
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

                {/* Skills */}
                <div className='mb-6'>
                    <Title text="Skills" color={themeColors[3]} />
                    <div className='px-4'>
                        <SkillSection
                            skills={resumeData.skills}
                            accentColor={themeColors[3]}
                            bgColor={themeColors[1]}
                        />
                    </div>
                </div>

                {/* Certifications */}
                <div className='mb-6'>
                    <Title text="Certifications" color={themeColors[3]} />
                    <div className='px-4'>
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
                </div>

                {/* Languages & Interests Row */}
                <div className='grid grid-cols-2 gap-6'>
                    {/* Languages */}
                    <div>
                        <Title text="Languages" color={themeColors[3]} />
                        <div className='px-4'>
                            <LanguageSection languages={resumeData.languages} />
                        </div>
                    </div>

                    {/* Interests */}
                    {resumeData.interests?.length > 0 && resumeData.interests[0] !== "" && (
                        <div>
                            <Title text="Interests" color={themeColors[3]} />
                            <div className='px-4 flex flex-wrap gap-2'>
                                {resumeData.interests.map((interest, index) => (
                                    interest && (
                                        <div
                                            key={`interest_${index}`}
                                            className='text-xs font-medium py-1 px-3 rounded-full border-2'
                                            style={{
                                                borderColor: themeColors[3],
                                                color: themeColors[4]
                                            }}
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

export default TemplateThree;

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
    "#f3e5f5", // light purple background
    "#e1bee7", // lighter purple
    "#ce93d8", // medium purple
    "#ab47bc", // accent purple
    "#6a1b9a"  // dark purple for text
];

const Title = ({ text, color }) => (
    <div className="mb-3 flex items-center gap-3">
        <div
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: color }}
        ></div>
        <h2
            className="text-base font-bold uppercase tracking-wide"
            style={{ color: color }}
        >
            {text}
        </h2>
    </div>
);

const TemplateFour = ({ resumeData, colorPalette, containerWidth }) => {
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
            className='p-8 bg-white'
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                height: "auto",
            }}
        >
            <div className='grid grid-cols-5 gap-8'>
                {/* Left Sidebar - 2/5 width */}
                <div className='col-span-2'>
                    {/* Profile Section */}
                    <div className='mb-6 text-center'>
                        <div
                            className='w-[140px] h-[140px] rounded-lg flex items-center justify-center mx-auto mb-4 shadow-xl'
                            style={{ backgroundColor: themeColors[0] }}
                        >
                            {resumeData.profileInfo.profilePreviewUrl ? (
                                <img
                                    src={resumeData.profileInfo.profilePreviewUrl}
                                    className='w-[130px] h-[130px] rounded-lg object-cover'
                                    alt='Profile'
                                />
                            ) : (
                                <div
                                    className='w-[130px] h-[130px] flex items-center justify-center text-6xl rounded-lg'
                                    style={{ color: themeColors[4] }}
                                >
                                    <LuUser />
                                </div>
                            )}
                        </div>
                        <h1 className='text-2xl font-extrabold mb-1' style={{ color: themeColors[4] }}>
                            {resumeData.profileInfo.fullName}
                        </h1>
                        <p className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
                            {resumeData.profileInfo.designation}
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className='mb-6'>
                        <Title text="Contact" color={themeColors[4]} />
                        <div className='space-y-2 text-xs'>
                            {resumeData.contactInfo.email && (
                                <div className='flex items-start gap-2'>
                                    <LuMail className='mt-0.5 flex-shrink-0' style={{ color: themeColors[3] }} />
                                    <span className='text-gray-700 break-words'>{resumeData.contactInfo.email}</span>
                                </div>
                            )}
                            {resumeData.contactInfo.phone && (
                                <div className='flex items-start gap-2'>
                                    <LuPhone className='mt-0.5 flex-shrink-0' style={{ color: themeColors[3] }} />
                                    <span className='text-gray-700'>{resumeData.contactInfo.phone}</span>
                                </div>
                            )}
                            {resumeData.contactInfo.location && (
                                <div className='flex items-start gap-2'>
                                    <LuMapPinHouse className='mt-0.5 flex-shrink-0' style={{ color: themeColors[3] }} />
                                    <span className='text-gray-700'>{resumeData.contactInfo.location}</span>
                                </div>
                            )}
                            {resumeData.contactInfo.linkedin && (
                                <div className='flex items-start gap-2'>
                                    <RiLinkedinLine className='mt-0.5 flex-shrink-0' style={{ color: themeColors[3] }} />
                                    <span className='text-gray-700 break-words'>{resumeData.contactInfo.linkedin}</span>
                                </div>
                            )}
                            {resumeData.contactInfo.github && (
                                <div className='flex items-start gap-2'>
                                    <LuGithub className='mt-0.5 flex-shrink-0' style={{ color: themeColors[3] }} />
                                    <span className='text-gray-700 break-words'>{resumeData.contactInfo.github}</span>
                                </div>
                            )}
                            {resumeData.contactInfo.website && (
                                <div className='flex items-start gap-2'>
                                    <LuRss className='mt-0.5 flex-shrink-0' style={{ color: themeColors[3] }} />
                                    <span className='text-gray-700 break-words'>{resumeData.contactInfo.website}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Education */}
                    <div className='mb-6'>
                        <Title text="Education" color={themeColors[4]} />
                        {resumeData.education.map((data, index) => (
                            <div key={`education_${index}`} className='mb-4'>
                                <span className='block font-bold text-xs text-gray-900'>{data.degree}</span>
                                <span className='block text-xs text-gray-600 mt-1'>{data.institution}</span>
                                <span className='block text-xs text-gray-500 italic mt-0.5'>
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
                            bgColor={themeColors[0]}
                        />
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
                            <div className='flex flex-wrap gap-1.5'>
                                {resumeData.interests.map((interest, index) => (
                                    interest && (
                                        <div
                                            key={`interest_${index}`}
                                            className='text-xs font-medium py-1 px-2 rounded'
                                            style={{ backgroundColor: themeColors[0], color: themeColors[4] }}
                                        >
                                            {interest}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Main Content - 3/5 width */}
                <div className='col-span-3'>
                    {/* Professional Summary */}
                    <div className='mb-6'>
                        <Title text="Professional Summary" color={themeColors[4]} />
                        <p className='text-sm text-gray-700 leading-relaxed'>
                            {resumeData.profileInfo.summary}
                        </p>
                    </div>

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
                                bgColor={themeColors[0]}
                            />
                        ))}
                    </div>

                    {/* Certifications */}
                    <div>
                        <Title text="Certifications" color={themeColors[4]} />
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
                </div>
            </div>
        </div>
    );
};

export default TemplateFour;

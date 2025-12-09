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
    "#e3f2fd", // light blue background
    "#bbdefb", // lighter blue
    "#90caf9", // medium blue
    "#42a5f5", // accent blue
    "#1565c0"  // dark blue for text
];

const Title = ({ text, color }) => (
    <div className="mb-3 pb-2 border-b" style={{ borderColor: color }}>
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: color }}>
            {text}
        </h2>
    </div>
);

const TemplateSix = ({ resumeData, colorPalette, containerWidth }) => {
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
            <div className='grid grid-cols-3 gap-0'>
                {/* Left Sidebar */}
                <div className='col-span-1 p-8' style={{ backgroundColor: themeColors[0] }}>
                    {/* Profile */}
                    <div className='mb-6 text-center'>
                        <div
                            className='w-[100px] h-[100px] rounded-full flex items-center justify-center mx-auto mb-3 border-4'
                            style={{ borderColor: themeColors[3], backgroundColor: 'white' }}
                        >
                            {resumeData.profileInfo.profilePreviewUrl ? (
                                <img
                                    src={resumeData.profileInfo.profilePreviewUrl}
                                    className='w-[92px] h-[92px] rounded-full object-cover'
                                    alt='Profile'
                                />
                            ) : (
                                <div
                                    className='w-[92px] h-[92px] flex items-center justify-center text-4xl rounded-full'
                                    style={{ color: themeColors[4] }}
                                >
                                    <LuUser />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className='mb-6'>
                        <Title text="Contact" color={themeColors[4]} />
                        <div className='space-y-2 text-xs'>
                            {resumeData.contactInfo.email && (
                                <div className='break-words'>
                                    <div className='font-semibold text-gray-700'>Email</div>
                                    <div className='text-gray-600'>{resumeData.contactInfo.email}</div>
                                </div>
                            )}
                            {resumeData.contactInfo.phone && (
                                <div>
                                    <div className='font-semibold text-gray-700'>Phone</div>
                                    <div className='text-gray-600'>{resumeData.contactInfo.phone}</div>
                                </div>
                            )}
                            {resumeData.contactInfo.location && (
                                <div>
                                    <div className='font-semibold text-gray-700'>Location</div>
                                    <div className='text-gray-600'>{resumeData.contactInfo.location}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className='mb-6'>
                        <Title text="Skills" color={themeColors[4]} />
                        <SkillSection
                            skills={resumeData.skills}
                            accentColor={themeColors[3]}
                            bgColor="white"
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
                                            className='text-xs py-1 px-2 rounded'
                                            style={{ backgroundColor: 'white', color: themeColors[4] }}
                                        >
                                            {interest}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Main Content */}
                <div className='col-span-2 p-8'>
                    {/* Header */}
                    <div className='mb-6'>
                        <h1 className='text-4xl font-extrabold mb-1' style={{ color: themeColors[4] }}>
                            {resumeData.profileInfo.fullName}
                        </h1>
                        <p className='text-lg font-medium text-gray-600'>
                            {resumeData.profileInfo.designation}
                        </p>
                    </div>

                    {/* Summary */}
                    <div className='mb-6'>
                        <Title text="Professional Summary" color={themeColors[4]} />
                        <p className='text-sm text-gray-700 leading-relaxed'>
                            {resumeData.profileInfo.summary}
                        </p>
                    </div>

                    {/* Experience */}
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

                    {/* Education */}
                    <div className='mb-6'>
                        <Title text="Education" color={themeColors[4]} />
                        {resumeData.education.map((data, index) => (
                            <div key={`education_${index}`} className='mb-3'>
                                <span className='block font-bold text-sm text-gray-900'>{data.degree}</span>
                                <span className='block text-sm text-gray-600'>{data.institution}</span>
                                <span className='block text-xs text-gray-500 italic'>
                                    {`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                                </span>
                            </div>
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

export default TemplateSix;

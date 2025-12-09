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
    "#fce4ec", // light pink background
    "#f8bbd0", // lighter pink
    "#f48fb1", // medium pink
    "#ec407a", // accent pink
    "#c2185b"  // dark pink for text
];

const Title = ({ text, color }) => (
    <div className="mb-4 flex items-center gap-2">
        <div
            className="w-8 h-0.5"
            style={{ backgroundColor: color }}
        ></div>
        <h2
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: color }}
        >
            {text}
        </h2>
        <div
            className="flex-1 h-0.5"
            style={{ backgroundColor: color }}
        ></div>
    </div>
);

const TemplateFive = ({ resumeData, colorPalette, containerWidth }) => {
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
            className='p-10 bg-white'
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                height: "auto",
            }}
        >
            {/* Centered Header */}
            <div className='text-center mb-8'>
                <h1 className='text-5xl font-extrabold mb-2' style={{ color: themeColors[4] }}>
                    {resumeData.profileInfo.fullName}
                </h1>
                <p className='text-lg font-medium text-gray-600 mb-4'>
                    {resumeData.profileInfo.designation}
                </p>
                <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-700'>
                    {resumeData.contactInfo.email && <span>{resumeData.contactInfo.email}</span>}
                    {resumeData.contactInfo.phone && <span>•</span>}
                    {resumeData.contactInfo.phone && <span>{resumeData.contactInfo.phone}</span>}
                    {resumeData.contactInfo.location && <span>•</span>}
                    {resumeData.contactInfo.location && <span>{resumeData.contactInfo.location}</span>}
                </div>
            </div>

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

            {/* Skills */}
            <div className='mb-6'>
                <Title text="Skills" color={themeColors[4]} />
                <SkillSection
                    skills={resumeData.skills}
                    accentColor={themeColors[3]}
                    bgColor={themeColors[0]}
                />
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

            <div className='grid grid-cols-2 gap-6'>
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

                {/* Languages */}
                <div>
                    <Title text="Languages" color={themeColors[4]} />
                    <LanguageSection languages={resumeData.languages} />
                </div>
            </div>
        </div>
    );
};

export default TemplateFive;

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
    "#b3e5fc", // sidebar background (light blue)
    "#b3e5fc", // profile image background (light blue)
    "#b3e5fc", // icon backgrounds (light blue)
    "#00acc1", // accent (cyan)
    "#006064"  // icon color (dark cyan)
];



const Title = ({ text, color, themeColors }) => (
    <div className="relative w-fit mb-2.5">
        <span
            className="absolute bottom-0 left-0 w-full h-3 rounded z-0"
            style={{ backgroundColor: '#b3e5fc' }}
        ></span>
        <h2 className="relative text-sm font-bold z-10">{text}</h2>
    </div>
);

const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
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
            className='p-3 bg-white'
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                height: "auto",
            }}
        >
            <div className='grid grid-cols-12 gap-8 text-gray-800'>
                {/* Sidebar */}
                <div
                    className='col-span-4 py-10 !bg-[#ebf8ff] flex flex-col h-full justify-start'
                    style={{ backgroundColor: "#b3e5fc" }}
                >
                    <div className='flex flex-col items-center px-2'>
                        <div
                            className='w-[100px] h-[100px] rounded-full flex items-center justify-center mb-4 shadow-md'
                            style={{ backgroundColor: themeColors[1] }}
                        >
                            {resumeData.profileInfo.profilePreviewUrl ? (
                                <img
                                    src={resumeData.profileInfo.profilePreviewUrl}
                                    className='w-[90px] h-[90px] rounded-full'
                                    alt='Profile'
                                />
                            ) : (
                                <div
                                    className='w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full'
                                    style={{ color: themeColors[4], backgroundColor: "#b3e5fc" }}
                                >
                                    <LuUser />
                                </div>
                            )}
                        </div>
                        <h2 className='text-xl font-bold mt-2 mb-0.5'>{resumeData.profileInfo.fullName}</h2>
                        <p className='text-sm text-center text-gray-600 mb-2'>{resumeData.profileInfo.designation}</p>
                    </div>

                    {/* Sidebar info */}
                    <div className='my-6 mx-6 flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <ContactInfo icon={<LuMapPinHouse />} iconBG={"#b3e5fc"} value={resumeData.contactInfo.location} />
                            <ContactInfo icon={<LuMail />} iconBG={"#b3e5fc"} value={resumeData.contactInfo.email} />
                            <ContactInfo icon={<LuPhone />} iconBG={"#b3e5fc"} value={resumeData.contactInfo.phone} />
                            {resumeData.contactInfo.linkedin && (
                                <ContactInfo icon={<RiLinkedinLine />} iconBG={"#b3e5fc"} value={resumeData.contactInfo.linkedin} />
                            )}
                            {resumeData.contactInfo.github && (
                                <ContactInfo icon={<LuGithub />} iconBG={"#b3e5fc"} value={resumeData.contactInfo.github} />
                            )}
                            {resumeData.contactInfo.website && (
                                <ContactInfo icon={<LuRss />} iconBG={"#b3e5fc"} value={resumeData.contactInfo.website} />
                            )}
                        </div>
                        <div className='border-t border-blue-200 my-3'></div>
                        {/* Education */}
                        <div>
                            <div className='text-xs font-semibold text-blue-700 uppercase mb-1 tracking-wide'>Education</div>
                            {resumeData.education.map((data, index) => (
                                <div key={`education_${index}`} className='mb-2'>
                                    <span className='block font-bold text-[13px] text-gray-900'>{data.degree}</span>
                                    <span className='block text-[12px] text-gray-600'>{data.institution}</span>
                                    <span className='block text-[11px] text-gray-500 italic'>{`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}</span>
                                </div>
                            ))}
                        </div>
                        <div className='border-t border-blue-200 my-3'></div>
                        {/* Languages */}
                        <div>
                            <div className='text-xs font-semibold text-blue-700 uppercase mb-1 tracking-wide'>Languages</div>
                            <LanguageSection languages={resumeData.languages} />
                        </div>
                        <div className='border-t border-blue-200 my-3'></div>
                        {/* Skills */}
                    </div>
                </div>

                {/* Main content */}
                <div className='col-span-8 pt-10 mr-10 pb-5'>
                    <div>
                        <Title text="Professional Summary" color={themeColors[1]} themeColors={themeColors} />
                        <p className='text-sm font-medium'>
                            {resumeData.profileInfo.summary}
                        </p>
                    </div>

                    <div className='mt-4'>
                        <Title text="Work Experience" color={themeColors[1]} themeColors={themeColors} />
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

                    <div className='mt-4'>
                        <Title text="Projects" color={themeColors[1]} themeColors={themeColors} />
                        {resumeData.projects.map((project, index) => (
                            <ProjectInfo
                                key={`project_${index}`}
                                title={project.title}
                                description={project.description}
                                github={project.github}
                                liveDemoUrl={project.liveDemo}
                                bgColor={themeColors[2]}
                            />
                        ))}
                    </div>

                    <div className='mt-4'>
                        <Title text="Skills" color={"#b3e5fc"} themeColors={themeColors} />
                        <SkillSection
                            skills={resumeData.skills}
                            accentColor={themeColors[3]}
                            bgColor={themeColors[2]}
                        />
                    </div>

                    <div className='mt-4'>
                        <Title text="Certifications" color={"#b3e5fc"} themeColors={themeColors} />
                        {resumeData.certifications.map((data, index) => (
                            <CertificationInfo
                                key={`cert_${index}`}
                                title={data.title}
                                issuer={data.issuer}
                                year={data.year}
                                bgColor={themeColors[2]}
                            />
                        ))}
                    </div>

                    {resumeData.interests?.length > 0 && resumeData.interests[0] !== "" && (
                        <div className='mt-4'>
                            <Title text="Interests" color={themeColors[1]} themeColors={themeColors} />
                            <div className='flex items-center flex-wrap gap-3 mt-4'>
                                {resumeData.interests.map((interest, index) => (
                                    interest && (
                                        <div
                                            key={`interest_${index}`}
                                            className='text-[10px] font-medium py-1 px-3 rounded-lg text-white'
                                            style={{ backgroundColor: "#b3e5fc" }}
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

export default TemplateOne;

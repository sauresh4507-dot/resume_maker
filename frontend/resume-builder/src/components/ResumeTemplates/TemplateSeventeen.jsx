import React, { useEffect, useRef, useState } from 'react';
import { formatYearMonth } from '../../utils/helper';

const TemplateSeventeen = ({ resumeData, colorPalette, containerWidth }) => {
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    const primaryColor = colorPalette?.[0] || "#000000";
    const accentColor = colorPalette?.[1] || "#555555";

    useEffect(() => {
        if (resumeRef.current) {
            const actualBaseWidth = resumeRef.current.offsetWidth;
            setBaseWidth(actualBaseWidth);
            setScale(containerWidth / actualBaseWidth);
        }
    }, [containerWidth]);

    const SectionTitle = ({ title }) => (
        <div className="mb-4 mt-6">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-gray-800 pb-1" style={{ color: primaryColor }}>
                {title}
            </h2>
        </div>
    );

    return (
        <div
            ref={resumeRef}
            className="bg-white p-12 text-gray-800"
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                minHeight: "1123px",
                fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif"
            }}
        >
            {/* Header */}
            <header className="mb-8 border-b-4 border-gray-900 pb-6">
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-4" style={{ color: primaryColor }}>
                    {resumeData.profileInfo.fullName}
                </h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-600">
                    {resumeData.contactInfo.email && (
                        <span>{resumeData.contactInfo.email}</span>
                    )}
                    {resumeData.contactInfo.phone && (
                        <span>{resumeData.contactInfo.phone}</span>
                    )}
                    {resumeData.contactInfo.linkedin && (
                        <a href={resumeData.contactInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-black">
                            LinkedIn
                        </a>
                    )}
                    {resumeData.contactInfo.github && (
                        <a href={resumeData.contactInfo.github} target="_blank" rel="noreferrer" className="hover:text-black">
                            GitHub
                        </a>
                    )}
                    {resumeData.contactInfo.website && (
                        <a href={resumeData.contactInfo.website} target="_blank" rel="noreferrer" className="hover:text-black">
                            Portfolio
                        </a>
                    )}
                    {resumeData.contactInfo.location && (
                        <span>{resumeData.contactInfo.location}</span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {resumeData.profileInfo.summary && (
                <div className="mb-6">
                    <p className="text-base leading-relaxed text-gray-700">
                        {resumeData.profileInfo.summary}
                    </p>
                </div>
            )}

            {/* Skills */}
            {resumeData.skills?.length > 0 && (
                <section>
                    <SectionTitle title="Skills" />
                    <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                            <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm font-semibold text-gray-800 border border-gray-200">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {resumeData.workExperience?.length > 0 && (
                <section>
                    <SectionTitle title="Experience" />
                    <div className="flex flex-col gap-8">
                        {resumeData.workExperience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-end mb-1">
                                    <h3 className="text-xl font-bold text-gray-900">{exp.company}</h3>
                                    <span className="text-sm font-medium text-gray-500">
                                        {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                                    </span>
                                </div>
                                <div className="text-md font-semibold text-gray-700 mb-2 italic">
                                    {exp.role}
                                </div>
                                <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {resumeData.projects?.length > 0 && (
                <section>
                    <SectionTitle title="Projects" />
                    <div className="grid grid-cols-1 gap-6">
                        {resumeData.projects.map((project, index) => (
                            <div key={index} className="border-l-2 border-gray-200 pl-4">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                                    <div className="flex gap-3 text-xs font-bold uppercase tracking-wider">
                                        {project.github && <a href={project.github} className="hover:underline">Code</a>}
                                        {project.liveDemo && <a href={project.liveDemo} className="hover:underline">Live</a>}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700">
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {resumeData.education?.length > 0 && (
                <section>
                    <SectionTitle title="Education" />
                    <div className="flex flex-col gap-4">
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-lg text-gray-900">{edu.institution}</div>
                                    <div className="text-gray-700">{edu.degree}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default TemplateSeventeen;

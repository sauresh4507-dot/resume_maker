import React, { useEffect, useRef, useState } from 'react';
import { formatYearMonth } from '../../utils/helper';

const TemplateEighteen = ({ resumeData, colorPalette, containerWidth }) => {
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    const primaryColor = colorPalette?.[0] || "#222222";
    const accentColor = colorPalette?.[1] || "#555555";

    useEffect(() => {
        if (resumeRef.current) {
            const actualBaseWidth = resumeRef.current.offsetWidth;
            setBaseWidth(actualBaseWidth);
            setScale(containerWidth / actualBaseWidth);
        }
    }, [containerWidth]);

    const SectionTitle = ({ title }) => (
        <div className="mb-2 border-b border-gray-300 pb-1 mt-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 font-sans">
                {title}
            </h2>
        </div>
    );

    return (
        <div
            ref={resumeRef}
            className="bg-white p-8 text-gray-800"
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                minHeight: "1123px",
                fontFamily: "'Lato', 'Open Sans', Helvetica, sans-serif",
                lineHeight: '1.4'
            }}
        >
            {/* Header - Full Width for ATS safety */}
            <header className="mb-6 border-b-2 border-gray-800 pb-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {resumeData.profileInfo.fullName}
                        </h1>
                        <div className="text-sm font-medium text-gray-600">
                            {resumeData.profileInfo.designation}
                        </div>
                    </div>
                    <div className="text-right text-xs font-medium text-gray-600 flex flex-col gap-1">
                        {resumeData.contactInfo.email && <a href={`mailto:${resumeData.contactInfo.email}`} className="hover:text-black">{resumeData.contactInfo.email}</a>}
                        {resumeData.contactInfo.phone && <span>{resumeData.contactInfo.phone}</span>}
                        {resumeData.contactInfo.location && <span>{resumeData.contactInfo.location}</span>}
                        <div className="flex gap-2 justify-end mt-1">
                            {resumeData.contactInfo.linkedin && <a href={resumeData.contactInfo.linkedin} className="hover:text-black hover:underline">LinkedIn</a>}
                            {resumeData.contactInfo.github && <a href={resumeData.contactInfo.github} className="hover:text-black hover:underline">GitHub</a>}
                            {resumeData.contactInfo.website && <a href={resumeData.contactInfo.website} className="hover:text-black hover:underline">Portfolio</a>}
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex gap-6">
                {/* Left Column - Education, Skills, etc. (Narrower) */}
                <div className="w-[35%] flex flex-col gap-6">
                    {/* Education */}
                    {resumeData.education?.length > 0 && (
                        <section>
                            <SectionTitle title="Education" />
                            <div className="flex flex-col gap-4">
                                {resumeData.education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="font-bold text-sm text-gray-900">{edu.institution}</div>
                                        <div className="text-xs text-gray-700 italic mb-1">{edu.degree}</div>
                                        <div className="text-xs text-gray-500 font-medium">
                                            {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {resumeData.skills?.length > 0 && (
                        <section>
                            <SectionTitle title="Skills" />
                            <div className="flex flex-col gap-2 text-xs">
                                {resumeData.skills.map((skill, index) => (
                                    <div key={index}>
                                        <span className="font-bold text-gray-800">{skill.name}</span>
                                        {/* If we had levels or sub-skills, they'd go here. For now, just listing names nicely. */}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {resumeData.languages?.length > 0 && (
                        <section>
                            <SectionTitle title="Languages" />
                            <div className="flex flex-col gap-1 text-xs">
                                {resumeData.languages.map((lang, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="font-medium text-gray-800">{lang.name}</span>
                                        <span className="text-gray-500 italic">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications (Small) */}
                    {resumeData.certifications?.length > 0 && (
                        <section>
                            <SectionTitle title="Certifications" />
                            <div className="flex flex-col gap-2 text-xs">
                                {resumeData.certifications.map((cert, index) => (
                                    <div key={index}>
                                        <div className="font-bold text-gray-800">{cert.title}</div>
                                        <div className="text-gray-500">{cert.year}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column - Experience, Projects (Wider) */}
                <div className="w-[65%] flex flex-col gap-6">
                    {/* Experience */}
                    {resumeData.workExperience?.length > 0 && (
                        <section>
                            <SectionTitle title="Experience" />
                            <div className="flex flex-col gap-5">
                                {resumeData.workExperience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-sm text-gray-900 uppercase">{exp.company}</h3>
                                            <span className="text-xs font-medium text-gray-500">
                                                {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                                            </span>
                                        </div>
                                        <div className="text-xs font-bold text-gray-700 mb-1 italic">
                                            {exp.role}
                                        </div>
                                        <p className="text-xs leading-relaxed text-gray-800 text-justify">
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
                            <div className="flex flex-col gap-4">
                                {resumeData.projects.map((project, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-sm text-gray-900">{project.title}</h3>
                                            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                                {project.github && <a href={project.github} className="hover:text-black">Code</a>}
                                                {project.liveDemo && <a href={project.liveDemo} className="hover:text-black">Live</a>}
                                            </div>
                                        </div>
                                        <p className="text-xs leading-relaxed text-gray-800 text-justify">
                                            {project.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateEighteen;

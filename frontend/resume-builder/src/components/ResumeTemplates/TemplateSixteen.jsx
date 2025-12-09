import React, { useEffect, useRef, useState } from 'react';
import { formatYearMonth } from '../../utils/helper';

const TemplateSixteen = ({ resumeData, colorPalette, containerWidth }) => {
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    // Tech resumes are usually black and white, maybe a very subtle blue for links.
    const primaryColor = colorPalette?.[0] || "#000000";
    const linkColor = colorPalette?.[1] || "#2563eb"; // Standard link blue

    useEffect(() => {
        if (resumeRef.current) {
            const actualBaseWidth = resumeRef.current.offsetWidth;
            setBaseWidth(actualBaseWidth);
            setScale(containerWidth / actualBaseWidth);
        }
    }, [containerWidth]);

    const SectionTitle = ({ title }) => (
        <div className="mb-2 border-b border-gray-300 pb-1 mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                {title}
            </h2>
        </div>
    );

    return (
        <div
            ref={resumeRef}
            className="bg-white p-10 text-gray-900"
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                minHeight: "1123px",
                fontFamily: 'Arial, Helvetica, sans-serif', // Standard sans-serif for tech
                lineHeight: '1.5'
            }}
        >
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 uppercase tracking-tight">
                    {resumeData.profileInfo.fullName}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-3 text-[13px] text-gray-700">
                    {resumeData.contactInfo.email && (
                        <a href={`mailto:${resumeData.contactInfo.email}`} className="hover:underline" style={{ color: linkColor }}>
                            {resumeData.contactInfo.email}
                        </a>
                    )}
                    {resumeData.contactInfo.phone && (
                        <>
                            <span className="text-gray-400">|</span>
                            <span>{resumeData.contactInfo.phone}</span>
                        </>
                    )}
                    {resumeData.contactInfo.linkedin && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={resumeData.contactInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: linkColor }}>
                                LinkedIn
                            </a>
                        </>
                    )}
                    {resumeData.contactInfo.github && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={resumeData.contactInfo.github} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: linkColor }}>
                                GitHub
                            </a>
                        </>
                    )}
                    {resumeData.contactInfo.website && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={resumeData.contactInfo.website} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: linkColor }}>
                                Portfolio
                            </a>
                        </>
                    )}
                </div>
            </div>

            {/* Skills - Top for Tech */}
            {resumeData.skills?.length > 0 && (
                <div>
                    <SectionTitle title="Technical Skills" />
                    <div className="text-[13px]">
                        <div className="flex gap-2">
                            <span className="font-bold text-gray-800">Languages & Tools:</span>
                            <span className="text-gray-700">
                                {resumeData.skills.map(skill => skill.name).join(", ")}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Education */}
            {resumeData.education?.length > 0 && (
                <div>
                    <SectionTitle title="Education" />
                    <div className="flex flex-col gap-2">
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start text-[13px]">
                                <div>
                                    <div className="font-bold text-gray-900">{edu.institution}</div>
                                    <div className="italic text-gray-700">{edu.degree}</div>
                                </div>
                                <div className="text-right whitespace-nowrap font-medium text-gray-600">
                                    {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience */}
            {resumeData.workExperience?.length > 0 && (
                <div>
                    <SectionTitle title="Experience" />
                    <div className="flex flex-col gap-4">
                        {resumeData.workExperience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold text-[14px] text-gray-900">{exp.company}</h3>
                                    <span className="text-[13px] font-medium text-gray-600 whitespace-nowrap">
                                        {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                                    </span>
                                </div>
                                <div className="mb-1">
                                    <span className="text-[13px] font-bold italic text-gray-700">{exp.role}</span>
                                </div>
                                <p className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {resumeData.projects?.length > 0 && (
                <div>
                    <SectionTitle title="Projects" />
                    <div className="flex flex-col gap-3">
                        {resumeData.projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-[14px] text-gray-900">{project.title}</h3>
                                        {project.github && (
                                            <a href={project.github} className="text-[11px] hover:underline" style={{ color: linkColor }}>[GitHub]</a>
                                        )}
                                        {project.liveDemo && (
                                            <a href={project.liveDemo} className="text-[11px] hover:underline" style={{ color: linkColor }}>[Live]</a>
                                        )}
                                    </div>
                                </div>
                                <p className="text-[13px] leading-relaxed text-gray-800">
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {resumeData.certifications?.length > 0 && (
                <div>
                    <SectionTitle title="Certifications" />
                    <ul className="list-disc list-inside text-[13px] text-gray-800">
                        {resumeData.certifications.map((cert, index) => (
                            <li key={index}>
                                <span className="font-bold">{cert.title}</span>
                                {cert.issuer && <span> — {cert.issuer}</span>}
                                {cert.year && <span className="text-gray-600"> ({cert.year})</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TemplateSixteen;

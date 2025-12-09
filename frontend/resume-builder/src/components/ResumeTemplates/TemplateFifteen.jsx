import React, { useEffect, useRef, useState } from 'react';
import { formatYearMonth } from '../../utils/helper';
import { LuMapPin, LuMail, LuPhone, LuLinkedin, LuGithub, LuGlobe } from "react-icons/lu";

const TemplateFifteen = ({ resumeData, colorPalette, containerWidth }) => {
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    // Harvard style typically uses black/dark gray. We'll use the palette if provided, but default to classic darks.
    const primaryColor = colorPalette?.[0] || "#000000";
    const accentColor = colorPalette?.[1] || "#333333";

    useEffect(() => {
        if (resumeRef.current) {
            const actualBaseWidth = resumeRef.current.offsetWidth;
            setBaseWidth(actualBaseWidth);
            setScale(containerWidth / actualBaseWidth);
        }
    }, [containerWidth]);

    const SectionTitle = ({ title }) => (
        <div className="mb-3 border-b border-gray-400 pb-1">
            <h2 className="text-base font-bold uppercase tracking-wide" style={{ color: primaryColor, fontFamily: 'Georgia, serif' }}>
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
                minHeight: "1123px", // A4 height approx
                fontFamily: 'Georgia, serif'
            }}
        >
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2 uppercase tracking-wider" style={{ color: primaryColor }}>
                    {resumeData.profileInfo.fullName}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
                    {resumeData.contactInfo.location && (
                        <div className="flex items-center gap-1">
                            <span>{resumeData.contactInfo.location}</span>
                        </div>
                    )}
                    {resumeData.contactInfo.phone && (
                        <div className="flex items-center gap-1">
                            <span>•</span>
                            <span>{resumeData.contactInfo.phone}</span>
                        </div>
                    )}
                    {resumeData.contactInfo.email && (
                        <div className="flex items-center gap-1">
                            <span>•</span>
                            <a href={`mailto:${resumeData.contactInfo.email}`} className="hover:underline">
                                {resumeData.contactInfo.email}
                            </a>
                        </div>
                    )}
                    {resumeData.contactInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <span>•</span>
                            <a href={resumeData.contactInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                                LinkedIn
                            </a>
                        </div>
                    )}
                    {resumeData.contactInfo.github && (
                        <div className="flex items-center gap-1">
                            <span>•</span>
                            <a href={resumeData.contactInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                                GitHub
                            </a>
                        </div>
                    )}
                    {resumeData.contactInfo.website && (
                        <div className="flex items-center gap-1">
                            <span>•</span>
                            <a href={resumeData.contactInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                                Portfolio
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary (Optional for Harvard style, but often good) */}
            {resumeData.profileInfo.summary && (
                <div className="mb-6">
                    <p className="text-sm leading-relaxed text-justify">
                        {resumeData.profileInfo.summary}
                    </p>
                </div>
            )}

            {/* Education - Often top for Harvard style */}
            {resumeData.education?.length > 0 && (
                <div className="mb-6">
                    <SectionTitle title="Education" />
                    <div className="flex flex-col gap-3">
                        {resumeData.education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-md">{edu.institution}</h3>
                                    <span className="text-sm italic">
                                        {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm font-medium italic">{edu.degree}</span>
                                    {/* GPA or Honors could go here if added to data model */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience */}
            {resumeData.workExperience?.length > 0 && (
                <div className="mb-6">
                    <SectionTitle title="Professional Experience" />
                    <div className="flex flex-col gap-5">
                        {resumeData.workExperience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-md">{exp.company}</h3>
                                    <span className="text-sm italic">
                                        {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                                    </span>
                                </div>
                                <div className="mb-1">
                                    <span className="text-sm font-semibold italic">{exp.role}</span>
                                </div>
                                <p className="text-sm leading-relaxed text-justify whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {resumeData.projects?.length > 0 && (
                <div className="mb-6">
                    <SectionTitle title="Projects" />
                    <div className="flex flex-col gap-4">
                        {resumeData.projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-md">{project.title}</h3>
                                    <div className="flex gap-3 text-xs">
                                        {project.github && (
                                            <a href={project.github} className="hover:underline text-blue-800">GitHub</a>
                                        )}
                                        {project.liveDemo && (
                                            <a href={project.liveDemo} className="hover:underline text-blue-800">Live Demo</a>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed text-justify">
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {resumeData.skills?.length > 0 && (
                <div className="mb-6">
                    <SectionTitle title="Skills" />
                    <div className="text-sm">
                        <span className="font-bold">Technical Skills: </span>
                        <span>
                            {resumeData.skills.map(skill => skill.name).join(", ")}
                        </span>
                    </div>
                </div>
            )}

            {/* Certifications */}
            {resumeData.certifications?.length > 0 && (
                <div className="mb-6">
                    <SectionTitle title="Certifications" />
                    <ul className="list-disc list-inside text-sm">
                        {resumeData.certifications.map((cert, index) => (
                            <li key={index}>
                                <span className="font-bold">{cert.title}</span>
                                {cert.issuer && <span> — {cert.issuer}</span>}
                                {cert.year && <span> ({cert.year})</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Languages & Interests mixed line if needed, or separate */}
            {(resumeData.languages?.length > 0 || resumeData.interests?.length > 0) && (
                <div className="mb-6">
                    <SectionTitle title="Additional" />
                    <div className="text-sm flex flex-col gap-2">
                        {resumeData.languages?.length > 0 && (
                            <div>
                                <span className="font-bold">Languages: </span>
                                <span>{resumeData.languages.map(l => l.name).join(", ")}</span>
                            </div>
                        )}
                        {resumeData.interests?.length > 0 && resumeData.interests[0] && (
                            <div>
                                <span className="font-bold">Interests: </span>
                                <span>{resumeData.interests.join(", ")}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateFifteen;

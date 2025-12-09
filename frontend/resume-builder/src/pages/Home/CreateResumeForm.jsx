import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input.jsx"
import axiosInstance from "../../utils/axioinstance";
import { API_PATHS } from "../../utils/apiPaths";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import { LuCircleCheckBig } from "react-icons/lu";

const TEMPLATES = [
    { id: "01", name: "Classic Sidebar", description: "Professional sidebar layout with blue accents" },
    { id: "02", name: "Minimalist Header", description: "Clean top header with two-column layout" },
    { id: "03", name: "Bold Banner", description: "Eye-catching header banner with single column" },
    { id: "04", name: "Elegant Split", description: "Sophisticated sidebar with vertical accents" },
    { id: "05", name: "Centered Classic", description: "Centered header with decorative line separators" },
    { id: "06", name: "Light Sidebar", description: "Clean 1/3-2/3 split with light colored sidebar" },
    { id: "07", name: "Top Banner Pro", description: "Bold top banner with boxed section headers" },
    { id: "08", name: "Vertical Accent", description: "Compact design with vertical accent bar" },
    { id: "09", name: "Dark Sidebar", description: "Professional dark sidebar design" },
    { id: "10", name: "Icon Badges", description: "Circular icon badges for sections" },
    { id: "11", name: "Square Profile", description: "2/5-3/5 split with square profile image" },
    { id: "12", name: "Full Header", description: "Full-width colored header banner" },
    { id: "13", name: "Pill Headers", description: "Pill-shaped section headers" },
    { id: "14", name: "Card Style", description: "Rounded card header with bar accents" },
    { id: "15", name: "Harvard Professional", description: "Clean, text-focused design for maximum professionalism" },
    { id: "16", name: "Tech Standard", description: "The de-facto standard for FAANG/Tech resumes" },
    { id: "17", name: "Modern Minimalist", description: "Sleek, sans-serif design for modern tech roles" },
    { id: "18", name: "Compact Tech", description: "High-density two-column layout for experienced pros" }
];

const CreateResumeForm = () => {
    const [title, setTitle] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("01");
    const [error, setError] = useState(null);
    const [hoveredTemplate, setHoveredTemplate] = useState(null);

    const navigate = useNavigate();

    const handleCreateResume = async (e) => {
        e.preventDefault();

        if (!title) {
            setError("Please enter a resume title.");
            return;
        }
        setError("");

        try {
            const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
                title,
                template: {
                    theme: selectedTheme,
                    colorPalette: []
                }
            });
            if (response.data?._id) {
                navigate(`/resume/${response.data?._id}`);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    // Dummy data for preview
    const dummyResumeData = {
        profileInfo: {
            fullName: "John Doe",
            designation: "Software Engineer",
            summary: "Experienced developer..."
        },
        contactInfo: {
            email: "john@example.com",
            phone: "+1 234 567 890",
            location: "New York, USA"
        },
        skills: [{ name: "React", progress: 80 }, { name: "Node.js", progress: 70 }],
        workExperience: [],
        education: [],
        projects: [],
        certifications: [],
        languages: [],
        interests: []
    };

    return (
        <div className="w-full p-6 flex flex-col h-[85vh]">
            <div className="flex-none">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Create New Resume</h3>
                <p className="text-gray-600 mb-6">
                    Give your resume a title and choose a template to get started.
                </p>

                <div className="mb-6">
                    <Input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        label="Resume Title"
                        placeholder="Eg: Mike's Resume"
                        type="text"
                        className="focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 mb-6 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Template</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TEMPLATES.map((template) => (
                        <div
                            key={template.id}
                            className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border-2 ${selectedTheme === template.id
                                ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                                }`}
                            onClick={() => setSelectedTheme(template.id)}
                            onMouseEnter={() => setHoveredTemplate(template.id)}
                            onMouseLeave={() => setHoveredTemplate(null)}
                        >
                            {selectedTheme === template.id && (
                                <div className="absolute top-2 right-2 z-20 bg-blue-600 rounded-full p-1 shadow-lg">
                                    <LuCircleCheckBig size={16} className="text-white" />
                                </div>
                            )}

                            <div className="relative h-48 bg-gray-50 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center transform scale-[0.2] origin-top-center mt-4">
                                    <div className="w-[800px] h-[1000px] bg-white shadow-sm">
                                        <RenderResume
                                            templateId={template.id}
                                            resumeData={dummyResumeData}
                                            colorPalette={[]}
                                            containerWidth={800}
                                        />
                                    </div>
                                </div>
                                {hoveredTemplate === template.id && selectedTheme !== template.id && (
                                    <div className="absolute inset-0 bg-blue-600 bg-opacity-5 transition-colors"></div>
                                )}
                            </div>

                            <div className={`p-3 border-t ${selectedTheme === template.id ? 'bg-blue-50' : 'bg-white'}`}>
                                <h4 className="font-semibold text-gray-900 text-sm">{template.name}</h4>
                                <p className="text-xs text-gray-500 truncate">{template.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-none pt-4 border-t border-gray-100">
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <button
                    onClick={handleCreateResume}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 active:scale-[0.99] text-lg"
                >
                    Create Resume
                </button>
            </div>
        </div>
    )
}

export default CreateResumeForm
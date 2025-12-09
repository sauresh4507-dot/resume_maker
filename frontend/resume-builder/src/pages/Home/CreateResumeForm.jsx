import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input.jsx"
import axiosInstance from "../../utils/axioinstance"; // <-- Import your axios instance
import { API_PATHS } from "../../utils/apiPaths"; // <-- Import your API paths

const CreateResumeForm = () => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleCreateResume = async (e) => {
        e.preventDefault();

        if (!title) {
            setError("Please enter a resume title.");
            return;
        }
        setError("");

        try {
            // Send POST request to create resume
            const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, { 
                title,
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

    return (
        <div className="w-[75vw] md:w-[71vh] p-9 flex flex-col justify-center transition-transform transform hover:scale-[1.02] w-[70vh]">
            <h3 className="text-xl font-bold text-purple-700 mb-4 p-2">Create New Resume</h3>
            <p className="text-sm text-gray-500 mb-6">
                Give your resume a title to get started. You can edit all details later.
            </p>
            <form onSubmit={handleCreateResume} className="space-y-5">
                <Input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    label="Resume Title"
                    placeholder="Eg: Mike's Resume"
                    type="text"
                    className="focus:ring-2 focus:ring-purple-400 transition"
                />
                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition-all duration-200 active:scale-95 text-base"
                >
                    Create Resume
                </button>
            </form>
        </div>
    )
}

export default CreateResumeForm
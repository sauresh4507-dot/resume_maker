import React from "react";
import Input from "../../../components/inputs/input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const EducationDetailsForm = ({ educationInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
    const formatMonthValue = (val) => {
        if (!val) return "";
        if (/^\d{4}-\d{2}$/.test(val)) return val;
        const date = new Date(val);
        if (!isNaN(date)) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            return `${year}-${month}`;
        }
        return "";
    };

    return (
        <div className="px-5 pt-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Education</h2>
            <div className="flex flex-col gap-6 mb-3">
                {educationInfo.map((education, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl relative transition-all duration-200 hover:shadow-lg"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Degree"
                                placeholder="B.Tech in Computer Science"
                                type="text"
                                value={education.degree || ""}
                                onChange={({ target }) =>
                                    updateArrayItem(index, "degree", target.value)
                                }
                            />
                            <Input
                                label="Institution"
                                placeholder="XYZ University"
                                type="text"
                                value={education.institution || ""}
                                onChange={({ target }) =>
                                    updateArrayItem(index, "institution", target.value)
                                }
                            />
                            <Input
                                label="Start Date"
                                type="month"
                                value={formatMonthValue(education.startDate)}
                                onChange={({ target }) =>
                                    updateArrayItem(index, "startDate", target.value)
                                }
                            />
                            <Input
                                label="End Date"
                                type="month"
                                value={formatMonthValue(education.endDate)}
                                onChange={({ target }) =>
                                    updateArrayItem(index, "endDate", target.value)
                                }
                            />
                        </div>
                        {educationInfo.length > 1 && (
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-lg text-red-600 bg-red-50 hover:bg-red-100 rounded-full p-2 shadow-sm transition-all duration-150"
                                onClick={() => removeArrayItem(index)}
                                title="Remove Education"
                            >
                                <LuTrash2 />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-semibold shadow-md hover:bg-blue-700 transition-all duration-150 self-start mt-2"
                    onClick={() => addArrayItem({ degree: "", institution: "", startDate: "", endDate: "" })}
                >
                    <LuPlus className="text-xl" />
                    Add Education
                </button>
            </div>
        </div>
    );
};

export default EducationDetailsForm;
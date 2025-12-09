import React from "react";
import Input from "../../../components/inputs/input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const SkillsInfoForm = ({ skillsInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Skills
      </h2>
      <div className="flex flex-col gap-6 mb-3">
        {skillsInfo.map((skill, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl relative transition-all duration-200 hover:shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Skill Name"
                placeholder="e.g. JavaScript"
                type="text"
                value={skill.name || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "name", target.value)
                }
              />
              <div className="">
                <label className="">
                    Proficiency ({(skill.progress || 0) / 20}/5)
                </label>

                <div className="mt-5">
                    <RatingInput
                        value={skill.progress || 0}
                        total={5}
                        onChange={(newValue) => 
                            updateArrayItem(index, "progress", newValue)
                        }
                        color="#2563eb"
                        bgColor="#e0e7ff"
                    />

                </div>

                </div>
                </div>
            {skillsInfo.length > 1 && (
              <button
                type="button"
                className="absolute top-4 right-4 text-lg text-red-600 bg-red-50 hover:bg-red-100 rounded-full p-2 shadow-sm transition-all duration-150"
                onClick={() => removeArrayItem(index)}
                title="Remove Skill"
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-semibold shadow-md hover:bg-blue-700 transition-all duration-150 self-start mt-2"
          onClick={() => addArrayItem({ name: "", progress: 0 })}
        >
          <LuPlus className="text-xl" />
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default SkillsInfoForm;

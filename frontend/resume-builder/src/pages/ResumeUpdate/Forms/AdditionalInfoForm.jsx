import React from "react";
import Input from "../../../components/inputs/input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const AdditionalInfoForm = ({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5 flex flex-col items-center min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Additional Information
      </h2>
      <div className="w-full max-w-2xl flex flex-col gap-10">
        {/* Languages Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Languages</h3>
          <div className="flex flex-col gap-6">
            {languages && languages.length > 0 ? (
              languages.map((lang, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 relative"
                >
                  <div className="flex flex-col gap-4">
                    <Input
                      label="Language"
                      placeholder="e.g. English"
                      type="text"
                      value={lang.name || ""}
                      onChange={({ target }) =>
                        updateArrayItem("languages", index, "name", target.value)
                      }
                      className="w-full"
                    />
                    <div>
                      <label className="">Proficiency</label>
                      <RatingInput
                        value={lang.progress || 0}
                        onChange={(value) =>
                          updateArrayItem("languages", index, "progress", value)
                        }
                        total={5}
                        activeColor="#0ea5e9"
                        inactiveColor="#e0f2fe"
                      />
                    </div>
                    {languages.length > 1 && (
                      <button
                        type="button"
                        className="absolute top-4 right-4 text-lg text-red-600 bg-red-50 hover:bg-red-100 rounded-full p-2 shadow-sm transition-all duration-150"
                        onClick={() => removeArrayItem("languages", index)}
                        title="Remove Language"
                      >
                        <LuTrash2 />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center">No languages added yet.</div>
            )}
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-semibold shadow-md hover:bg-blue-700 transition-all duration-150 self-start mt-2"
              onClick={() => addArrayItem("languages", { name: "", proficiency: "" })}
            >
              <LuPlus className="text-xl" />
              Add Language
            </button>
          </div>
        </div>
        {/* Interests Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Interests</h3>
          <div className="flex flex-col gap-6">
            {interests && interests.length > 0 ? (
              interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 relative"
                >
                  <Input
                    label="Interest"
                    placeholder="e.g. Photography"
                    type="text"
                    value={interest || ""}
                    onChange={({ target }) =>
                      updateArrayItem("interests", index, null, target.value)
                    }
                    className="w-full"
                  />
                  {interests.length > 1 && (
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-lg text-red-600 bg-red-50 hover:bg-red-100 rounded-full p-2 shadow-sm transition-all duration-150"
                      onClick={() => removeArrayItem("interests", index)}
                      title="Remove Interest"
                    >
                      <LuTrash2 />
                    </button>
                  )}
                </div>
              ))
            ) : null}
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-semibold shadow-md hover:bg-blue-700 transition-all duration-150 self-start mt-2"
              onClick={() => addArrayItem("interests", "")}
            >
              <LuPlus className="text-xl" />
              Add Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;

import React from "react";
import Input from "../../../components/inputs/input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const CertificationInfoForm = ({ certifications, updateArrayItem, addArrayItem, removeArrayItem }) => {
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
    <div className="px-5 pt-5 flex flex-col items-center min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Certifications
      </h2>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {certifications.length > 0 ? certifications.map((cert, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 relative"
          >
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Certification Name
                </label>
                <Input
                  placeholder="e.g. AWS Certified Solutions Architect"
                  type="text"
                  value={cert.title || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "title", target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issuing Organization
                </label>
                <Input
                  placeholder="e.g. Amazon Web Services"
                  type="text"
                  value={cert.issuer || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "issuer", target.value)
                  }
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Issue Year
                  </label>
                  <Input
                    type="month"
                    value={formatMonthValue(cert.year)}
                    onChange={({ target }) =>
                      updateArrayItem(index, "year", target.value)
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            {certifications.length > 1 && (
              <button
                type="button"
                className="absolute top-4 right-4 text-lg text-red-600 bg-red-50 hover:bg-red-100 rounded-full p-2 shadow-sm transition-all duration-150"
                onClick={() => removeArrayItem(index)}
                title="Remove Certification"
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        )) : (
          <div className="text-gray-500 text-center">No certifications added yet.</div>
        )}
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-semibold shadow-md hover:bg-blue-700 transition-all duration-150 self-start mt-2"
          onClick={() => addArrayItem({ title: "", issuer: "", year: "" })}
        >
          <LuPlus className="text-xl" />
          Add Certification
        </button>
      </div>
    </div>
  );
};

export default CertificationInfoForm;

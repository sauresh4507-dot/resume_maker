import React from "react";
import Input from "../../../components/inputs/input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const ProjectsDetailForm = ({
  projectInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5 flex flex-col items-center min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Projects
      </h2>
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
            <Input
              placeholder="Portfolio Website"
              type="text"
              value={projectInfo[0]?.title || ""}
              onChange={({ target }) => updateArrayItem(0, "title", target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Short description about the project"
              className="form-input w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition duration-150 p-3 min-h-[100px] resize-none"
              rows={3}
              value={projectInfo[0]?.description || ""}
              onChange={({ target }) => updateArrayItem(0, "description", target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub Link</label>
              <Input
                placeholder="https://github.com/username/project"
                type="url"
                value={projectInfo[0]?.github || ""}
                onChange={({ target }) => updateArrayItem(0, "github", target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Live Demo URL</label>
              <Input
                placeholder="https://yourproject.live"
                type="url"
                value={projectInfo[0]?.liveDemo || ""}
                onChange={({ target }) => updateArrayItem(0, "liveDemo", target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetailForm;

import React, { useState } from 'react';
import { LuCircleCheckBig } from "react-icons/lu";
import RenderResume from '../../components/ResumeTemplates/RenderResume';

const TEMPLATES = [
  { id: "01", name: "Classic Sidebar", description: "Professional sidebar layout with blue accents", preview: "Modern and clean design" },
  { id: "02", name: "Minimalist Header", description: "Clean top header with two-column layout", preview: "Elegant and simple" },
  { id: "03", name: "Bold Banner", description: "Eye-catching header banner with single column", preview: "Stand out with bold colors" },
  { id: "04", name: "Elegant Split", description: "Sophisticated sidebar with vertical accents", preview: "Professional and refined" },
  { id: "05", name: "Centered Classic", description: "Centered header with decorative line separators", preview: "Traditional and balanced" },
  { id: "06", name: "Light Sidebar", description: "Clean 1/3-2/3 split with light colored sidebar", preview: "Fresh and modern" },
  { id: "07", name: "Top Banner Pro", description: "Bold top banner with boxed section headers", preview: "Dynamic and striking" },
  { id: "08", name: "Vertical Accent", description: "Compact design with vertical accent bar", preview: "Sleek and minimal" },
  { id: "09", name: "Dark Sidebar", description: "Professional dark sidebar design", preview: "Bold and confident" },
  { id: "10", name: "Icon Badges", description: "Circular icon badges for sections", preview: "Creative and unique" },
  { id: "11", name: "Square Profile", description: "2/5-3/5 split with square profile image", preview: "Contemporary style" },
  { id: "12", name: "Full Header", description: "Full-width colored header banner", preview: "Impactful design" },
  { id: "13", name: "Pill Headers", description: "Pill-shaped section headers", preview: "Modern and playful" },
  { id: "14", name: "Card Style", description: "Rounded card header with bar accents", preview: "Clean and organized" }
];

const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) => {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const handleSelectTemplate = (templateId) => {
    setSelectedTheme(templateId);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a template that best represents your professional style • <span className="font-semibold text-blue-600">14 templates available</span></p>
      </div>

      {/* Template Grid - Scrollable */}
      <div className="flex-1 overflow-y-auto px-8 py-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${selectedTheme === template.id
                  ? 'ring-4 ring-blue-500 shadow-2xl scale-105'
                  : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-300 hover:shadow-xl'
                }`}
              onClick={() => handleSelectTemplate(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Selection Indicator */}
              {selectedTheme === template.id && (
                <div className="absolute top-3 right-3 z-20 bg-blue-600 rounded-full p-1 shadow-lg">
                  <LuCircleCheckBig size={20} className="text-white" />
                </div>
              )}

              {/* Template Preview */}
              <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="transform scale-[0.18] origin-center w-[800px] h-[1066px]">
                    <RenderResume
                      templateId={template.id}
                      resumeData={resumeData}
                      colorPalette={[]}
                      containerWidth={0}
                    />
                  </div>
                </div>

                {/* Hover Overlay */}
                {hoveredTemplate === template.id && selectedTheme !== template.id && (
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-10 backdrop-blur-[1px]"></div>
                )}
              </div>

              {/* Template Info */}
              <div className={`p-4 transition-colors duration-300 ${selectedTheme === template.id ? 'bg-blue-50' : 'bg-white'
                }`}>
                <h3 className="text-base font-bold text-gray-900 mb-1 truncate">{template.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-8 py-5 border-t bg-gray-50 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Selected: <span className="font-semibold text-gray-900">
            {TEMPLATES.find(t => t.id === selectedTheme)?.name || 'None'}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            className="px-6 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => onClose && onClose()}
          >
            Apply Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;

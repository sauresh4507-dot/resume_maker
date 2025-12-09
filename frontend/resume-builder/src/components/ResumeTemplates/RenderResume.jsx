import React from 'react'
import TemplateOne from './TemplateOne.jsx';
import TemplateTwo from './TemplateTwo.jsx';
import TemplateThree from './TemplateThree.jsx';
import TemplateFour from './TemplateFour.jsx';
import TemplateFive from './TemplateFive.jsx';
import TemplateSix from './TemplateSix.jsx';
import TemplateSeven from './TemplateSeven.jsx';
import TemplateEight from './TemplateEight.jsx';
import TemplateNine from './TemplateNine.jsx';
import TemplateTen from './TemplateTen.jsx';
import TemplateEleven from './TemplateEleven.jsx';
import TemplateTwelve from './TemplateTwelve.jsx';
import TemplateThirteen from './TemplateThirteen.jsx';
import TemplateFourteen from './TemplateFourteen.jsx';
import TemplateFifteen from './TemplateFifteen.jsx';
import TemplateSixteen from './TemplateSixteen.jsx';
import TemplateSeventeen from './TemplateSeventeen.jsx';
import TemplateEighteen from './TemplateEighteen.jsx';

const RenderResume = ({
  templateId,
  resumeData,
  colorPalette,
  containerWidth,
}) => {
  const templates = {
    "01": TemplateOne,
    "02": TemplateTwo,
    "03": TemplateThree,
    "04": TemplateFour,
    "05": TemplateFive,
    "06": TemplateSix,
    "07": TemplateSeven,
    "08": TemplateEight,
    "09": TemplateNine,
    "10": TemplateTen,
    "11": TemplateEleven,
    "12": TemplateTwelve,
    "13": TemplateThirteen,
    "14": TemplateFourteen,
    "15": TemplateFifteen,
    "16": TemplateSixteen,
    "17": TemplateSeventeen,
    "18": TemplateEighteen,
  };

  const TemplateComponent = templates[templateId] || TemplateOne;

  return (
    <TemplateComponent
      resumeData={resumeData}
      colorPalette={colorPalette}
      containerWidth={containerWidth}
    />
  );
};

export default RenderResume;
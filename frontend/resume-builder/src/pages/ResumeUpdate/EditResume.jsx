import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import TitleInput from '../../components/inputs/TitleInput.jsx';
import { useReactToPrint } from "react-to-print";
import axiosInstance from '../../utils/axioinstance';
import { API_PATHS } from '../../utils/apiPaths.js';
import ProfileInfoCard from '../../components/cards/ProfileInfoCard.jsx';
import ProfileInfoForm from './Forms/ProfileInfoForm.jsx';
import ContactInfoForm from './Forms/ContactInfoForm.jsx';
import WorkExperienceForm from './Forms/WorkExperienceForm.jsx';
import EducationDetailsForm from './Forms/EducationDetailForm.jsx';
import SkillsInfoForm from './Forms/SkillsInfoForm.jsx';
import ProjectsDetailForm from './Forms/ProjectsDetailForm.jsx';
import CertificationInfoForm from './Forms/CertificationInfoForm.jsx';
import AdditionalInfoForm from './Forms/AdditionalInfoForm.jsx';
import RenderResume from '../../components/ResumeTemplates/RenderResume.jsx';
import { fixTailwindColors, captureElementAsImage, dataURLtoFile } from '../../utils/helper';
import Modal from '../../components/Modal.jsx';
import ThemeSelector from './ThemeSelector.jsx';


const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  // Set the initial page to the first step
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: [],
    },
    contactInfo: {
      location: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progess: 0,
      },

    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    interests: [""],
    languages: [{ name: "" }],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openTemplateSelector, setOpenTemplateSelector] = useState(false);


  const validateAndNext = (e) => {
    const errors = [];

    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim()) errors.push("Full Name is required");
        if (!designation.trim()) errors.push("Designation is required");
        if (!summary.trim()) errors.push("Summary is required");
        break;
      }
      case "contact-info": {
        const { location, email, phone, linkedin, github, website } = resumeData.contactInfo;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
          errors.push("Valid email is required.");
        if (!phone.trim())
          errors.push("Valid 10-digit phone number is required");
        // Optionally add validation for location, linkedin, github, website if needed
        break;
      }
      case "work-experience": {
        resumeData.workExperience.forEach(
          ({ company, role, startDate, endDate }, index) => {
            if (!company.trim())
              errors.push(`Company is required in experience ${index + 1}`);
            if (!role.trim())
              errors.push(`Role is required in experience ${index + 1}`);
            if (!startDate || !endDate)
              errors.push(
                `Start and End dates are required in experience ${index + 1}`
              );
          }
        );
        break;
      }
      case "education-info": {
        resumeData.education.forEach(
          ({ degree, institution, startDate, endDate }, index) => {
            if (!degree.trim())
              errors.push(`Degree is required in education ${index + 1}`);
            if (!institution.trim())
              errors.push(`Institution is required in education ${index + 1}`);
            if (!startDate || !endDate)
              errors.push(
                `Start and End dates are required in education ${index + 1}`
              );
          }
        );
        break;
      }
      case "skills": {
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim())
            errors.push(`Skill name is required in skills ${index + 1}`);
          if (progress < 1 || progress > 100)
            errors.push(
              `Skill progress must be between 1 and 100 in skill ${index + 1}`
            );
        });
        break;
      }
      case "projects": {
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`Project title is required in project ${index + 1}`);
          if (!description.trim())
            errors.push(
              `Project description is required in projects ${index + 1}`
            );
        });
        break;
      }
      case "certifications": {
        resumeData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim())
            errors.push(`Certificate title is required in certification ${index + 1}`);
          if (!issuer.trim())
            errors.push(`Issuer is required in certification ${index + 1}`);
        });
        break;
      }
      case "additionalInfo": {
        if (
          !resumeData.languages ||
          resumeData.languages.length === 0 ||
          !resumeData.languages[0].name?.trim()
        ) {
          errors.push("At least one language is required");
        }
        if (
          !resumeData.interests ||
          resumeData.interests.length === 0 ||
          !resumeData.interests[0]?.trim()
        ) {
          errors.push("At least one interest is required");
        }
        break;
      }
      default:
        break;
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }

    setErrorMsg("");
    goToNextStep();
  };






  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);
      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentPage === "additionalInfo") {
      setOpenPreviewModal(true);
    }
  };

  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    const currentIndex = pages.indexOf(currentPage);
    if (currentPage === "profile-info") {
      navigate("/dashboard");
      return;
    }
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);
      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={goToContactInfo}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo || {}}
            updateSection={(key, value) => updateSection("contactInfo", key, value)}
            onBack={goToProfileInfo}
            onNext={goToNextStep}
          />
        );

      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("workExperience", index)
            }
          />

        );

      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
          />
        );

      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        );

      case "projects":
        return (
          <ProjectsDetailForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />


        );

      case "certifications":
        return (
          <CertificationInfoForm
            certifications={resumeData?.certifications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("certifications", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) => removeArrayItem("certifications", index)}
          />
        );

      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayItem={(section, index, key, value) =>
              updateArrayItem(section, index, key, value)
            }
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) =>
              removeArrayItem(section, index)
            }
          />
        );


      default:
        return null
    }
  };

  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];

      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        };
      }

      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };


  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications:
            resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,

        }));
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);

      fixTailwindColors(resumeRef.current);
      const imageDataUrl = await captureElementAsImage(resumeRef.current);

      const thumbanailFile = dataURLtoFile(
        imageDataUrl,
        `resume-${resumeId}.png`

      );

      const profileImageFile = resumeData?.profileInfo?.profileImg || null;

      const formData = new FormData();

      if (profileImageFile) formData.append("profileImage", profileImageFile);

      if (thumbanailFile) formData.append("thumbnail", thumbanailFile);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;

      console.log("RESUME_DATA__", resumeData);

      await updateResumeDetails(thumbnailLink, profilePreviewUrl);

      toast.success("Resume Updated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading images:", error, error?.response);
      toast.error("Failed to upload images: " + (error?.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        {
          ...resumeData,
          thumbnailLink: thumbnailLink || "",
          profileInfo: {
            ...resumeData.profileInfo,
            profilePreviewUrl: profilePreviewUrl || "",
          },
        }
      );
    } catch (err) {
      console.error("Error capturing image:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    toast.error("Delete resume not implemented yet.");
  };

  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  const goToContactInfo = () => setCurrentPage("contact-info");
  const goToProfileInfo = () => setCurrentPage("profile-info");

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4'>
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />

          <div className='flex items-center gap-4'>
            <button
              className='flex items-center gap-2 px-3 py-1.5 rounded-md border border-purple-200 bg-purple-50 text-purple-700 font-medium shadow-sm hover:bg-purple-100 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 active:bg-purple-200 transition duration-150'
              onClick={() => setOpenTemplateSelector(true)}
            >
              <LuPalette className='text-[16px]' />
              <span className='hidden md:block'>Change Template</span>
            </button>

            <button
              className='flex items-center gap-2 px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-red-700 font-medium shadow-sm hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-300 active:bg-red-200 transition duration-150'
              onClick={handleDeleteResume}
            >
              <LuTrash2 className='text-[16px]' />
              <span className='hidden md:block'>Delete</span>
            </button>

            <button
              className='flex items-center gap-2 px-3 py-1.5 rounded-md border border-green-200 bg-green-50 text-green-700 font-medium shadow-sm hover:bg-green-100 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 active:bg-green-200 transition duration-150'
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className='text-[16px]' />
              <span className='hidden md:block'>Preview & Download</span>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='bg-slate-50 rounded-xl border border-purple-100 overflow-hidden p-8 shadow-lg'>
            {/* Enhanced Progress Bar at the Top */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-8 border border-blue-100">
              <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            {/* Button Row Below Progress Bar */}
            <div className='flex flex-row justify-end gap-3 mb-6'>
              <button
                className='flex items-center gap-2 px-4 py-2 rounded-md bg-blue-100 text-blue-700 font-semibold shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 active:bg-blue-200 transition duration-150'
                onClick={goBack}
                disabled={isLoading}
              >
                <LuArrowLeft className='text-[16px]' />
                Back
              </button>
              <button
                className='flex items-center gap-2 px-4 py-2 rounded-md bg-green-100 text-green-700 font-semibold shadow-sm hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 active:bg-green-200 transition duration-150'
                onClick={uploadResumeImages}
                disabled={isLoading}
              >
                <LuSave className='text-[16px]' />
                {isLoading ? "Updating..." : "Save & Exit"}
              </button>
              <button
                className='flex items-center gap-2 px-4 py-2 rounded-md bg-purple-100 text-purple-700 font-semibold shadow-sm hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-200 active:bg-purple-200 transition duration-150'
                onClick={validateAndNext}
                disabled={isLoading}
              >
                {currentPage === "additionalInfo" ? (
                  <LuDownload className='text-[16px]' />
                ) : (
                  <LuArrowLeft className='text-[16px] rotate-180' />
                )}
                Next
              </button>
            </div>
            <div className="py-4">
              {renderForm()}
            </div>

            <div className='mx-5'>
              {errorMsg && (
                <div className='flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded'>
                  <LuCircleAlert className="text-md" /> {errorMsg}
                </div>
              )}

              {/* The button row was moved here */}
            </div>
          </div>
          <div ref={resumeRef} className='h-[100vh]'>
            <RenderResume
              templateId={resumeData?.template?.theme || ""}
              resumeData={resumeData}
              colorPalette={resumeData?.template?.colorPalette || []}
              containerWidth={baseWidth}
            />

          </div>
        </div>
      </div>

      {/* Preview & Download Modal */}
      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title="Preview & Download"
      >
        <div className="flex flex-col items-center gap-6 p-4">
          <div
            style={{
              width: '900px', // modal width
              height: '80vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'auto',
              margin: '0 auto',
              background: 'transparent'
            }}
          >
            <div
              ref={resumeDownloadRef}
              style={{
                width: '600px', // A4 width
                height: '500px', // A4 height
                transform: 'scale(0.645)', // zoom out to 80%
                transformOrigin: 'top center',
                background: 'white',
                boxShadow: '0 0 8px rgba(0,0,0,0.1)'
              }}
            >
              <RenderResume
                templateId={resumeData?.template?.theme || ""}
                resumeData={resumeData}
                colorPalette={resumeData?.template?.colorPalette || []}
                containerWidth={794}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
              onClick={reactToPrintFn}
            >
              <LuDownload className="text-[16px]" />
              Download as PDF
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold shadow hover:bg-gray-300 transition"
              onClick={() => setOpenPreviewModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      {/* End Preview & Download Modal */}

      {/* Template Selector Modal */}
      <Modal
        isOpen={openTemplateSelector}
        onClose={() => setOpenTemplateSelector(false)}
        title="Select Template"
        maxWidth="max-w-[95vw]"
      >
        <ThemeSelector
          selectedTheme={resumeData?.template?.theme || "01"}
          setSelectedTheme={(templateId) => {
            setResumeData((prev) => ({
              ...prev,
              template: {
                ...prev.template,
                theme: templateId,
              },
            }));
          }}
          resumeData={resumeData}
          onClose={() => setOpenTemplateSelector(false)}
        />
      </Modal>
      {/* End Template Selector Modal */}

    </DashboardLayout>
  )

};

export default EditResume;

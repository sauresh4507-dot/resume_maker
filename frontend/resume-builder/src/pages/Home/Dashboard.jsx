import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axioinstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LuCirclePlus } from 'react-icons/lu';
import moment from 'moment';
import ResumeSummaryCard from '../../components/cards/ResumeSummaryCard';
import Modal from '../../components/Modal';
import CreateResumeForm from './CreateResumeForm';

const Dashboard = () => {
    const navigate = useNavigate();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [allResumes, setAllResumes] = useState(null); 

    const fetchAllResumes = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
            setAllResumes(response.data);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        }
    };

    useEffect(() => {
        fetchAllResumes();
    }, []);

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-1 pb-6 px-4 md:px-0">
                <div
                    className="min-h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:bg-purple-50/50 cursor-pointer transition shadow hover:shadow-lg"
                    onClick={() => setOpenCreateModal(true)}
                >
                    <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
                        <LuCirclePlus className="text-2xl text-blue-500" />
                    </div>
                    <h3 className="font-medium text-gray-800">Add New Resume</h3>
                </div>
                {allResumes?.map((resume) => (
                    <ResumeSummaryCard
                        key={resume?._id}
                        imgUrl={resume?.thumbnailLink || null}
                        title={resume.title}
                        lastUpdated={
                            resume?.updatedAt
                                ? moment(resume.updatedAt).format("Do MMM YYYY")
                                : ""
                        }
                        onSelect={() => navigate(`/resume/${resume?._id}`)}
                    />
                ))}
            </div>

            <Modal
                isOpen={openCreateModal}
                onClose={() => {
                    setOpenCreateModal(false);
                }}
                hideHeader
            >
                <div>
                    <CreateResumeForm />
                </div>
            </Modal>
        </DashboardLayout>
    );
};

export default Dashboard;

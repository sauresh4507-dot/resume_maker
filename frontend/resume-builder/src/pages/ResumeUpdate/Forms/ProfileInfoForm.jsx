import React from 'react'
import ProfilePhotoSelector from '../../../components/inputs/ProfilePhotoSelector.jsx'
import Input from '../../../components/inputs/input.jsx'

const ProfileInfoForm = ({profileData, updateSection}) => {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Personal Information
            </h2>

            <div className="flex flex-col items-center mb-8">
                <ProfilePhotoSelector
                    image={profileData?.profileImg || profileData?.profilePreviewUrl}
                    setImage={(value) => updateSection("profileImg", value)}
                    preview={profileData?.profilePreviewUrl}
                    setPreview={(value) => updateSection("profilePreviewUrl", value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <Input
                    value={profileData.fullName || ""}
                    onChange={ ({ target }) => updateSection("fullName", target.value)}
                    label="Full Name"
                    placeholder="John Doe"
                    type="text"
                    className="w-full"
                />
                <Input
                    value={profileData.designation || ""}
                    onChange={({ target }) => 
                        updateSection("designation", target.value)
                    }
                    label="Designation"
                    placeholder="UI Designer"
                    type="text"
                    className="w-full"
                />
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Summary
                    </label>
                    <textarea
                        placeholder="Short Introduction"
                        className="form-input w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition duration-150 p-3 min-h-[100px] resize-none"
                        rows={4}
                        value={profileData.summary || ""}
                        onChange={({ target }) => updateSection("summary", target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileInfoForm
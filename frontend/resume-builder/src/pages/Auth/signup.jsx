import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axioinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/usercontext';

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
        setError("Please enter full name.");
        return;
    }
    if (!email) {
        setError("Please enter email address.");
        return;
    }
    if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
    }
    if (!password) {
        setError("Please enter the password.");
        return;  
    }
    if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
    }
    setError("");

    try {
        if (profilePic) {
            const imgUploadRes = await uploadImage(profilePic);
            profileImageUrl = imgUploadRes.imageUrl || "";
        }
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            name: fullName,
            email,
            password,
            profileImageUrl
        });
        const { token } = response.data;
        
        if(token){
            localStorage.setItem("token", token);
            updateUser(response.data);
            navigate("/dashboard");
        }
    } catch (error) {
        setError("An error occurred during signup. Please try again.");
    }
 }; 
 return(
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-12 flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold text-black mb-2">Create an Account</h3>
        <p className="text-sm text-slate-700 mb-6 text-center">
            Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
            <div className="flex justify-center mb-2">
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            </div>
            <Input
                value={fullName}
                onChange={({target}) => setFullName(target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
                className="shadow-md"
            />
            <Input
                value={email}
                onChange={({target}) => setEmail(target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                className="shadow-md"
            />
            <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
                className="shadow-md"
            />
            {error && <p className="text-red-500 text-xs pb-2.5 text-center">{error}</p>}
            <button type="submit" className="btn-primary w-full mt-2 mb-2 py-2 rounded-lg font-semibold text-white bg-primary hover:bg-blue-700 transition-all">
                SIGN UP 
            </button>
            <p className='text-[13px] text-slate-800 mt-2 text-center'>
                Already have an account?{' '}
                <button
                type="button"
                className='font-medium text-primary underline cursor-pointer'
                onClick={() => {
                    setCurrentPage("login");
                }}
            >
                Login
            </button>
            </p>
        </form>
    </div>
 )
}

export default SignUp;

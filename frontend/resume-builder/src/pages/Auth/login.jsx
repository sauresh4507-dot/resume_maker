import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/usercontext';
import axiosInstance from '../../utils/axioinstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({ setCurrentPage }) => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-12 flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold text-black mb-2">Welcome Back</h3>
      <p className="text-sm text-slate-700 mb-6 text-center">
        Please enter your details to log in
      </p>
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <Input
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
          className="shadow-md"
        />
        <Input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          className="shadow-md"
        />
        {error && <p className="text-red-500 text-xs pb-2.5 text-center">{error}</p>}
        <button type="submit" className="btn-primary w-full mt-2 mb-2 py-2 rounded-lg font-semibold text-white bg-primary hover:bg-blue-700 transition-all">
          LOGIN
        </button>
        <p className='text-[13px] text-slate-800 mt-2 text-center'>
          Don't have an account?{' '}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login;
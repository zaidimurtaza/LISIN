import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authAPI } from '../../services/api';
import { Eye, EyeOff } from 'lucide-react'; // Import icons from lucide-react

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await authAPI.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to create account');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 pl-3"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 pl-3"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 pl-3"
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 size-min "
          >
            {passwordVisible ? <Eye className="h-5 w-5 pt-1"/> : <EyeOff className="h-5 w-5 pt-1"/>} {/* Show EyeOff when visible, Eye when hidden */}
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'} // Toggle confirm password visibility
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 pl-3"
            required
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            {confirmPasswordVisible ? <Eye className="h-5 w-5 pt-1"/> : <EyeOff className="h-5 w-5 pt-1"/>} {/* Show EyeOff when visible, Eye when hidden */}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;

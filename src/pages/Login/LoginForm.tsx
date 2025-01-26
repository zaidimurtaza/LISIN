import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import { Eye, EyeOff } from 'lucide-react'; // Assuming you're using Lucide icons

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authAPI.login(formData);
      login(response.data.access, response.data.refresh);
      navigate('/');
      toast.success('🎉 Login successful!');
    } catch (error) {
      toast.error('❌ Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-800"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="mt-2 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-800"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mt-2 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            {passwordVisible ? <Eye className="h-5 w-5" /> : < EyeOff className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-sm font-medium text-white ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        } transition-all duration-300`}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;

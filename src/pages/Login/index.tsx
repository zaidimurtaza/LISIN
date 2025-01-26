import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg transform transition-all hover:scale-105">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back!
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Create one now
            </Link>
          </p>
        </div>
        <LoginForm />
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MURTAZA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg transform transition-all hover:scale-105">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
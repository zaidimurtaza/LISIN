import React, { useState, useRef } from 'react';
import { X, Camera, User, Save } from 'lucide-react';
import { Profile } from '../../types';

interface EditProfileModalProps {
  profile: Profile;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, onClose, onSubmit }) => {
  const [name, setName] = useState(profile.name || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(profile.profile_picture || null);
  const [nameError, setNameError] = useState<string | null>(null);  // Error for name
  const [bioError, setBioError] = useState<string | null>(null);    // Error for bio
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate name and bio
    if (name.length > 9) {
      setNameError('Name cannot exceed 9 characters');
      return;
    } else {
      setNameError(null);
    }

    if (bio.length > 20) {
      setBioError('Bio cannot exceed 20 characters');
      return;
    } else {
      setBioError(null);
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    if (image) {
      formData.append('profile_picture', image);
    }
    await onSubmit(formData);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex justify-center relative">
            <input 
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div 
              onClick={triggerFileInput} 
              className="relative cursor-pointer group"
            >
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-700 group-hover:opacity-70 transition-opacity"
                />
              ) : (
                <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-slate-500 dark:text-slate-400" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-10 h-10 text-white bg-black/50 rounded-full p-2" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {bioError && <p className="text-red-500 text-sm mt-1">{bioError}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

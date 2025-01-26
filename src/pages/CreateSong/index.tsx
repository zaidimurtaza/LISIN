import React, { useState } from 'react';
import { songAPI } from '../../services/api';
import SongForm from '../../components/SongForm';
import { toast } from 'react-hot-toast';

const CreateSong = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await songAPI.createSong(formData);
      toast.success('Song uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload song');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-400 mb-8 text-center">Upload New Song</h1>
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <SongForm onSubmit={handleSubmit} submitLabel={loading ? 'Uploading...' : 'Upload Song'} />
        {loading && (
          <div className="absolute inset-0 bg-gray-900 opacity-50 flex justify-center items-center rounded-lg">
            <div className="text-white font-semibold">Uploading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSong;

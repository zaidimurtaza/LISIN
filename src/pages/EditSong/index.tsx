import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { songAPI } from '../../services/api';
import SongForm from '../../components/SongForm';
import { Song } from '../../types';

const EditSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSong();
  }, [id]);

  const fetchSong = async () => {
    try {
      const response = await songAPI.getSong(Number(id));
      setSong(response.data);
    } catch (error) {
      toast.error('Failed to load song');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center h-64 text-center"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
        <p className="text-sm text-gray-500 mt-4">Loading song details...</p>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="flex justify-center items-center h-64 text-center">
        <p className="text-lg text-red-600">Song not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-200 dark:text-gray-100 mb-8">Edit Song</h1>
      <div className="bg--gray-800 dark:bg-gray-800 rounded-lg shadow-md p-6">
        <SongForm
          onSubmit={(formData) => songAPI.updateSong(song.id, formData)}
          initialValues={{
            title: song.title,
            content: song.content,
            category: song.category,
          }}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
};

export default EditSong;

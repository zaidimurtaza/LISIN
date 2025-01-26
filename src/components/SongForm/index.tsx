import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AudioUpload from './AudioUpload';
import ImageUpload from './ImageUpload';

interface SongFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  initialValues?: {
    title?: string;
    content?: string;
    category?: string;
  };
  submitLabel?: string;
}

const SongForm: React.FC<SongFormProps> = ({ 
  onSubmit, 
  initialValues = {}, 
  submitLabel = 'Upload Song'
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    content: initialValues.content || '',
    category: initialValues.category || 'Thrill',
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate title length
    if (formData.title.length === 0) {
      setErrors((prev) => ({ ...prev, title: 'Title is required.' }));
      return;
    } else if (formData.title.length > 50) {
      setErrors((prev) => ({ ...prev, title: 'Title must be 50 characters or fewer.' }));
      return;
    }

    // Validate description length
    if (formData.content.length === 0) {
      setErrors((prev) => ({ ...prev, content: 'Description is required.' }));
      return;
    } else if (formData.content.length > 500) {
      setErrors((prev) => ({ ...prev, content: 'Description must be 500 characters or fewer.' }));
      return;
    }

    // Ensure audio and image are provided
    if (!audioFile) {
      setErrors((prev) => ({ ...prev, audio: 'Audio file is required.' }));
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);

    if (audioFile) {
      data.append('audio', audioFile);
    }
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      await onSubmit(data);
      navigate('/');
      toast.success('Song uploaded successfully!');
    } catch (error: any) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        toast.error('Failed to upload song');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          maxLength={50} // Restrict input length
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
        <p className="mt-1 text-sm text-gray-500">{formData.title.length} / 50</p> {/* Character count for title */}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
        <p className="mt-1 text-sm text-gray-500">{formData.content.length} / 500</p> {/* Character count for description */}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Thrill">Thrill</option>
          <option value="Chill">Chill</option>
          <option value="Ambient">Ambient</option>
          <option value="Poetry">Poetry</option>
          <option value="Noha">Noha</option>
          <option value="Sad">Sad</option>
          <option value="Rock">Rock</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
          <option value="Folk">Folk</option>
        </select>
      </div>

      <AudioUpload 
        onChange={setAudioFile} 
        error={errors.audio}
      />

      <ImageUpload 
        onChange={setImageFile}
        error={errors.image}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default SongForm;

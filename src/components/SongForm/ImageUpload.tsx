import React, { useState } from 'react';
import { Image } from 'lucide-react';

interface ImageUploadProps {
  onChange: (file: File) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, error }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
        Cover Image
      </label>
      <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-8 px-4">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-describedby="file-upload-help"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center space-y-2 text-indigo-700 hover:text-indigo-800 transition-colors"
        >
          <Image className="h-12 w-12" />
          <span className="text-sm">Click to upload or drag & drop</span>
        </label>

        {/* Image preview */}
        {selectedImage && (
          <div className="mt-4 w-full max-w-xs">
            <img src={selectedImage} alt="Selected preview" className="rounded-md w-full h-40 object-cover" />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <p id="file-upload-help" className="text-xs text-gray-500 mt-2">
        Supported formats: .jpg, .jpeg, .png. Max size: 5MB.
      </p>
    </div>
  );
};

export default ImageUpload;

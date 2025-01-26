import React, { useState } from 'react';
import { Music } from 'lucide-react';

interface AudioUploadProps {
  onChange: (file: File) => void;
  error?: string;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ onChange, error }) => {
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAudio(file);
      onChange(file);
    }
  };

  return (
    <div className="space-y-4">
      <label htmlFor="audio-upload" className="block text-sm font-medium text-gray-700">
        Audio File
      </label>
      <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-8 px-4">
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          aria-describedby="audio-upload-help"
        />
        <label
          htmlFor="audio-upload"
          className="cursor-pointer flex flex-col items-center space-y-2 text-indigo-700 hover:text-indigo-800 transition-colors"
        >
          <Music className="h-12 w-12" />
          <span className="text-sm">Click to upload or drag & drop</span>
        </label>

        {/* Audio file preview */}
        {selectedAudio && (
          <div className="mt-4 text-sm text-gray-700">
            <p>{selectedAudio.name}</p>
            <audio controls className="w-full mt-2">
              <source src={URL.createObjectURL(selectedAudio)} type={selectedAudio.type} />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <p id="audio-upload-help" className="text-xs text-gray-500 mt-2">
        Supported formats: .mp3, .wav, .ogg. Max size: 10MB.
      </p>
    </div>
  );
};

export default AudioUpload;

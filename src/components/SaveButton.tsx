import React from 'react';
import { Bookmark } from 'lucide-react';

interface SaveButtonProps {
  isSaved: boolean;
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isSaved, onSave }) => {
  return (
    <button
      onClick={onSave}
      className="flex items-center space-x-1 text-gray-500 hover:text-green-500"
    >
      <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-green-500 text-green-500' : ''}`} />
      <span>{isSaved ? 'Saved' : 'Save'}</span>
    </button>
  );
};

export default SaveButton;
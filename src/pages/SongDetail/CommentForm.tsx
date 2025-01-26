import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await onSubmit(comment);
    setComment('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-4xl mx-auto bg-gray-800 rounded-lg p-4 md:p-6"
    >
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          rows={2}
          className="flex-1 w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />

        <button
          type="submit"
          disabled={!comment.trim()}
          className={`
            flex items-center justify-center 
            w-12 h-12 md:w-14 md:h-14 
            rounded-full 
            bg-green-500 
            text-black 
            hover:bg-green-400 
            transition-all 
            ${!comment.trim() ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <Send className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
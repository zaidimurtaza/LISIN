import React, { useState } from 'react';
import { Heart, User, Edit, Save } from 'lucide-react';
import { Comment } from '../../types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface CommentListProps {
  comments: Comment[];
  onLikeComment: (id: number) => void;
  onUnLikeComment: (id: number) => void;
  onUpdateComment: (id: number, newText: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ 
  comments, 
  onLikeComment, 
  onUnLikeComment, 
  onUpdateComment 
}) => {
  const BASE_URL = 'https://adminmurtaza.pythonanywhere.com/';
  const { user } = useAuth();
  const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const toggleCommentExpansion = (id: number) => {
    setExpandedComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.comment_text);
  };

  const saveEdit = () => {
    if (editingCommentId !== null) {
      onUpdateComment(editingCommentId, editText);
      setEditingCommentId(null);
    }
  };

  const getShortTimeAgo = (timestamp) => {
    const now = new Date();
    const difference = formatDistanceToNowStrict(new Date(timestamp), {
      addSuffix: true,
      roundingMethod: "floor",
    });
  
    // Convert the verbose string to a shorter format
    const shortTimeAgo = difference
      .replace(" seconds", "s")
      .replace(" second", "s")
      .replace(" minutes", "m")
      .replace(" minute", "m")
      .replace(" hours", "h")
      .replace(" hour", "h")
      .replace(" days", "d")
      .replace(" day", "d")
      .replace(" months", "mo")
      .replace(" month", "mo")
      .replace(" years", "y")
      .replace(" year", "y")
      .replace(" ago", "");
  
    return shortTimeAgo + " ago";
  };

  const renderCommentContent = (comment: Comment) => {
    const isLongComment = comment.comment_text.split(' ').length > 20;
    const isExpanded = expandedComments[comment.id];
    const displayText = isLongComment && !isExpanded 
      ? `${comment.comment_text.split(' ').slice(0, 20).join(' ')}...` 
      : comment.comment_text;

    return (
      <div>
        <p className="text-sm md:text-base text-gray-300">
          {displayText}
        </p>
        {isLongComment && (
          <button
            onClick={() => toggleCommentExpansion(comment.id)}
            className="text-green-500 text-xs mt-1"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      {comments.map((comment) => {
        const isOwnComment = user.username === comment.commenter.name;
        const isEditing = editingCommentId === comment.id;

        return (
          <div 
            key={comment.id} 
            className="bg-gray-800 rounded-lg p-4 md:p-6 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start space-x-4">
              {/* Profile Picture */}
              <Link to={`/profile/${comment.commenter.name}`} className="flex-shrink-0">
                {comment.commenter.profile_picture ? (
                  <img
                    src={`${BASE_URL}${comment.commenter.profile_picture}`}
                    alt={comment.commenter.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                  </div>
                )}
              </Link>

              {/* Comment Content */}
              <div className="flex-grow">
                <Link to={`/profile/${comment.commenter.name}`}>
                  <h3 className="text-sm md:text-base font-semibold text-white">
                    {comment.commenter.name}                 <span className="text-xs text-gray-400">
                    &#8226; {getShortTimeAgo(comment.created_at)}
                </span>
                  </h3>
                </Link>

                {isEditing ? (
                  <div className="mt-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded-md text-sm"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="text-gray-400 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="text-green-500 text-xs flex items-center"
                      >
                        <Save className="w-4 h-4 mr-1" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {renderCommentContent(comment)}
                    {isOwnComment && (
                      <button
                        onClick={() => startEditing(comment)}
                        className="text-green-500 text-xs mt-2 flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Interaction Section */}
              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => comment.is_comment_like ? onUnLikeComment(comment.id) : onLikeComment(comment.id)}
                  className="flex items-center space-x-1 text-gray-00 hover:text-green-500"
                >
                  <Heart
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      comment.is_comment_like 
                        ? 'fill-green-500 text-green-500' 
                        : ''
                    }`}
                  />
                  <span className="text-xs md:text-sm">{comment.like_count}</span>
                </button>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
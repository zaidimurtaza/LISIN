import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { songAPI, profileAPI } from '../../services/api';
import { Song, Profile } from '../../types';
import SongInfo from './SongInfo';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const SongDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [song, setSong] = useState<Song | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [authorProfile, setAuthorProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSong();;
  
  }, [id]);
 
  useEffect(() => {
    setTimeout(() => {  
      fetchSub()}, 100);
    
  } , [song]);

  useEffect(() => {
    if (song?.author?.name) {
      fetchAuthorProfile();
    }
  }, [song?.author?.name]);

  const fetchSong = async () => {
    try {
      const response = await songAPI.getSong(Number(id));
      setSong(response.data);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };
  const fetchSub = async () => {
    try {
      const response = await songAPI.isSubscribed(song.author.name);
      setIsSubscribed(response.data.is_subscribed);
    } catch (error) {
      // toast.error('Failed to load song');
    } finally {
      setLoading(false);
     
    }
  };
  
  const fetchAuthorProfile = async () => {
    if (!song?.author?.name) return;
    
    try {
      const response = await profileAPI.getProfile(song.author.name);
      setAuthorProfile(response.data);
    } catch (error) {
      // Only show error toast if we're unable to load critical profile data
      // console.warn('Failed to load author profile:', error);
      setAuthorProfile({
        id: song.author.id,
        user: song.author.name,
        name: song.author.name,
        profile_picture: null,
        bio: null,
        audio: [],
        subscriber_count: 0,
        subscribers: [],

      });
    }
  };

  const handleLike = async () => {
    try {
      await songAPI.likeSong(Number(id));
      await fetchSong();
    } catch (error) {
      toast.error('Failed to like song');
    }
  };

    const handleUnLike = async () => {
      try {
        await songAPI.unLikeSong(Number(id));
        await fetchSong(); // Refresh songs to update like status
      } catch (error) {
        toast.error('Failed to unlike song');
      }
    };

    const handleSave = async () => {
      if (!song) return;
      
      try {
        console.log('save click', song.is_saved_song);
        await songAPI.saveSong(song.id);
        toast.success('Song saved successfully');
        await fetchSong();
        console.log('save click', song.is_saved_song);
      } catch (error) {
        toast.error('Failed to save song');
      }
    };
    
    const handleUnsave = async () => {
      if (!song) return;
    
      try {
        await songAPI.unsaveSong(song.id);
        toast.success('Song removed from saved');
        await fetchSong();
      } catch (error) {
        toast.error('Failed to remove song');
      }
    };

  const handleSubscribe = async () => {
    if (!authorProfile || !user) return;
    
    try {

      if (authorProfile && Array.isArray(authorProfile.subscribers)) {
        // console.log("user", user.id);
      } else {
        console.log("Subscribers list is undefined or not an array");
      }
      
      // console.log(authorProfile.subscribers);
    
      fetchSub();
      if (isSubscribed) {
        await profileAPI.unsubscribe(authorProfile.id);
      } else {
        await profileAPI.subscribe(authorProfile.id);
      }
      await fetchSub();
      await fetchSong();
      // await fetchAuthorProfile(); // Refresh the profile after subscription action
      toast.success(isSubscribed ? 'Unsubscribed successfully' : 'Subscribed successfully');
    } catch (error) {
      toast.error('Failed to update subscription');
      console.error(error);
    }
  };
  

  const handleComment = async (text: string) => {
    try {
      await songAPI.addComment(Number(id), { comment_text: text });
      await fetchSong();
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      await songAPI.likeComment(commentId);
      await fetchSong();
    } catch (error) {
      toast.error('Failed to like comment');
    }
  };
  const handleUnLikeComment = async (commentId: number) => {
    try {
      await songAPI.unLikeComment(commentId);
      await fetchSong();
    } catch (error) {
      toast.error('Failed to un-like comment');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!song) return null;

  // const isSubscribed = authorProfile?.subscribers.some(sub => sub.id === user?.id) ?? false;
  const isSaved = authorProfile?.saved_songs?.some(
    saved => saved.song.id === song.id
  ) ?? false;
  
  const handleEditComment = async (editingCommentId: number, newCommentText: string) => {
    try {
      await songAPI.editComment(editingCommentId, { comment_text: newCommentText });
      await fetchSong(); // Refresh the song data to reflect the updated comment
      toast.success('Comment edited successfully');
    } catch (error) {
      toast.error('Failed to edit comment');
    }
  };
  


  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-3 py-8 space-y-8">
        <SongInfo 
          song={song} 
          onLike={handleLike}
          onUnLike={handleUnLike}
          onSave={handleSave}
          onUnsave={handleUnsave}
          onSubscribe={handleSubscribe}
          isSubscribed={isSubscribed}
          isSaved={isSaved}
        />
        <div className="bg-gray-900 max-w-4xl mx-auto rounded-lg  p-1">
          <h2 className="text-xl font-semibold mb-4">{`Comments ${song.comments?.length || 0}`}</h2>
          <CommentForm onSubmit={handleComment} />
          <div className="mt-6">
            <CommentList 
              comments={song.comments || []} 
              onLikeComment={handleLikeComment} 
              onUnLikeComment={handleUnLikeComment}
              onUpdateComment={handleEditComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
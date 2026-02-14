import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { songAPI, profileAPI } from '../../services/api';
import { Song, Profile } from '../../types';
import SongInfo from './SongInfo';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import SEO from '../../components/SEO';
interface SongDetailProps {
  id: number
  onSongEnd: () => void
  playlist?: Song[]
}

const SongDetail = ({ id, onSongEnd, playlist = [] }: SongDetailProps) => {
  // const { id } = useParams();
  const { user } = useAuth();
  const [song, setSong] = useState<Song | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
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
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };
  const fetchSub = async () => {
    if (!song?.author?.name) return;
    try {
      const response = await songAPI.isSubscribed(song.author.name);
      setIsSubscribed(response.data.is_subscribed);
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };
  
  const fetchAuthorProfile = async () => {
    if (!song?.author?.name) return;
    
    try {
      const response = await profileAPI.getProfile(song.author.name);
      setAuthorProfile(response.data);
    } catch {
      // Only show error toast if we're unable to load critical profile data
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
    } catch {
      toast.error('Failed to like song');
    }
  };

  const handleViewIncrement = async () => {
    try {
      await songAPI.increaseViewCount(Number(id));
      await fetchSong();
    } catch {
      toast.error('Failed to increment view count');
    }
  };


  const handleUnLike = async () => {
    try {
      await songAPI.unLikeSong(Number(id));
      await fetchSong();
    } catch {
      toast.error('Failed to unlike song');
    }
  };

  const handleSave = async () => {
    if (!song) return;
    
    try {
      await songAPI.saveSong(song.id);
      toast.success('Song saved successfully');
      await fetchSong();
    } catch {
      toast.error('Failed to save song');
    }
  };
    
  const handleUnsave = async () => {
    if (!song) return;
  
    try {
      await songAPI.unsaveSong(song.id);
      toast.success('Song removed from saved');
      await fetchSong();
    } catch {
      toast.error('Failed to remove song');
    }
  };

  const handleSubscribe = async () => {
    if (!authorProfile || !user) return;
    
    try {
      if (isSubscribed) {
        await profileAPI.unsubscribe(authorProfile.id);
      } else {
        await profileAPI.subscribe(authorProfile.id);
      }
      await fetchSub();
      await fetchSong();
      toast.success(isSubscribed ? 'Unsubscribed successfully' : 'Subscribed successfully');
    } catch {
      toast.error('Failed to update subscription');
    }
  };
  

  const handleComment = async (text: string) => {
    try {
      await songAPI.addComment(Number(id), { comment_text: text });
      await fetchSong();
      toast.success('Comment added successfully');
    } catch {
      toast.error('Failed to add comment');
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      await songAPI.likeComment(commentId);
      await fetchSong();
    } catch {
      toast.error('Failed to like comment');
    }
  };

  const handleUnLikeComment = async (commentId: number) => {
    try {
      await songAPI.unLikeComment(commentId);
      await fetchSong();
    } catch {
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
  
  const handleEditComment = async (editingCommentId: number, newCommentText: string) => {
    try {
      await songAPI.editComment(editingCommentId, { comment_text: newCommentText });
      await fetchSong();
      toast.success('Comment edited successfully');
    } catch {
      toast.error('Failed to edit comment');
    }
  };
  


  return (
    <>
      <SEO
        title={`${song.title} by ${song.author.name}`}
        description={`Listen to ${song.title} by ${song.author.name} on LISIN. ${song.description || 'Enjoy this amazing song and discover more music.'}`}
        keywords={`${song.title}, ${song.author.name}, music, song, listen online, stream music, LISIN`}
        url={`https://lisin.vercel.app/song/${song.id}`}
        image={song.cover_image || undefined}
        type="music.song"
        author={song.author.name}
        schema={{
          "@context": "https://schema.org",
          "@type": "MusicRecording",
          "name": song.title,
          "description": song.description,
          "url": `https://lisin.vercel.app/song/${song.id}`,
          "image": song.cover_image,
          "duration": song.duration,
          "byArtist": {
            "@type": "MusicGroup",
            "name": song.author.name,
            "url": `https://lisin.vercel.app/profile/${song.author.name}`
          },
          "interactionStatistic": [
            {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/LikeAction",
              "userInteractionCount": song.likes_count
            },
            {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/CommentAction",
              "userInteractionCount": song.comments?.length || 0
            },
            {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/ListenAction",
              "userInteractionCount": song.views_count
            }
          ],
          "datePublished": song.created_at,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": (song.likes_count || 0) > 0 ? "5" : "0",
            "reviewCount": song.comments?.length || 0
          }
        }}
      />
      <div className="bg-black min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-3 py-8 space-y-8">
        <SongInfo 
          song={song} 
          playlist={playlist}
          onLike={handleLike}
          onViewIncrement={handleViewIncrement}                       
          onUnLike={handleUnLike}
          onSave={handleSave}
          onUnsave={handleUnsave}
          onSubscribe={handleSubscribe}
          isSubscribed={isSubscribed}
          onSongEnd={onSongEnd}
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
    </>
  );
};

export default SongDetail;
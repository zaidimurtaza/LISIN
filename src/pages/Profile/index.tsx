import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { profileAPI, songAPI } from '../../services/api';
import { Profile as ProfileType } from '../../types';
import ProfileHeader from './ProfileHeader';
import ProfileSongs from './ProfileSongs';
import SavedSongs from './SavedSongs';
import EditProfileModal from './EditProfileModal';
import SEO from '../../components/SEO';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'uploaded' | 'saved'>('uploaded'); // Track the active tab

  const isOwnProfile = user?.username === username;

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.getProfile(username!);
      setProfile(response.data);
    } catch (error) {
      toast.error('Failed to load profile');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async (formData: FormData) => {
    try {
      await profileAPI.updateProfile(formData);
      await fetchProfile();
      setShowEditModal(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleSubscribe = async () => {
    if (!profile) return;

    try {
      const isSubscribed = profile.is_subscribed;
      if (isSubscribed) {
        await profileAPI.unsubscribe(profile.id);
      } else {
        await profileAPI.subscribe(profile.id);
      }
      await fetchProfile();
      toast.success(isSubscribed ? 'Unsubscribed successfully' : 'Subscribed successfully');
    } catch (error) {
      toast.error('Failed to update subscription');
    }
  };

  const handleDeleteSong = async (songId: number) => {
    if (!window.confirm('Are you sure you want to delete this song?')) return;

    try {
      await songAPI.deleteSong(songId);
      await fetchProfile();
      toast.success('Song deleted successfully');
    } catch (error) {
      toast.error('Failed to delete song');
    }
  };

  const handleUnsaveSong = async (songId: number) => {
    try {
      await songAPI.unsaveSong(songId);
      await fetchProfile();
      toast.success('Song removed from saved songs');
    } catch (error) {
      toast.error('Failed to remove song');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <>
      <SEO
        title={`${profile.username} - Profile`}
        description={profile.bio || `Check out ${profile.username}'s profile on LISIN. Discover their uploaded songs and musical creations.`}
        keywords={`${profile.username}, music artist, musician profile, artist songs, music creator, LISIN artist`}
        url={`https://lisin.vercel.app/profile/${profile.username}`}
        image={profile.profile_picture || undefined}
        type="profile"
        schema={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "Person",
            "name": profile.username,
            "description": profile.bio,
            "image": profile.profile_picture,
            "url": `https://lisin.vercel.app/profile/${profile.username}`,
            "interactionStatistic": [
              {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/FollowAction",
                "userInteractionCount": profile.subscribers_count
              }
            ]
          }
        }}
      />
      <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwnProfile}
          onEditClick={() => setShowEditModal(true)}
          onSubscribe={handleSubscribe}
        />
        
        <div className="flex justify-center mb-4">
          
 <div className="bg-slate-800 rounded-full p-1 flex items-center space-x-1 shadow-md">

  {isOwnProfile && (
   <button
     onClick={() => setActiveTab('uploaded')}
     className={`
       px-6 py-2 rounded-full transition-all duration-300 
       ${activeTab === 'uploaded' 
         ? 'bg-green-500 text-white' 
         : 'text-slate-300 hover:bg-slate-700'}
     `}
   >
     Uploaded Songs
   </button>)}

   {isOwnProfile && (
   <button
     onClick={() => setActiveTab('saved')}
     className={`
       px-6 py-2 rounded-full transition-all duration-300 
       ${activeTab === 'saved' 
         ? 'bg-green-500 text-white' 
         : 'text-slate-300 hover:bg-slate-700'}
     `}
   >
     Saved Songs
   </button>)}
 </div>
</div>

        {/* Content Based on Active Tab */}
        <div className="mt-8 space-y-8">
          {activeTab === 'uploaded' && (
            <ProfileSongs
              songs={profile.audio}
              isOwnProfile={isOwnProfile}
              onDelete={handleDeleteSong}
            />
          )}
          
          {activeTab === 'saved' && isOwnProfile && profile.saved_songs && (
            <SavedSongs
              savedSongs={profile.saved_songs}
              onUnsave={handleUnsaveSong}
            />
          )}
        </div>

        {showEditModal && (
          <EditProfileModal
            profile={profile}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditProfile}
          />
        )}
      </div>
      </div>
    </>
  );
};

export default Profile;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import MainSongView from './pages/SongDetail/MainIndexSongDetails';
import CreateSong from './pages/CreateSong';
import EditSong from './pages/EditSong';
import Search from './pages/Search';
import NotificationList from './pages/NotificationList';
import PrivateRoute from './components/PrivateRoute';

function AppWrapper() {
  const location = useLocation();
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);

  useEffect(() => {
    // When user navigates to /song/:id => show the player
    const match = location.pathname.match(/^\/song\/(\d+)/);
    if (match) {
      const id = Number(match[1]);
      setCurrentSongId(id);
      setIsPlayerVisible(true);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <main className="w-full px-0 py-6 sm:px-1 lg:px-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/create-song"
            element={
              <PrivateRoute>
                <CreateSong />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-song/:id"
            element={
              <PrivateRoute>
                <EditSong />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationList />
              </PrivateRoute>
            }
          />
          {/* We remove the MainSongView from the route */}
        </Routes>
      </main>

      {/* Fixed mini-player visible globally */}
      {isPlayerVisible && currentSongId && (
  <div className="h-screen"> {/* or use h-full depending on parent */}
    <MainSongView
      id={currentSongId}
      onClose={() => setIsPlayerVisible(false)}
    />
  </div>
)}


      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <AppWrapper />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

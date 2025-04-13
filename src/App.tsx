import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black text-white font-sans">
          <Navbar />
          <main className="w-full px-0 py-6 sm:px-1 lg:px-1">
            {/* Ensuring the main content area has proper padding and responsiveness */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/song/:id" element={<MainSongView />} />
              <Route path="/search/" element={<Search />} />
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
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

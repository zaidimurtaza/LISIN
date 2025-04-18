import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SongDetail from '.'
import { songAPI } from '../../services/api'
import { motion,  AnimatePresence } from "framer-motion";
const MainSongView = () => {
  const [songs, setSongs] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  // Fetch all songs once
  useEffect(() => {
    const fetchSongs = async () => {
      const allSongs = await songAPI.getAllSongs()
      console.log("Fetched Songs:", allSongs)
      setSongs(allSongs.data)
    }
    fetchSongs()
  }, [])

  // Log songs when they are updated
  useEffect(() => {
    console.log("Updated Songs state:", songs)
  }, [songs])

  const handleSongEnd = () => {
    console.log("Song ended. Checking for next.")
    console.log(songs)
    const currentIndex = songs.findIndex(song => song.id === Number(id))
    console.log("currentIndex",currentIndex)
    const nextIndex = currentIndex + 1

    if (nextIndex < songs.length) {
      const nextSongId = songs[nextIndex].id
      console.log("Navigating to:", nextSongId)
      navigate(`/song/${nextSongId}`)
    } else {
        const nextSongId = songs[0].id
        navigate(`/song/${nextSongId}`)
    }
  }

  return (
    <div className="p-0 z-50 relative">
      
      <AnimatePresence mode="wait">
        <motion.div
          key={id} // triggers animation on id change
          initial={{ opacity: 0, x: 100 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }
          }}
          exit={{ 
            opacity: 0, 
            x: -100, 
            transition: { 
              duration: 0.3, 
              ease: "anticipate" 
            }
          }}
          className="w-full"
        >
          <SongDetail onSongEnd={handleSongEnd} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
  
}

export default MainSongView

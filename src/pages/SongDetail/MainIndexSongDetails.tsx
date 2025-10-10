import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SongDetail from '.'
import { songAPI } from '../../services/api'
import { motion, AnimatePresence } from 'framer-motion'

interface Song {
  id: number
  title: string
  artist: string
  // Add other song properties as needed
}

const MainSongView = ({ id, onClose }: { id: number, onClose: () => void }) => {
  const [songs, setSongs] = useState<Song[]>([])
  const [error, setError] = useState<string | null>(null) 
  const navigate = useNavigate()

  // Fetch all songs once
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const allSongs = await songAPI.getAllSongs()
        setSongs(allSongs.data)
      } catch (error) {
        console.error('Error fetching songs:', error)
        setError('Failed to load songs. Please try again later.') // Error message for the user
      }
    }
    fetchSongs()
  }, [])

  const handleSongEnd = () => {
    const currentIndex = songs.findIndex(song => song.id === Number(id))
    const nextIndex = (currentIndex + 1) % songs.length // This loops back to the first song
    const nextSongId = songs[nextIndex]?.id

    if (nextSongId) {
      navigate(`/song/${nextSongId}`)
    }
  }

  return (
    <div className="p-0 z-50 relative">
      {error && <div className="text-red-500 p-2">{error}</div>} {/* Show error message if there's any */}

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 30,
            },
          }}
          exit={{
            opacity: 0,
            x: -100,
            transition: {
              duration: 0.6,
              ease: 'anticipate',
            },
          }}
          className="w-full"
        >
          <SongDetail id={id} onSongEnd={handleSongEnd} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default MainSongView

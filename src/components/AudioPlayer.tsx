'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  // We use a state to ensure the component is mounted before rendering the audio tag 
  // to avoid hydration mismatches if we tried to auto-play.
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Browsers require user interaction before playing audio
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => {
          console.warn("Audio playback failed or file missing:", e);
          setIsPlaying(false);
          alert("Audio file is currently being prepared. Check back soon for the full cinematic experience!");
        });
      }
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4">
      <audio ref={audioRef} src="/ambient.mp3" loop />
      
      <button 
        onClick={toggleAudio}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-2xl group"
        aria-label="Toggle cinematic audio"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-white/90 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/50 group-hover:text-white/90 group-hover:scale-110 transition-all" />
        )}
      </button>

      {/* Subtle glowing text indicator */}
      <span className={`text-xs tracking-[0.2em] font-light transition-opacity duration-500 uppercase ${isPlaying ? 'text-white/60' : 'text-white/30'}`}>
        {isPlaying ? 'Sound: On' : 'Sound: Off'}
      </span>
    </div>
  );
}

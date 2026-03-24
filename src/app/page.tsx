import ScrollyCanvas from '@/components/ScrollyCanvas';
import Projects from '@/components/Projects';
import AudioPlayer from '@/components/AudioPlayer';

export default function Home() {
  return (
    <main className="relative w-full bg-[#121212] selection:bg-white/20 selection:text-white">
      {/* Cinematic ambient audio player */}
      <AudioPlayer />
      
      {/* 500vh container is managed entirely by ScrollyCanvas for perfect scroll sync */}
      <ScrollyCanvas />
      
      {/* Projects section naturally follows the 500vh scroll container */}
      <Projects />
    </main>
  );
}

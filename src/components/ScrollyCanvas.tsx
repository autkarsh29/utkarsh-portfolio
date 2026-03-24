'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';

const FRAME_COUNT = 120; // 000 to 119

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [priorityLoaded, setPriorityLoaded] = useState(false);

  // Single source of truth for scrolling progress inside the 500vh area
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map 0-1 to 0-119 image frames
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // ---------- TEXT PARALLAX MAPPING ----------
  // Explicit non-overlapping dead zones: 

  // SECTION 1 (Name & Title): Finishes fading out perfectly before 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
  const scale1 = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  // SECTION 2 (Driving operational efficiency): Begins fading in clearly at 25%, gone by 55%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.55], [100, -100]);
  const scale2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0.95, 1, 1, 0.95]);

  // SECTION 3 (Measurable impact): Appears completely and securely before un-sticking
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.65, 0.95], [100, -100]);
  const scale3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0.95, 1, 1, 0.95]);

  useEffect(() => {
    // Stage 1: Load First Frame (Priority)
    const loadFirstFrame = () => {
      const img = new Image();
      img.src = `/sequence/frame_000_delay-0.066s.webp`;
      img.onload = () => {
        setPriorityLoaded(true);
        // Paint it immediately
        requestAnimationFrame(() => drawFrame(0));
      };
      // For background array
      return img;
    };

    // Stage 2: Load Everything Else (Background)
    const preloadImages = async () => {
      const firstImg = loadFirstFrame();
      const loadedImages: HTMLImageElement[] = [firstImg];
      let loadedCount = 1;

      // Initialize the rest with placeholder objects
      for (let i = 1; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(3, '0');
        img.src = `/sequence/frame_${frameNumber}_delay-0.066s.webp`;
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          if (loadedCount === FRAME_COUNT) {
            setLoaded(true);
          }
        };
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    preloadImages();
  }, []);

  // Frame Draw logic
  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[Math.round(index)];
    if (!img || !img.complete) return;

    // Object-fit: cover logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => drawFrame(latest));
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(frameIndex.get());
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, images]);

  return (
    <div ref={containerRef} className="h-[500vh] relative w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />

        {/* --- TEXT OVERLAYS SYNCHRONIZED TO CANVAS --- */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center p-8 lg:p-24 z-20">
          
          {/* Section 1 */}
          <motion.div 
            style={{ opacity: opacity1, y: y1, scale: scale1 }}
            className="absolute text-center drop-shadow-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white">Utkarsh Agarwal</h1>
            <p className="text-xl md:text-3xl font-light text-white/80 tracking-wide">Operations & Process Excellence Manager</p>
          </motion.div>

          {/* Section 2 */}
          <motion.div 
            style={{ opacity: opacity2, y: y2, scale: scale2 }}
            className="absolute left-8 lg:left-24 max-w-2xl drop-shadow-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">Driving operational efficiency.</h2>
            <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-light">With 6+ years of experience across BFSI and IT sectors, I specialize in SOP development, workflow optimization, and compliance management.</p>
          </motion.div>

          {/* Section 3 */}
          <motion.div 
            style={{ opacity: opacity3, y: y3, scale: scale3 }}
            className="absolute right-8 lg:right-24 max-w-2xl text-right drop-shadow-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">Measurable impact.</h2>
            <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-light ml-auto">Proven track record of reducing discrepancies by 25%, improving processing efficiency by 20%, and ensuring 100% timely collections.</p>
          </motion.div>

        </div>

        {/* Loading overlay - only blocks until first frame is ready */}
        {!priorityLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-50 text-white font-sans">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6" />
              <span className="text-xs uppercase tracking-[0.4em] text-white/40">Initializing Cinematic Experience</span>
            </div>
          </div>
        )}

        {/* Small Progress Indicator (Non-blocking) */}
        {!loaded && priorityLoaded && (
          <div className="absolute bottom-8 right-8 z-40 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-opacity duration-1000">
             <div className="w-16 h-[1px] bg-white/10 overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadProgress}%` }}
                />
             </div>
             <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{loadProgress}% SYNC</span>
          </div>
        )}
      </div>
    </div>
  );
}

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


  // Frame Draw logic (with Closest-Frame Fallback)
  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetIndex = Math.round(index);
    let img = images[targetIndex];

    // Fallback: Use nearest available frame if target is not loaded
    if (!img || !img.complete) {
      // Search outward for the closest available frame
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const left = targetIndex - offset;
        const right = targetIndex + offset;
        
        if (left >= 0 && images[left]?.complete) {
          img = images[left];
          break;
        }
        if (right < FRAME_COUNT && images[right]?.complete) {
          img = images[right];
          break;
        }
      }
    }

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

  useEffect(() => {
    const preloadImages = async () => {
      // Stage 0: Priority Frame 0
      const firstImg = new Image();
      const frame0Src = `/sequence/frame_000_delay-0.066s.webp`;
      firstImg.src = frame0Src;
      
      // We set a timeout for the priority image to ensure the site loads even if the frame is slow
      const priorityTimeout = new Promise((resolve) => {
        setTimeout(() => {
          console.warn('Priority frame loading timed out. Proceeding to interaction ready state.');
          resolve(null);
        }, 3000); // 3 seconds timeout
      });

      const priorityLoad = new Promise((resolve) => {
        firstImg.onload = () => {
          setPriorityLoaded(true);
          requestAnimationFrame(() => drawFrame(0));
          resolve(null);
        };
        firstImg.onerror = () => {
          console.error(`Failed to load priority frame: ${frame0Src}`);
          // Still resolve to allow the site to "load" and show fallback or empty canvas
          setPriorityLoaded(true); 
          resolve(null);
        };
      });

      await Promise.race([priorityLoad, priorityTimeout]);

      const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
      loadedImages[0] = firstImg;
      setImages([...loadedImages]);

      let loadedCount = 1;
      const BATCH_SIZE = 8;
      const CRITICAL_THRESHOLD = 40; // Site is "Loaded" after 40 frames

      // Helper for batch loading
      const loadBatch = async (start: number, end: number) => {
        for (let i = start; i < end; i += BATCH_SIZE) {
          const batchPromises = [];
          for (let j = i; j < Math.min(i + BATCH_SIZE, end); j++) {
            const img = new Image();
            const frameNumber = String(j).padStart(3, '0');
            img.src = `/sequence/frame_${frameNumber}_delay-0.066s.webp`;
            
            const p = new Promise((resolve) => {
              img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                resolve(null);
              };
              img.onerror = () => {
                console.warn(`Failed to preview frame ${j}`);
                loadedCount++; // Still count towards progress to avoid stuck indicator
                resolve(null);
              };
            });
            batchPromises.push(p);
            loadedImages[j] = img;
          }
          await Promise.all(batchPromises);
          
          // Trigger UI state updates
          if (loadedCount >= CRITICAL_THRESHOLD && !loaded) {
            setLoaded(true);
          }
          if (i % (BATCH_SIZE * 2) === 1 || loadedCount === FRAME_COUNT) {
            setImages([...loadedImages]);
          }
        }
      };

      // Stage 1: Critical (1 to 40)
      await loadBatch(1, CRITICAL_THRESHOLD);
      setLoaded(true); // Ensure interaction ready

      // Stage 2: Background (41 to 119)
      await loadBatch(CRITICAL_THRESHOLD, FRAME_COUNT);
    };

    preloadImages();
  }, []);

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

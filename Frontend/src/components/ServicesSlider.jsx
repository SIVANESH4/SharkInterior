import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES_DATA = [
  {
    id: 'turnkey',
    number: '01',
    title: 'Turnkey Projects',
    subtitle: 'Concept to Completion Management',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'kitchen',
    number: '02',
    title: 'Modular Kitchens',
    subtitle: 'Culinary Architecture',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'container',
    number: '03',
    title: 'Container Luxury',
    subtitle: 'Avant-Garde Architectural Adaptation',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'wardrobe',
    number: '04',
    title: 'Bespoke Wardrobes',
    subtitle: 'Premium Storage Craftsmanship',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'office',
    number: '05',
    title: 'Executive Environments',
    subtitle: 'Corporate Interior Architecture',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
  }
];

export default function ServicesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES_DATA.length);
  };

  const activeSlide = SLIDES_DATA[currentIndex];

  return (
    <section className="w-full bg-[#FAF9F6] text-[#3E322A] py-10 px-6 lg:px-16 border-t border-[#C5A880]/10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* --- COMPACT OUTSIDE TEXT BAR --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] whitespace-nowrap">
              Collection Preview
            </span>
            <div className="h-px w-8 bg-[#C5A880]/20 hidden sm:block" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#5A4B41]/60 font-medium hidden sm:block">
              Atelier Lookbook
            </span>
          </div>
          
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5A4B41] hover:text-[#C5A880] transition-colors duration-300 w-fit self-start md:self-auto"
          >
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[#C5A880]" />
          </Link>
        </div>

        {/* --- HIGH-END SLIDER CANVAS --- */}
        {/* Adjusted to h-[45vh] on mobile and h-[65vh] on desktop to maintain a compact footprint */}
        <div className="relative w-full h-[45vh] sm:h-[60vh] lg:h-[65vh] bg-[#3E322A] overflow-hidden rounded-sm border border-[#C5A880]/10 shadow-sm">
          
          {/* Background Image Track */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full z-0"
            >
              <img 
                src={activeSlide.image} 
                alt={activeSlide.title} 
                className="w-full h-full object-cover"
              />
              {/* Subtle scrim overlay to give it a rich look */}
              <div className="absolute inset-0 bg-black/25 backdrop-grayscale-[15%]" />
            </motion.div>
          </AnimatePresence>

          {/* Minimalist Floating Corner Info */}
          <div className="absolute bottom-6 left-6 z-10 bg-[#3E322A]/90 backdrop-blur-md text-white border border-[#C5A880]/20 px-4 py-3 max-w-[280px] sm:max-w-md rounded-xs shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="font-serif text-sm text-[#C5A880]">{activeSlide.number}</span>
                  <span className="text-[8px] tracking-wider uppercase text-white/50">{activeSlide.subtitle}</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg tracking-wide text-white leading-tight">
                  {activeSlide.title}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* --- HORIZONTAL PROGRESS INDICATOR (Directly below the image frame) --- */}
        <div className="w-full flex items-center gap-2 mt-4">
          {SLIDES_DATA.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className="h-0.5 flex-grow relative transition-all duration-300 rounded-full overflow-hidden"
                style={{ backgroundColor: isActive ? 'transparent' : 'rgba(62, 50, 42, 0.1)' }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {isActive && (
                  <motion.div
                    key={`progress-bar-${index}`}
                    className="absolute inset-0 bg-[#C5A880]"
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: 'linear' }}
                    onAnimationComplete={triggerNextSlide}
                  />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
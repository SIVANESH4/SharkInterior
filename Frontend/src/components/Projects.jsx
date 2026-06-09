import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Premium Mock Data for Sharkings Projects
const PROJECTS_DATA = [
    {
        id: 'salon-luxe',
        title: 'The Velvet Atelier Salon',
        location: 'Madurai',
        category: 'Commercial / Hospitality',
        coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
        description: 'A high-end salon conceptualized with rich velvets, golden filigree partitioning, and specialized architectural lighting designed to elevate the luxury styling experience.',
        images: [
            'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'amber-residence',
        title: 'The Amber Residence',
        location: 'Ramanathapuram',
        category: 'Residential Architecture',
        coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        description: 'A structural, multi-generational private home utilizing organic earth tones, premium teak woodwork, and ambient brass details.',
        images: [
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'corporate-lounge',
        title: 'Gilded Executive Suite',
        location: 'Madurai',
        category: 'Corporate Office',
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        description: 'A command office space balancing ergonomics with quiet luxury, featuring custom wall paneling and polished travertine flooring.',
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'serene-villa',
        title: 'The Alabaster Villa',
        location: 'Madurai',
        category: 'Residential / Living Space',
        coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        description: 'An expansive private residence emphasizing open-concept minimalism. Curated with bespoke ivory stone wall textures, custom dark walnut cabinetry, and elegant brushed gold recessed lighting arrays.',
        images: [
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'gilded-lounge',
        title: 'The Majestique Cafe & Lounge',
        location: 'Ramanathapuram',
        category: 'Commercial / Hospitality',
        coverImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
        description: 'A premium fine-dining hospitality space crafted to offer an intimate, upscale environment. Features striking warm oak acoustic ceiling baffles, luxurious caramel leather banquette seating, and hand-polished brass accents.',
        images: [
            'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'minimal-penthouse',
        title: 'The Meridian Penthouse',
        location: 'Madurai',
        category: 'Residential / Suite',
        coverImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        description: 'A high-elevation luxury penthouse designed around panoramic natural light. The internal layout pairs soft alabaster backdrops with rich mocha accents and bespoke golden linear profiles for an editorial architectural flow.',
        images: [
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
        ]
    }
];

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openSlider = (project) => {
        setActiveProject(project);
        setCurrentSlide(0);
        // Prevent background scrolling when slider is open
        document.body.style.overflow = 'hidden';
    };

    const closeSlider = () => {
        setActiveProject(null);
        document.body.style.overflow = 'unset';
    };

    const nextSlide = (e) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev === activeProject.images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev === 0 ? activeProject.images.length - 1 : prev - 1));
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant' // 'instant' overrides browser animation lag, ensuring you see the top right away
        });
    }, []);

    // Animation variants matching landing page configuration
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
    };

    return (
        <section className="bg-white min-h-screen py-24 px-6 lg:px-16 text-[#3E322A]">
            <div className="max-w-6xl mx-auto">
                {/* --- PREMIUM NAVIGATION LAYER --- */}
                <div className="mb-10">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#5A4B41] hover:text-[#C5A880] transition-colors duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 stroke-[#C5A880]" />
                        Back To Home
                    </Link>
                </div>

                {/* --- HEADER BLOCK --- */}
                <div className="mb-16 border-b border-[#C5A880]/10 pb-8">
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] block mb-3">
                        Our Masterpieces
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-light tracking-wide">
                        The Portfolio Architecture
                    </h1>
                    <p className="text-[#5A4B41] font-light max-w-xl mt-4 text-sm md:text-base leading-relaxed">
                        A granular look into our completed, high-end residential and commercial projects across Madurai and Ramanathapuram since 2010.
                    </p>
                </div>

                {/* --- PROJECTS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PROJECTS_DATA.map((project) => (
                        <motion.div
                            key={project.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeInUp}
                            onClick={() => openSlider(project)}
                            className="group cursor-pointer flex flex-col justify-between"
                        >
                            <div className="relative overflow-hidden bg-[#FAF9F6] aspect-[3/4] border border-[#C5A880]/10 mb-5">
                                {/* Hover zoom & subtle overlay */}
                                <div className="absolute inset-0 bg-[#3E322A]/0 group-hover:bg-[#3E322A]/10 transition-colors duration-500 z-10 flex items-center justify-center">
                                    <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-400 z-20" />
                                </div>
                                <img
                                    src={project.coverImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-[0.25, 1, 0.5, 1] group-hover:scale-103"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#C5A880] mb-2 font-medium">
                                    <span>{project.category}</span>
                                    <span className="text-[#5A4B41]/60 font-light">{project.location}</span>
                                </div>
                                <h3 className="font-serif text-xl text-[#3E322A] tracking-wide group-hover:text-[#C5A880] transition-colors duration-300">
                                    {project.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- PREMIUM POP-UP FULLSCREEN SLIDER MODAL --- */}
            <AnimatePresence>
                {activeProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[200] bg-[#FAF9F6] flex flex-col lg:flex-row"
                    >
                        {/* Left Side: Editorial Info Column */}
                        <div className="w-full lg:w-1/3 bg-[#FAF9F6] border-b lg:border-b-0 lg:border-r border-[#C5A880]/20 p-8 lg:p-12 flex flex-col justify-between z-10 order-2 lg:order-1">
                            <div>
                                <button
                                    onClick={closeSlider}
                                    className="hidden lg:flex items-center gap-2 text-xs tracking-widest uppercase text-[#5A4B41] hover:text-[#C5A880] transition-colors mb-16 group"
                                >
                                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                    Close Gallery
                                </button>

                                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                                    {activeProject.category}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-serif text-[#3E322A] mb-4">
                                    {activeProject.title}
                                </h2>
                                <p className="text-xs tracking-widest text-[#5A4B41]/70 uppercase mb-6 font-medium">
                                    Location: {activeProject.location}, Tamil Nadu
                                </p>
                                <p className="text-sm text-[#5A4B41] font-light leading-relaxed mb-8">
                                    {activeProject.description}
                                </p>
                            </div>

                            {/* Slider Meta Numbers */}
                            <div className="flex items-center justify-between border-t border-[#C5A880]/20 pt-6 text-xs tracking-widest uppercase font-medium text-[#3E322A]">
                                <span>Sharkings Atelier</span>
                                <span>{currentSlide + 1} / {activeProject.images.length}</span>
                            </div>
                        </div>

                        {/* Right Side: High-End Image Frame Container */}
                        <div className="w-full lg:w-2/3 h-[50vh] lg:h-full bg-[#3E322A] relative flex items-center justify-center overflow-hidden order-1 lg:order-2">

                            {/* Mobile Close Button Overlay */}
                            <button
                                onClick={closeSlider}
                                className="absolute top-6 right-6 lg:hidden z-30 bg-white/90 p-3 rounded-full shadow-lg text-[#3E322A]"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Slider Image Shell */}
                            <div className="w-full h-full relative">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentSlide}
                                        src={activeProject.images[currentSlide]}
                                        alt={`Slide showcase ${currentSlide}`}
                                        initial={{ opacity: 0, scale: 1.02 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Nav Arrows */}
                            <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-20 flex space-x-3">
                                <button
                                    onClick={prevSlide}
                                    className="w-12 h-12 border border-white/20 bg-[#3E322A]/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#C5A880] hover:border-[#C5A880] transition-all duration-300 rounded-full"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-12 h-12 border border-white/20 bg-[#3E322A]/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#C5A880] hover:border-[#C5A880] transition-all duration-300 rounded-full"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, Compass, ShieldCheck, Users, Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        // Prevents background scrolling behind the mobile slide-out overlay
        document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
    };

    // Smooth timing to allow the drawing animation to finish elegantly
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    // Shared elegant motion variants
    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <div className="bg-[#FAF9F6] text-[#3E322A] font-sans antialiased selection:bg-[#C5A880] selection:text-white overflow-x-hidden">

            {/* --- PREMIUM MINIMALIST IMAGE PRELOADER --- */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{
                            y: '-100%',
                            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } // Smooth curtain lift
                        }}
                        className="fixed inset-0 z-[100] bg-[#FAF9F6] flex flex-col items-center justify-center select-none"
                    >
                        <div className="relative w-56 h-56 flex items-center justify-center">

                            {/* Elegant Luxury Gold Accent Tracker Ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="44"
                                    className="stroke-[#3E322A]/5 fill-none"
                                    strokeWidth="1"
                                />
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="44"
                                    className="stroke-[#C5A880] fill-none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    initial={{ strokeDasharray: "0 300" }}
                                    animate={{ strokeDasharray: "220 300" }}
                                    transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
                                />
                            </svg>

                            {/* Central Logo Container with dynamic breathing pulse */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.25, 1, 0.5, 1]
                                }}
                                className="w-40 h-40 flex items-center justify-center p-4 bg-white rounded-full shadow-sm border border-[#C5A880]/10 overflow-hidden"
                            >
                                <motion.img
                                    src={Logo}
                                    alt="SharkingsInterior Logo"
                                    className="w-full h-full object-contain pl-3"
                                    animate={{
                                        scale: [1, 1.04, 1],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>

                        </div>

                        {/* Subtle Editorial Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.35, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-[11px] tracking-[0.4em] uppercase text-[#3E322A] mt-6 font-medium"
                        >
                            Elevating Spaces
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- NAVBAR --- */}
            <nav className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#C5A880]/10 px-6 lg:px-16 py-5 flex items-center justify-between text-[#3E322A]">

                {/* --- BRANDING / LOGO CONTAINER --- */}
                <Link to="/" onClick={closeMenu} className="text-xl font-serif tracking-[0.2em] uppercase">
                    {/* Large text hidden on small screens, replaced by responsive logo asset image */}
                    <span className="hidden md:inline">
                        SHARKINGS<span className="text-[#C5A880] font-light">INTERIOR</span>
                    </span>
                    <img
                        src={Logo}
                        alt="Sharkings Logo"
                        className="inline md:hidden h-7 w-auto object-contain mix-blend-multiply"
                        onError={(e) => {
                            // Fallback block initials if logo.png hasn't been uploaded yet
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <span className="hidden text-base font-serif tracking-[0.15em] uppercase font-bold">
                        S<span className="text-[#C5A880]">I</span>
                    </span>
                </Link>

                {/* --- DESKTOP NAVIGATION MATRIX (Hidden on Mobile) --- */}
                <div className="hidden md:flex space-x-8 text-sm font-medium tracking-widest uppercase text-[#5A4B41]">
                    <a href="#about" className="hover:text-[#C5A880] transition-colors">About</a>
                    <Link to="/services" className="hover:text-[#C5A880] transition-colors">Services</Link>
                    <Link to="/projects" className="hover:text-[#C5A880] transition-colors">Projects</Link>
                    <a href="#why-us" className="hover:text-[#C5A880] transition-colors">Why Us</a>
                </div>

                {/* --- RIGHT UTILITY ACTION GROUP --- */}
                <div className="flex items-center gap-4">
                    {/* Always rendered inline button */}
                    <a
                        href="#contact-section"
                        className="inline-block border border-[#C5A880] text-[#3E322A] px-4 md:px-5 py-2 text-[10px] md:text-xs tracking-widest uppercase hover:bg-[#C5A880] hover:text-white transition-all duration-300 text-center font-medium rounded-sm"
                    >
                        Inquire Now
                    </a>

                    {/* Trigger Icon - Visible on Mobile screens only */}
                    <button
                        onClick={toggleMenu}
                        className="block md:hidden text-[#3E322A] hover:text-[#C5A880] transition-colors p-1"
                        aria-label="Toggle Menu Navigation"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* --- MOBILE FULL-SCREEN MENU DRAWER --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        /* FIXED: Added explicit h-screen, min-h-screen, and overflow-y-auto */
                        className="fixed inset-0 h-screen min-h-screen w-screen z-40 bg-[#FAF9F6] pt-28 px-8 flex flex-col justify-between pb-12 md:hidden overflow-y-auto"
                    >
                        {/* Nav Menu Content Stack */}
                        <div className="flex flex-col gap-6 w-full">
                            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C5A880]">
                                Navigation Menu
                            </span>

                            <div className="flex flex-col gap-1.5 w-full">
                                <a
                                    href="#about"
                                    onClick={closeMenu}
                                    className="flex items-center justify-between text-left border-b border-[#C5A880]/10 py-3.5 text-lg font-serif tracking-wide text-[#3E322A] active:text-[#C5A880]"
                                >
                                    <span>About</span>
                                    <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                                </a>

                                <Link
                                    to="/services"
                                    onClick={closeMenu}
                                    className="flex items-center justify-between text-left border-b border-[#C5A880]/10 py-3.5 text-lg font-serif tracking-wide text-[#3E322A] active:text-[#C5A880]"
                                >
                                    <span>Services</span>
                                    <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                                </Link>

                                <Link
                                    to="/projects"
                                    onClick={closeMenu}
                                    className="flex items-center justify-between text-left border-b border-[#C5A880]/10 py-3.5 text-lg font-serif tracking-wide text-[#3E322A] active:text-[#C5A880]"
                                >
                                    <span>Projects</span>
                                    <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                                </Link>

                                <a
                                    href="#why-us"
                                    onClick={closeMenu}
                                    className="flex items-center justify-between text-left border-b border-[#C5A880]/10 py-3.5 text-lg font-serif tracking-wide text-[#3E322A] active:text-[#C5A880]"
                                >
                                    <span>Why Us</span>
                                    <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                                </a>
                            </div>
                        </div>

                        {/* Micro Footprint Label */}
                        <div className="border-t border-[#C5A880]/20 pt-6 w-full">
                            <p className="text-[10px] tracking-widest uppercase text-[#5A4B41] font-medium mb-1">
                                Sharkings Interior Architecture
                            </p>
                            <p className="text-[9px] tracking-wider text-[#5A4B41]/50 uppercase">
                                Madurai · Ramanathapuram
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- HERO SECTION --- */}
            <header className="relative min-h-[90vh] lg:min-h-[90vh] flex flex-col lg:flex-row items-center justify-center px-5 lg:px-16 overflow-hidden bg-[#FAF9F6] pt-6pb-6 lg:py-0">

                {/* --- BACKGROUND ACCENTS FOR MOBILE TEXTURE --- */}
                <div className="absolute inset-0 block lg:hidden z-0 pointer-events-none">
                    <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-[#EFECE6]/40 blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10 flex-grow">

                    <div className="lg:col-span-6 w-full order-1 lg:order-2">
                        {/* FIXED: Changed mobile aspect ratio from wide 21/9 to an elegant 16/10 to take up proper layout space */}
                        <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:h-[75vh] lg:aspect-auto z-10">

                            {/* Elegant Background Framing Block */}
                            <div className="absolute -inset-1 lg:inset-y-0 lg:left-12 lg:right-0 bg-[#EFECE6] border border-[#C5A880]/10 rounded-sm -z-10" />

                            {/* Core Architectural Showcase Frame */}
                            <motion.div
                                initial={{ opacity: 0, y: -15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                                className="w-full h-full border border-[#C5A880]/20 overflow-hidden shadow-sm rounded-sm"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                                    alt="Luxury living space"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Overflow Overlay Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="absolute -top-3 -right-3 lg:top-auto lg:bottom-12 lg:-left-6 bg-white p-3 lg:p-6 border-r-4 lg:border-r-0 lg:border-l-4 border-[#C5A880] shadow-md max-w-[120px] lg:max-w-[240px] rounded-l-sm lg:rounded-l-none lg:rounded-r-sm z-20"
                            >
                                <p className="font-serif text-lg lg:text-2xl text-[#3E322A] mb-0.5 leading-none">15+</p>
                                <p className="text-[7px] lg:text-xs tracking-wider text-[#5A4B41] uppercase font-medium leading-tight">
                                    Years of Excellence
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* --- TEXT CONTENT BELOW IMAGE ON MOBILE (lg:order-1 moves it back to the left side on desktop) --- */}
                    <div className="lg:col-span-6 max-w-xl order-2 lg:order-1 -mt-4 lg:mt-0">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-[9px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880] block mb-2"
                        >
                            Luxury Interior Architecture
                        </motion.span>

                        <div className="overflow-hidden mb-3">
                            <motion.h1
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
                                className="text-3xl md:text-6xl font-serif font-light text-[#3E322A] leading-[1.25]"
                            >
                                Crafting Spaces of <span className="italic font-normal">Timeless</span> Elegance
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-[#5A4B41] text-xs md:text-lg mb-5 font-light leading-relaxed max-w-lg"
                        >
                            We transform high-end residential and commercial environments into bespoke masterpieces, blending rich textures, functional luxury, and warm golden tones.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex"
                        >
                            <a
                                href="#projects"
                                className="bg-[#3E322A] text-white px-6 py-3.5 text-[11px] tracking-widest uppercase font-medium hover:bg-[#2A211B] transition-all duration-300 flex items-center justify-center gap-2 group rounded-sm shadow-sm"
                            >
                                Explore Portfolio
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[#C5A880]" />
                            </a>
                        </motion.div>
                    </div>

                </div>
            </header>
            {/* --- ABOUT SECTION --- */}
            <motion.section
                id="about"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-24 px-6 lg:px-16 bg-[#FAF9F6]"
            >
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={fadeInUpVariants} className="bg-white p-2 border border-[#C5A880]/20 shadow-md">
                            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" alt="Interior craftsmanship details" className="w-full h-64 object-cover" />
                        </motion.div>
                        <motion.div variants={fadeInUpVariants} className="bg-white p-2 border border-[#C5A880]/20 shadow-md translate-y-8">
                            <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80" alt="Material texture pairing" className="w-full h-64 object-cover" />
                        </motion.div>
                    </div>

                    <motion.div variants={fadeInUpVariants}>
                        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] block mb-3">
                            The Studio
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif text-[#3E322A] mb-6">
                            Where Sophisticated Artistry Meets Modern Living
                        </h2>
                        <div className="space-y-4 text-[#5A4B41] font-light leading-relaxed">
                            <p>
                                Since 2010, Sharkings Interior Design has operated as a premier, full-service interior architecture studio serving Madurai and Ramanathapuram. Specializing in curated residential and commercial environments, we bring refined expertise to every project phase.
                            </p>
                            <p>
                                Whether orchestrating a subtle refresh of custom furniture and bespoke palettes or commanding a comprehensive, whole-house renovation, our team ensures a seamless journey and an unparalleled, timeless result.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* --- PROJECTS SECTION --- */}
            <motion.section
                id="projects"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-24 px-6 lg:px-16 bg-white"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div variants={fadeInUpVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                        <div>
                            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] block mb-3">
                                Selected Works
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif text-[#3E322A]">
                                Our Latest Masterpieces
                            </h2>
                        </div>
                        <Link to="/projects">
                            <button className="mt-4 md:mt-0 group flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#3E322A] hover:text-[#C5A880] transition-colors">
                                View Entire Portfolio
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div variants={fadeInUpVariants} className="group cursor-pointer">
                            <div className="overflow-hidden bg-[#FAF9F6] border border-[#C5A880]/10 mb-4 aspect-[3/4]">
                                <img
                                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
                                    alt="The Amber Residence Project"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                                />
                            </div>
                            <p className="text-xs tracking-widest uppercase text-[#C5A880] mb-1">Residential</p>
                            <h3 className="font-serif text-xl text-[#3E322A]">The Amber Residence</h3>
                        </motion.div>

                        <motion.div variants={fadeInUpVariants} className="group cursor-pointer">
                            <div className="overflow-hidden bg-[#FAF9F6] border border-[#C5A880]/10 mb-4 aspect-[3/4]">
                                <img
                                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                                    alt="Gilded Executive Office Suite"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                                />
                            </div>
                            <p className="text-xs tracking-widest uppercase text-[#C5A880] mb-1">Commercial</p>
                            <h3 className="font-serif text-xl text-[#3E322A]">Gilded Executive Suite</h3>
                        </motion.div>

                        <motion.div variants={fadeInUpVariants} className="group cursor-pointer">
                            <div className="overflow-hidden bg-[#FAF9F6] border border-[#C5A880]/10 mb-4 aspect-[3/4]">
                                <img
                                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
                                    alt="The Ivory Lounge Project"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                                />
                            </div>
                            <p className="text-xs tracking-widest uppercase text-[#C5A880] mb-1">Hospitality</p>
                            <h3 className="font-serif text-xl text-[#3E322A]">The Ivory Lounge</h3>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* --- WHY CHOOSE US --- */}
            <motion.section
                id="why-us"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-24 px-6 lg:px-16 bg-[#FAF9F6] border-t border-b border-[#C5A880]/10"
            >
                <motion.div variants={fadeInUpVariants} className="max-w-6xl mx-auto text-center mb-16">
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] block mb-3">
                        Distinction
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#3E322A]">
                        Why Partner With SharkingsInterior
                    </h2>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { icon: <Compass className="w-5 h-5" />, title: "Tailored Architecture", desc: "No templates. Every blueprint, veneer choice, and lighting plan is meticulously conceptualized from scratch." },
                        { icon: <Award className="w-5 h-5" />, title: "Elite Artisans", desc: "We collaborate exclusively with master woodworkers, premium stonemasons, and metal artisans to guarantee flawless execution." },
                        { icon: <ShieldCheck className="w-5 h-5" />, title: "Flawless Management", desc: "From initial mockups to final white-glove handover, we orchestrate the entire procurement and build lifecycle." },
                        { icon: <Users className="w-5 h-5" />, title: "Client-Centric Ethos", desc: "We limit our concurrent project queue to ensure your design receives the dedicated executive attention it commands." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUpVariants}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className="bg-white p-8 border border-[#C5A880]/10 shadow-sm text-center transition-shadow hover:shadow-md"
                        >
                            <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-6 text-[#C5A880]">
                                {item.icon}
                            </div>
                            <h3 className="font-serif text-lg text-[#3E322A] mb-3">{item.title}</h3>
                            <p className="text-xs text-[#5A4B41] font-light leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* --- PREMIUM CONTACT SECTION WITH MAPS INTEGRATION --- */}
            <section id="contact-section" className="bg-[#FAF9F6] py-16 px-6 lg:px-16 text-[#3E322A] border-t border-[#C5A880]/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* COLUMN 1: Editorial Studio Info (Width: 3/12) */}
                    <div className="lg:col-span-3 flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                                Connect With Us
                            </span>
                            <h2 className="text-3xl font-serif font-light tracking-wide mb-4">
                                Begin Your Design Journey
                            </h2>
                            <p className="text-[#5A4B41] font-light text-sm leading-relaxed mb-6">
                                Whether orchestrating custom millwork or a comprehensive structural renovation across Tamil Nadu, our team is ready to welcome you.
                            </p>
                        </div>
                        <div className="text-xs tracking-widest uppercase text-[#3E322A]/60 font-medium space-y-1 pb-4">
                            <p className="font-semibold text-[#3E322A]">The Atelier Studio</p>
                            <p className="normal-case font-light">bespoke@sharkingsinteriors.com</p>
                            <p>Office: +91 98765 43210</p>
                        </div>
                    </div>

                    {/* COLUMN 2: Interactive Google Map Integration (Width: 4/12) */}
                    <div className="lg:col-span-4 bg-white border border-[#C5A880]/10 p-2 shadow-sm rounded-sm min-h-[300px] lg:min-h-full relative overflow-hidden">
                        <iframe
                            title="Sharkings Interior Studio Location Map"
                            /* REPLACE THE URL BELOW WITH YOUR ACTUAL GOOGLE MAPS EMBED LINK */
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15721.285741870196!2d78.11471375!3d9.92130125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b118c53a%3A0x34080bcfa057bf1!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1717900000000!5m2!1sen!2sin"
                            className="w-full h-full border-0 rounded-sm opacity-90 hover:opacity-100 transition-opacity duration-300"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* COLUMN 3: Ultra-Clean Form Block (Width: 5/12) */}
                    <div className="lg:col-span-5 bg-white p-6 lg:p-8 border border-[#C5A880]/10 shadow-sm rounded-sm">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="YOUR NAME"
                                    className="w-full bg-[#FAF9F6] text-xs tracking-widest p-3.5 border border-[#C5A880]/10 focus:outline-none focus:border-[#C5A880] text-[#3E322A] transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="EMAIL ADDRESS"
                                    className="w-full bg-[#FAF9F6] text-xs tracking-widest p-3.5 border border-[#C5A880]/10 focus:outline-none focus:border-[#C5A880] text-[#3E322A] transition-colors"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="PROJECT TYPE (E.G., SALON, VILLA, KITCHEN)"
                                className="w-full bg-[#FAF9F6] text-xs tracking-widest p-3.5 border border-[#C5A880]/10 focus:outline-none focus:border-[#C5A880] text-[#3E322A] transition-colors"
                            />
                            <textarea
                                rows="4"
                                placeholder="TELL US ABOUT YOUR SPACE..."
                                className="w-full bg-[#FAF9F6] text-xs tracking-widest p-3.5 border border-[#C5A880]/10 focus:outline-none focus:border-[#C5A880] text-[#3E322A] transition-colors resize-none"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-[#3E322A] hover:bg-[#C5A880] text-white text-xs font-semibold tracking-[0.2em] uppercase py-4 transition-colors duration-300 rounded-sm shadow-sm"
                            >
                                Send Inquiry
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            {/* --- ACCESSIBLE HIGH-END FOOTER --- */}
            <footer className="bg-[#3E322A] text-white py-12 px-6 lg:px-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10 pb-10">

                    <div className="space-y-3">
                        <h3 className="text-xl font-serif tracking-[0.2em] uppercase">
                            SHARKINGS<span className="text-[#C5A880] font-light">INTERIOR</span>
                        </h3>
                        <p className="text-sm text-stone-300 font-light max-w-sm leading-relaxed">
                            Curating high-end spatial realities that echo timelessness, warmth, and unmatched distinction.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs tracking-widest uppercase text-[#C5A880] font-semibold mb-3">
                            Connect
                        </h4>
                        <p className="text-sm text-stone-200 font-light mb-1 hover:text-[#C5A880] transition-colors cursor-pointer tracking-wider">
                            sharkingsindia@gmail.com
                        </p>
                        <p className="text-sm text-stone-200 font-light">+91 80980 94101</p>
                    </div>

                    <div>
                        <h4 className="text-xs tracking-widest uppercase text-[#C5A880] font-semibold mb-3">
                            Studio Location
                        </h4>
                        <p className="text-sm text-stone-200 font-light leading-relaxed">
                            Plot no, 3617, TNHB Colony<br />
                            Madurai, Tamil Nadu 625001
                        </p>
                    </div>

                </div>

                <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs tracking-wider text-stone-400">
                    <p>© 2026 SharkingsInterior. All rights reserved.</p>
                    <div className="flex space-x-6 mt-3 sm:mt-0">
                        <a href="#" className="hover:text-[#C5A880] transition-colors font-light">Privacy Policy</a>
                        <a href="#" className="hover:text-[#C5A880] transition-colors font-light">Terms of Service</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
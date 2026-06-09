import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, Compass, ShieldCheck, Users } from 'lucide-react';
import Logo from '../assets/logo.png';

export default function LandingPage() {
    const [loading, setLoading] = useState(true);

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

            {/* --- RICH & MINIMALIST LOGO PRELOADER (From image_503624.png) --- */}
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
            <nav className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#C5A880]/10 px-6 lg:px-16 py-5 flex items-center justify-between">
                <div className="text-xl font-serif tracking-[0.2em] uppercase text-[#3E322A]">
                    SHARKINGS<span className="text-[#C5A880] font-light">INTERIOR</span>
                </div>
                <div className="hidden md:flex space-x-8 text-sm font-medium tracking-widest uppercase text-[#5A4B41]">
                    <a href="#about" className="hover:text-[#C5A880] transition-colors">About</a>
                    <a href="#services" className="hover:text-[#C5A880] transition-colors">Services</a>
                    <a href="#projects" className="hover:text-[#C5A880] transition-colors">Projects</a>
                    <a href="#why-us" className="hover:text-[#C5A880] transition-colors">Why Us</a>
                </div>
                <button className="border border-[#C5A880] text-[#3E322A] px-5 py-2 text-xs tracking-widest uppercase hover:bg-[#C5A880] hover:text-white transition-all duration-300">
                    Inquire Now
                </button>
            </nav>

            {/* --- HERO SECTION --- */}
            <header className="relative min-h-[90vh] flex items-center px-6 lg:px-16 overflow-hidden bg-white">
                <div className="max-w-xl z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] block mb-4"
                    >
                        Luxury Interior Architecture
                    </motion.span>

                    <div className="overflow-hidden mb-6">
                        <motion.h1
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 1, ease: [0.25, 1, 0.5, 1] }}
                            className="text-4xl md:text-6xl font-serif font-light text-[#3E322A] leading-tight"
                        >
                            Crafting Spaces of <span className="italic font-normal">Timeless</span> Elegance
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="text-[#5A4B41] text-base md:text-lg mb-8 font-light leading-relaxed"
                    >
                        We transform high-end residential and commercial environments into bespoke masterpieces, blending rich textures, functional luxury, and warm golden tones.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <a href="#projects" className="bg-[#3E322A] text-white px-8 py-4 text-xs tracking-widest uppercase text-center font-medium hover:bg-[#2A211B] transition-colors flex items-center justify-center gap-2 group">
                            Explore Portfolio
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>

                {/* Right Collage Area */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[80%] pr-16">
                    <div className="relative w-full h-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.4, delay: 1.1, ease: [0.25, 1, 0.5, 1] }}
                            className="absolute inset-y-0 left-12 right-0 bg-[#EFECE6] border border-[#C5A880]/20 overflow-hidden shadow-xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                                alt="Luxury living space"
                                className="w-full h-full object-cover grayscale-[10%] contrast-[105%]"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 1.6 }}
                            className="absolute bottom-12 -left-6 bg-white p-6 border-l-4 border-[#C5A880] shadow-lg max-w-[240px]"
                        >
                            <p className="font-serif text-2xl text-[#3E322A] mb-1">15+</p>
                            <p className="text-xs tracking-wider text-[#5A4B41] uppercase">Years of Architectural Excellence</p>
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
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                        <button className="mt-4 md:mt-0 group flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#3E322A] hover:text-[#C5A880] transition-colors">
                            View Entire Portfolio
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
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
                        <p className="text-sm text-stone-200 font-light mb-1 hover:text-[#C5A880] transition-colors cursor-pointer">
                            sharkingsindia@gmail.com
                        </p>
                        <p className="text-sm text-stone-200 font-light">+91 8098094101</p>
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
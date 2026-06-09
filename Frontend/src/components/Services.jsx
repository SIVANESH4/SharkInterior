import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES_DATA = [
    {
        id: 'turnkey-projects',
        title: 'Turnkey Projects',
        subtitle: 'Concept to Completion Management',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        description: 'Complete, end-to-end management of your space. We oversee architectural drafting, material sourcing, on-site execution, and premium finishing touches for a truly seamless design journey.'
    },
    {
        id: 'modular-kitchen',
        title: 'Modular Kitchen',
        subtitle: 'Culinary Architecture',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        description: 'High-performance culinary spaces blending luxury aesthetics with intelligent ergonomics. Featuring soft-close systems, premium finishes, and durable, moisture-resistant materials.'
    },
    {
        id: 'container-interior',
        title: 'Container Interior',
        subtitle: 'Avant-Garde Adaptation',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        description: 'Transforming shipping containers into high-end, bespoke architectural interiors with premium thermal insulation, custom premium paneling, and optimized space planning.'
    },
    {
        id: 'container-cafe',
        title: 'Container Cafe',
        subtitle: 'Commercial Hospitality Design',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
        description: 'Bespoke, compact restaurant and cafe environments engineered from structural containers. Optimized for workflow efficiency, unique brand presentation, and atmospheric customer seating.'
    },
    {
        id: 'container-homes',
        title: 'Container Homes',
        subtitle: 'Eco-Luxury Micro Living',
        image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
        description: 'Sustainable architectural residences crafted from modern structural shells. Designed with premium glazing, custom built-ins, and high-end materials for modern, minimalist comfort.'
    },
    {
        id: 'false-ceiling-work',
        title: 'False Ceiling Work',
        subtitle: 'Ambient Lighting & Linework',
        image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
        description: 'Architectural dropped ceilings incorporating clean shadow gaps, hidden LED profile fixtures, and geometric patterns to dramatically alter depth and scale.'
    },
    {
        id: 'wardrobe',
        title: 'Wardrobe',
        subtitle: 'Bespoke Storage Craftsmanship',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        description: 'Premium floor-to-ceiling storage units. Formulated with glass sliding fronts, integrated valet lighting, and custom configurations for elegant storage.'
    },
    {
        id: 'home-interior',
        title: 'Home Interior',
        subtitle: 'Residential Spaces',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        description: 'Comprehensive transformation of multi-generational residential structures into luxury spaces characterized by harmonious palettes, tailored textiles, and warm ivory tones.'
    },
    {
        id: 'acp-elevation',
        title: 'ACP Elevation',
        subtitle: 'Exterior Facade Architecture',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
        description: 'Modern exterior cladding using premium Aluminium Composite Panels. Protects your structure while creating an ultra-clean, high-end architectural impression from the street.'
    },
    {
        id: 'aluminium-partition',
        title: 'Aluminium Partition',
        subtitle: 'Sleek Spatial Demarcation',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        description: 'Sleek, slimline fluted glass and brushed metal frame partitions. Divides open layouts gracefully without compromising light transition or visual continuity.'
    },
    {
        id: 'conditioner-portable',
        title: 'Conditioner Portable',
        subtitle: 'Integrated Climate Integration',
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80',
        description: 'Concealing and seamlessly integrating high-efficiency climate control systems into custom luxury millwork and wall units so technology never disrupts design.'
    },
    {
        id: 'office-interior',
        title: 'Office Interior',
        subtitle: 'Executive Work Environments',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        description: 'Corporate suites and executive boardrooms built with acoustic isolation properties, ergonomic workflows, and sophisticated finishes that command authority.'
    },
    {
        id: 'salon-interior',
        title: 'Salon Interior',
        subtitle: 'Experiential Commercial Retail',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        description: 'Bespoke wellness and beauty environments. Structured around golden accent mirrors, warm plush seating, and flattering professional illumination curves.'
    }
];

export default function Services({ onBackHome }) {
    const [activeTab, setActiveTab] = useState(SERVICES_DATA[0]);
    const premiumEase = [0.25, 1, 0.5, 1];

    return (
        //  To this line:
        <div className="bg-[#FAF9F6] text-[#3E322A] font-sans antialiased h-auto lg:h-screen lg:max-h-screen py-6 px-6 lg:px-16 overflow-hidden flex flex-col justify-center">      <div className="max-w-7xl mx-auto">

            {/* --- RECONSTRUCTED HEADER AND NAVIGATION BLOCK --- */}
            <header className="mb-10 border-b border-[#C5A880]/10 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] block mb-1">
                        Our Expertise
                    </span>
                    <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wide">
                        Architectural Services
                    </h1>
                </div>

                {/* Pushed cleanly to the right side */}
                <div className="sm:pb-1">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#5A4B41] hover:text-[#C5A880] transition-colors duration-300"
                    >
                        Back To Home
                        <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300 stroke-[#C5A880]" />
                    </Link>
                </div>
            </header>

            {/* --- BALANCED STICKY SPLIT LAYOUT --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start relative">

                {/* MENU COLUMN */}
                <nav className="lg:col-span-5 space-y-1 border-l border-[#C5A880]/20 pl-4 order-2 lg:order-1">
                    {SERVICES_DATA.map((service) => {
                        const isActive = activeTab.id === service.id;
                        return (
                            <button
                                key={service.id}
                                onClick={() => setActiveTab(service)}
                                className="w-full text-left relative py-2.5 px-4 text-xs uppercase tracking-widest block transition-colors duration-300 group rounded-sm"
                            >
                                {/* Sliding Background Ribbon (Dark Espresso) */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeServiceTab"
                                        className="absolute inset-0 bg-[#3E322A] rounded-sm -z-10 shadow-md"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}

                                <div className="flex items-center justify-between z-10 relative">
                                    {/* TEXT COLOR LAYER: Fixed contrast hierarchy for light themes */}
                                    <span className={`font-medium tracking-widest transition-colors duration-300 ${isActive
                                        ? 'text-[#C5A880] font-semibold' // Crisp white text inside the dark brown active ribbon
                                        : 'text-[#3E322A]' // Clear dark brown normally, transitions to gold on hover
                                        }`}>
                                        {service.title}
                                    </span>

                                    {/* ICON LAYER: Dynamic gold/brown transformation */}
                                    <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-300 ${isActive
                                        ? 'text-[#C5A880] translate-x-0.5 -translate-y-0.5 opacity-100'
                                        : 'text-[#3E322A]/40 opacity-0 group-hover:opacity-100 '
                                        }`} />
                                </div>
                            </button>
                        );
                    })}
                </nav>

                {/* DISPLAY VIEWPORT (Sticky to top to eliminate trailing empty space) */}
                <div className="lg:col-span-7 order-1 lg:order-2 lg:sticky lg:top-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: premiumEase }}
                            className="flex flex-col bg-white border border-[#C5A880]/10 shadow-md overflow-hidden"
                        >
                            {/* Image Frame */}
                            <div className="relative overflow-hidden aspect-[21/9] w-full bg-[#FAF9F6] border-b border-[#C5A880]/10">
                                <motion.img
                                    initial={{ scale: 1.04 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.7, ease: premiumEase }}
                                    src={activeTab.image}
                                    alt={activeTab.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-[#3E322A]/85 backdrop-blur-md text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 flex items-center gap-1.5 rounded-sm border border-[#C5A880]/20">
                                    <Sparkles className="w-3 h-3 text-[#C5A880]" />
                                    Sharkings Studio
                                </div>
                            </div>

                            {/* Information Layout */}
                            <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                                <div>
                                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] block mb-2">
                                        {activeTab.subtitle}
                                    </span>
                                    <h2 className="text-2xl font-serif text-[#3E322A] mb-3 tracking-wide">
                                        {activeTab.title}
                                    </h2>
                                    <p className="text-sm text-[#5A4B41] font-light leading-relaxed mb-4">
                                        {activeTab.description}
                                    </p>
                                </div>

                                {/* Trust Verification */}
                                <div className="border-t border-[#C5A880]/10 pt-4 flex items-center gap-2.5 text-[11px] tracking-wider uppercase font-medium text-[#3E322A]/60">
                                    <Shield className="w-4 h-4 text-[#C5A880]" />
                                    <span>Certified Quality Assurance Guarantee</span>
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

        </div>
        </div>
    );
}
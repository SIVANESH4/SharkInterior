import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES_DATA = [
    {
        id: 'turnkey-projects',
        title: 'Turnkey Projects',
        subtitle: 'Concept to Completion Management',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=75',
        description: 'Complete, end-to-end management of your space. We oversee architectural drafting, material sourcing, on-site execution, and premium finishing touches for a truly seamless design journey.'
    },
    {
        id: 'modular-kitchen',
        title: 'Modular Kitchen',
        subtitle: 'Culinary Architecture',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=75',
        description: 'High-performance culinary spaces blending luxury aesthetics with intelligent ergonomics. Featuring soft-close systems, premium finishes, and durable, moisture-resistant materials.'
    },
    {
        id: 'container-interior',
        title: 'Container Interior',
        subtitle: 'Avant-Garde Adaptation',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=75',
        description: 'Transforming shipping containers into high-end, bespoke architectural interiors with premium thermal insulation, custom premium paneling, and optimized space planning.'
    },
    {
        id: 'container-cafe',
        title: 'Container Cafe',
        subtitle: 'Commercial Hospitality Design',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=75',
        description: 'Bespoke, compact restaurant and cafe environments engineered from structural containers. Optimized for workflow efficiency, unique brand presentation, and atmospheric customer seating.'
    },
    {
        id: 'container-homes',
        title: 'Container Homes',
        subtitle: 'Eco-Luxury Micro Living',
        image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=75',
        description: 'Sustainable architectural residences crafted from modern structural shells. Designed with premium glazing, custom built-ins, and high-end materials for modern, minimalist comfort.'
    },
    {
        id: 'false-ceiling-work',
        title: 'False Ceiling Work',
        subtitle: 'Ambient Lighting & Linework',
        image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=75',
        description: 'Architectural dropped ceilings incorporating clean shadow gaps, hidden LED profile fixtures, and geometric patterns to dramatically alter depth and scale.'
    },
    {
        id: 'wardrobe',
        title: 'Wardrobe',
        subtitle: 'Bespoke Storage Craftsmanship',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=75',
        description: 'Premium floor-to-ceiling storage units. Formulated with glass sliding fronts, integrated valet lighting, and custom configurations for elegant storage.'
    },
    {
        id: 'home-interior',
        title: 'Home Interior',
        subtitle: 'Residential Spaces',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=75',
        description: 'Comprehensive transformation of multi-generational residential structures into luxury spaces characterized by harmonious palettes, tailored textiles, and warm ivory tones.'
    },
    {
        id: 'acp-elevation',
        title: 'ACP Elevation',
        subtitle: 'Exterior Facade Architecture',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=75',
        description: 'Modern exterior cladding using premium Aluminium Composite Panels. Protects your structure while creating an ultra-clean, high-end architectural impression from the street.'
    },
    {
        id: 'aluminium-partition',
        title: 'Aluminium Partition',
        subtitle: 'Sleek Spatial Demarcation',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=75',
        description: 'Sleek, slimline fluted glass and brushed metal frame partitions. Divides open layouts gracefully without compromising light transition or visual continuity.'
    },
    {
        id: 'conditioner-portable',
        title: 'Conditioner Portable',
        subtitle: 'Integrated Climate Integration',
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=75',
        description: 'Concealing and seamlessly integrating high-efficiency climate control systems into custom luxury millwork and wall units so technology never disrupts design.'
    },
    {
        id: 'office-interior',
        title: 'Office Interior',
        subtitle: 'Executive Work Environments',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=75',
        description: 'Corporate suites and executive boardrooms built with acoustic isolation properties, ergonomic workflows, and sophisticated finishes that command authority.'
    },
    {
        id: 'salon-interior',
        title: 'Salon Interior',
        subtitle: 'Experiential Commercial Retail',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=75',
        description: 'Bespoke wellness and beauty environments. Structured around golden accent mirrors, warm plush seating, and flattering professional illumination curves.'
    }
];

export default function Services() {
    const [activeTab, setActiveTab] = useState(SERVICES_DATA[0]);
    const premiumEase = [0.25, 1, 0.5, 1];

    return (
        <div className="bg-[#FAF9F6] text-[#3E322A] font-sans antialiased min-h-screen h-auto pt-6 md:pt-8 pb-24 px-6 lg:px-16 overflow-x-hidden overflow-y-auto flex flex-col justify-start">
            <div className="max-w-7xl mx-auto w-full my-auto">

                {/* --- PREMIUM NAVIGATION LAYER --- */}
                <div className="mb-10">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#5A4B41] hover:text-[#C5A880] transition-colors duration-300 w-fit"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 stroke-[#C5A880]" />
                        Back To Home
                    </Link>
                </div>

                {/* --- HEADER BLOCK (Perfect match to your Projects layout style) --- */}
                <div className="mb-6 border-b border-[#C5A880]/10 pb-8">
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] block mb-3">
                        Our Expertise
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-light tracking-wide">
                        Architectural Services
                    </h1>
                    <p className="text-[#5A4B41] font-light max-w-xl mt-4 text-sm md:text-base leading-relaxed">
                        An immersive look into our structural engineering capabilities, high-performance interior blueprints, and bespoke modular creations across Madurai and Ramanathapuram.
                    </p>
                </div>

                {/* --- RESPONSIVE MOBILE ACCORDION (Hidden on Desktop) --- */}
                <div className="block lg:hidden space-y-2 w-full">
                    {SERVICES_DATA.map((service) => {
                        const isExpanded = activeTab.id === service.id;
                        return (
                            <div
                                key={service.id}
                                className="border border-[#C5A880]/15 bg-white overflow-hidden rounded-sm transition-all duration-300 shadow-sm"
                            >
                                <button
                                    onClick={() => setActiveTab(service)}
                                    className={`w-full flex items-center justify-between p-4 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${isExpanded ? 'bg-[#3E322A] text-[#C5A880]' : 'text-[#3E322A] hover:bg-[#FAF9F6]'
                                        }`}
                                >
                                    <span>{service.title}</span>
                                    <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#C5A880]' : 'text-[#3E322A]/40'
                                        }`} />
                                </button>

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: premiumEase }}
                                        >
                                            <div className="relative aspect-[21/9] w-full bg-[#FAF9F6] border-b border-[#C5A880]/10">
                                                <img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-3 left-3 bg-[#3E322A]/90 backdrop-blur-sm text-white text-[8px] tracking-[0.2em] uppercase px-2 py-1 flex items-center gap-1 border border-[#C5A880]/20 rounded-sm">
                                                    <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
                                                    Sharkings
                                                </div>
                                            </div>

                                            <div className="p-5 space-y-3">
                                                <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] block">
                                                    {service.subtitle}
                                                </span>
                                                <p className="text-xs text-[#5A4B41] font-light leading-relaxed">
                                                    {service.description}
                                                </p>
                                                <div className="border-t border-[#C5A880]/10 pt-3 flex items-center gap-2 text-[9px] tracking-wider uppercase font-medium text-[#3E322A]/60">
                                                    <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
                                                    <span>Quality Assurance Guarantee</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* --- BALANCED STICKY SPLIT LAYOUT (Hidden on Mobile) --- */}
                <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start relative w-full">

                    {/* MENU COLUMN */}
                    <nav className="lg:col-span-5 space-y-1 border-l border-[#C5A880]/20 pl-4">
                        {SERVICES_DATA.map((service) => {
                            const isActive = activeTab.id === service.id;
                            return (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveTab(service)}
                                    className="w-full text-left relative py-2.5 px-4 text-xs uppercase tracking-widest block transition-colors duration-300 group rounded-sm"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeServiceTab"
                                            className="absolute inset-0 bg-[#3E322A] rounded-sm -z-10 shadow-md"
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        />
                                    )}

                                    <div className="flex items-center justify-between z-10 relative">
                                        <span className={`font-medium tracking-widest transition-colors duration-300 ${isActive ? 'text-[#C5A880] font-semibold' : 'text-[#3E322A] group-hover:text-[#C5A880]'
                                            }`}>
                                            {service.title}
                                        </span>

                                        <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-300 ${isActive ? 'text-[#C5A880] translate-x-0.5 -translate-y-0.5 opacity-100' : 'text-[#3E322A]/40 opacity-0 group-hover:opacity-100'
                                            }`} />
                                    </div>
                                </button>
                            );
                        })}
                    </nav>

                    {/* DISPLAY VIEWPORT */}
                    <div className="lg:col-span-7 lg:sticky lg:top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4, ease: premiumEase }}
                                className="flex flex-col bg-white border border-[#C5A880]/10 shadow-md overflow-hidden rounded-sm"
                            >
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
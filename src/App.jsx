import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { ModelCanvas, StarsCanvas } from "./components/CanvasComponents";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const App = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <ParallaxProvider>
      <main ref={containerRef} className="relative w-full bg-black overflow-x-hidden">
        <div className="fixed inset-0 z-0">
          <StarsCanvas />
        </div>

        <ModelCanvas />
        
        <Navbar />
        
        {/* Hero Section */}
        <motion.section
          id="hero"
          className="relative z-10"
          style={{
            scale: useTransform(scrollYProgress, [0, 0.2], [1, 0.95]),
            opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0.5])
          }}
        >
          <Hero />
        </motion.section>

        {/* Services Section */}
        <section id="services" className="relative z-10 min-h-screen flex items-center py-20">
          <Parallax translateY={[20, -20]} className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
              >
                Our Services & Solutions
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceCard
                  title="Cloud Solutions"
                  description="Scalable cloud infrastructure and migration services to power your digital transformation."
                  icon="☁️"
                  delay={0}
                />
                <ServiceCard
                  title="SaaS Products"
                  description="Custom-built software solutions delivered as a service for maximum flexibility."
                  icon="🚀"
                  delay={0.2}
                />
                <ServiceCard
                  title="IT Consulting"
                  description="Expert guidance on technology strategy, architecture, and implementation."
                  icon="💡"
                  delay={0.4}
                />
              </div>
            </div>
          </Parallax>
        </section>

        {/* About Section */}
        <section id="about" className="relative z-10 min-h-screen flex items-center py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 pointer-events-none"></div>
          <Parallax translateY={[30, -30]} className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Why Choose Intelion?
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    With over 15 years of experience in delivering cutting-edge IT solutions,
                    we've helped hundreds of businesses achieve their digital transformation goals.
                    Our team of experts combines technical excellence with business acumen to
                    deliver solutions that drive real value.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-lg transition-all transform-gpu hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Learn More
                  </motion.button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative h-[400px]"
                >
                  {/* Model is now handled by ModelCanvas */}
                </motion.div>
              </div>
            </div>
          </Parallax>
        </section>
      </main>
    </ParallaxProvider>
  );
};

const ServiceCard = ({ title, description, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, rotateY: 5, translateZ: 20 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all transform-gpu hover:shadow-xl hover:shadow-blue-500/10"
  >
    <motion.div 
      className="text-4xl mb-4"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
    </motion.div>
    <motion.h3 
      className="text-xl font-bold text-white mb-4"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      {title}
    </motion.h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default App;








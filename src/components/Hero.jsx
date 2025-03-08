import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Parallax } from "react-scroll-parallax";

const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <div ref={targetRef} className="relative flex flex-col min-h-screen w-full overflow-hidden overflow-x-hidden">
      {/* Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity, scale, rotateX }}
        className="relative flex flex-col items-center justify-start h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center perspective-1000 pt-24 sm:pt-32"
      >
        <div className="flex flex-col gap-8 sm:gap-12">
          <div className="relative">
            <Parallax translateY={[-5, 5]} className="w-full">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-white transform-gpu drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                Transforming Business
                <motion.span 
                  className="text-blue-500 block sm:inline-block relative mt-2 sm:mt-0 sm:ml-2"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.2 }}
                > Through Technology
                  <div className="absolute inset-0 blur-sm bg-blue-500/20 -z-10"></div>
                </motion.span>
              </motion.h1>
            </Parallax>
          </div>
          
          <div className="relative">
            <Parallax translateY={[-2, 2]} className="w-full">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto transform-gpu backdrop-blur-sm bg-white/5 p-4 sm:p-6 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                Empowering enterprises with cutting-edge SaaS solutions and comprehensive IT services for the digital age.
              </motion.p>
            </Parallax>
          </div>
          
          <div className="relative">
            <Parallax translateY={[0, 2]} className="w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center transform-gpu"
              >
                <motion.button
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-base sm:text-lg transition-all transform-gpu hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] relative group overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <span className="relative z-10">Explore Solutions</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/50 text-white hover:bg-white hover:text-black rounded-full font-medium text-base sm:text-lg transition-all transform-gpu hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:border-white relative group overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <span className="relative z-10">Schedule Demo</span>
                </motion.button>
              </motion.div>
            </Parallax>
          </div>
        </div>

        {/* Stats */}
        <div className="relative w-full mt-12 sm:mt-16">
          <Parallax translateY={[5, -5]} className="w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto px-4 transform-gpu"
            >
              <StatItem number="500+" text="Clients Worldwide" delay={0} />
              <StatItem number="98%" text="Client Satisfaction" delay={0.1} />
              <StatItem number="24/7" text="Support Available" delay={0.2} />
              <StatItem number="15+" text="Years Experience" delay={0.3} />
            </motion.div>
          </Parallax>
        </div>
      </motion.div>
    </div>
  );
};

const StatItem = ({ number, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, rotateY: 5 }}
    className="text-center transform-gpu hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] rounded-lg p-3 sm:p-4 backdrop-blur-sm bg-white/5 relative group overflow-hidden"
  >
    <div className="absolute inset-0 bg-blue-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
    <motion.div 
      className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500 mb-1 relative"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {number}
      <div className="absolute inset-0 blur-sm bg-blue-500/20 -z-10"></div>
    </motion.div>
    <div className="text-xs sm:text-sm text-gray-300 relative">{text}</div>
  </motion.div>
);

export default Hero;

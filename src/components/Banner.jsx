import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import bannerImg from "../../public/images/banner.png";

function Banner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <section className="relative min-h-[450px] md:min-h-[600px] flex items-center overflow-hidden py-10 md:py-16 bg-[#0a0500] font-sans">
      {/* Background Image Layer with elite zoom and HDR sharpening */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundPosition: "right 5% center",
          filter: "brightness(0.95) contrast(1.1) saturate(1.05)",
        }}
      />

      {/* Deep Cinematic Backdrop - Responsive Blending (No White) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 75% 30%, rgba(255, 180, 50, 0.15) 0%, transparent 60%), linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(45, 25, 10, 0.5) 45%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left Content - Responsive & Single-View Optimized */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="md:col-span-8 lg:col-span-6 flex flex-col items-start"
          >
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-amber-400 font-bold text-xs md:text-sm uppercase tracking-widest mb-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30"
            >
              ✨ HEALTHY SNACKING STARTS WITH SamadStore
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl font-sans">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                Taste the
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block text-amber-400"
              >
                Power
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="block"
              >
                of <span className="text-orange-500">Health.</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-100 text-base md:text-xl mb-8 md:mb-10 leading-relaxed max-w-xl font-medium drop-shadow-md font-sans"
            >
              Premium Roasted Chana with premium packaging – tasty, crunchy &
              100% natural.
              <br className="hidden md:block" />
              <span className="font-bold text-amber-400">
                SamadStore – Health Everyday. 🌾
              </span>
            </motion.p>

            <div className="flex flex-wrap gap-4 mb-10">
              <motion.a
                href="#products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold px-8 md:px-10 py-3 md:py-4 rounded-full shadow-2xl text-base md:text-lg transition-all"
              >
                <span>Shop Now</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>

              <motion.a
                href="#products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-white/20 text-base md:text-lg"
              >
                <span>Learn More .</span>
              </motion.a>
            </div>

            {/* Trust Badges - Optimized for Single View */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-x-8 gap-y-4 text-xs md:text-sm text-gray-100 font-bold font-sans"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-lg">✓</span>
                <span>100% Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-lg">✓</span>
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-lg">✓</span>
                <span>Premium Tier</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Focal Point Spacer */}
          <div className="md:col-span-4 lg:col-span-6 h-full pointer-events-none" />
        </div>
      </div>

      {/* Fine Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {particles.slice(0, 12).map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/10 blur-xl"
            style={{
              width: p.size / 2,
              height: p.size / 2,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.2, 0] }}
            transition={{
              duration: p.duration + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;

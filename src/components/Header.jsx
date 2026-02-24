import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "../../public/images/logo.png";

function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  const announcements = [
    { text: "Free Delivery in Karachi on Orders Over Rs 2000", icon: "🚚" },
    {
      text: "Currently Serving Karachi Only - More Cities Coming Soon!",
      icon: "📍",
    },
    { text: "100% Fresh & Premium Quality Guaranteed", icon: "💯" },
    { text: "Special Discount: 10% OFF on All Products", icon: "🔥" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Announcement Bar with Animation */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-center py-3 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnnouncement}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 font-semibold text-xs md:text-base flex items-center justify-center gap-2"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {announcements[currentAnnouncement].icon}
            </motion.span>
            <span>{announcements[currentAnnouncement].text}</span>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 flex gap-1">
          {announcements.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentAnnouncement ? "w-6 bg-white" : "w-1 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <span className="text-3xl md:text-4xl border-none">
                  <img
                    src={logo}
                    alt="SamadStore Logo"
                    className="h-10 w-50 md:h-10 md:w-55"
                  />
                </span>
              </motion.div>
            </Link>

            <nav className="flex items-center gap-4 md:gap-8">
              <Link to="/">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="text-sm md:text-base font-medium text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Home
                </motion.span>
              </Link>
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="text-sm md:text-base font-medium text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Contact
                </motion.span>
              </Link>
              <Link to="/checkout">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 md:h-8 md:w-8 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>
    </>
  );
}

export default Header;

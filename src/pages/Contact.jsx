import { motion } from "framer-motion";
import logo from "../../public/images/logo.png";
import bgImg from "../../public/images/bgImg.jpeg";

function Contact() {
  return (
    <div
        className="min-h-[calc(100vh-200px)] relative"
        style={{
          backgroundImage:
            `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-amber-400">
            Get in Touch
          </h1>

          <div className="card bg-white/95 backdrop-blur-sm p-8 md:p-12">
            <div className="text-gray-800">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="text-6xl mb-6 flex items-center justify-center">
                  <img
                    src={logo}
                    alt="SamadStore Logo"
                    className="h-10 w-50 md:h-10 md:w-55"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                  About Samad Store
                </h2>
                <p className="text-lg leading-relaxed mb-6 font-light">
                  Samad Store brings you pure, crunchy, and nutritious Roasted
                  Chana, sealed in modern, air-tight premium packaging! This
                  500g pouch is not only delicious but also a perfect choice for
                  a healthy lifestyle.
                </p>
                <p className="text-lg leading-relaxed text-gray-600 font-light">
                  Each batch of our roasted chana is carefully selected,
                  processed, and packaged to ensure you receive only the best
                  quality products.{" "}
                  <strong>Samad Store – Health Everyday.</strong>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="border-t pt-8"
              >
                <h3 className="text-2xl font-display font-bold text-chana-brown mb-6">
                  Contact Information
                </h3>

           <motion.a
                href="https://wa.me/923072608734"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <span className="bg-white/20 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                  </svg>
                </span>

                <span>Chat on WhatsApp</span>
              </motion.a>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 p-4 bg-chana-beige rounded-lg"
                >
                  <p className="text-xs text-gray-700 ">
                Our team will respond as soon as possible.
              </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImg from "../../public/images/bgImg.jpeg";

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "You can easily place your order through WhatsApp. Simply send us the product name, quantity, and your delivery area in Karachi, and our team will guide you further.",
  },
  {
    question: "Do you deliver all over Karachi?",
    answer:
      "Delivery usually takes 1–3 working days depending on your location in Karachi.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Yes, we offer delivery services across selected cities. Delivery charges may apply.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept advance payments via sadapay. After payment, send the screenshot on WhatsApp for confirmation.",
  },
  {
    question: "Can I order in bulk?",
    answer:
      "Yes, we accept bulk orders. Contact us on WhatsApp for special pricing and details.",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="min-h-[calc(100vh-200px)] relative"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-white text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-amber-400">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-300 mb-10">
            Everything you need to know about orders, delivery, and payments.
          </p>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-10 text-left shadow-2xl">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="border-b last:border-none"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center py-5 text-left group"
                  >
                    <span className="text-lg font-semibold text-gray-900 group-hover:text-amber-500 transition">
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl text-amber-500 font-light"
                    >
                      +
                    </motion.span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* ✅ WhatsApp CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 pt-8 text-center"
            >
              <p className="text-gray-700 mb-6 font-medium">
                👉 Still have questions? Contact us on WhatsApp for quick
                support.
              </p>

              {/* Main CTA Button */}
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

              {/* Small helper text */}
              <p className="text-xs text-gray-500 mt-4">
                Our team will respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FAQ;

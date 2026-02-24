import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import Banner from '../components/Banner'
import ProductCard from '../components/ProductCard'
import trustestImg from '../../public/images/trusted.jpeg'

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    
    let startTime
    let animationFrame

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = (currentTime - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const { scrollYProgress } = useScroll()
  const yPosAnim = useTransform(scrollYProgress, [0, 1], [0, -50])

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading products:', err)
        setLoading(false)
      })
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Fatima Khan",
      location: "Gulshan-e-Iqbal, Karachi",
      text: "Best roasted chana I've ever tasted! Fresh, crunchy, and perfectly seasoned. My whole family loves it!",
      rating: 5,
      avatar: "👩"
    },
    {
      name: "Ahmed Ali",
      location: "Clifton, Karachi",
      text: "Amazing quality! The packaging keeps it fresh and the taste is incredible. Delivery was super fast too!",
      rating: 5,
      avatar: "👨"
    },
    {
      name: "Ayesha Malik",
      location: "DHA, Karachi",
      text: "Perfect healthy snack for my kids. Great prices and same-day delivery in Karachi. Will order again!",
      rating: 5,
      avatar: "👩‍🦰"
    }
  ]

  return (
    <div className='overflow-x-hidden'>
      <Banner />
      
      {/* Products Section */}
      <section id="products" className="container mx-auto px-4 py-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            New Arrivals
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Discover our premium selection of roasted chana, each variety carefully selected and roasted to perfection.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Trust & Quality Section */}
      <section className="bg-gradient-to-br from-gray-50 to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-10">
                <img
                  src={trustestImg}
                  alt="Premium Packaging"
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Trusted Quality. <br />
                Sealed Freshness. <br />
                <span className="text-amber-600">Only at SamadStore.</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                A new revolution. A new perspective.
              </p>
              <p className="text-xl font-semibold text-gray-800 mb-8">
                Premium Roasted Chana by SamadStore – Health Everyday.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Premium Quality</h4>
                    <p className="text-gray-600 text-sm">100% pure quality – preserved in our premium packaging</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sealed Freshness</h4>
                    <p className="text-gray-600 text-sm">Air-tight packaging ensures freshness and crunchiness</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Natural Energy Snack</h4>
                    <p className="text-gray-600 text-sm">Packed with fiber & protein for a healthy lifestyle</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Animations */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "🥜", title: "Premium Quality", desc: "Handpicked and carefully roasted for the best taste", delay: 0.1, color: "from-amber-500 to-orange-500" },
              { icon: "🚚", title: "Fast Delivery in Karachi", desc: "Free delivery on orders above Rs 2000 in Karachi", delay: 0.2, color: "from-blue-500 to-cyan-500" },
              { icon: "💯", title: "100% Fresh", desc: "Always fresh from our roasting facility", delay: 0.3, color: "from-green-500 to-emerald-500" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl mb-6 filter drop-shadow-lg"
                >
                  {feature.icon}
                </motion.div>
                <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { end: 5000, suffix: "+", label: "Happy Customers" },
              { end: 50000, suffix: "+", label: "Orders Delivered" },
              { end: 100, suffix: "%", label: "Satisfaction Rate" },
              { end: 24, suffix: "/7", label: "Customer Support" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base font-medium opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Carousel */}
      <section className="bg-gradient-to-br from-gray-50 to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-amber-600">Karachi Customers</span> Say
            </h2>
            <p className="text-gray-600 text-lg">Trusted by thousands of happy customers across Karachi</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <div className="flex items-center gap-2 mb-6 justify-center">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-3xl"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
              
              <p className="text-gray-700 text-xl md:text-2xl italic mb-8 text-center">
                "{testimonials[activeTestimonial].text}"
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <div className="text-5xl">{testimonials[activeTestimonial].avatar}</div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-xl">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-amber-600 font-medium">
                    {testimonials[activeTestimonial].location}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial 
                      ? 'w-12 bg-gradient-to-r from-amber-500 to-orange-500' 
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-amber-600">SamadStore?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🌾", title: "100% Natural", desc: "No artificial colors or preservatives" },
              { icon: "🔥", title: "Freshly Roasted", desc: "Roasted daily in small batches" },
              { icon: "📦", title: "Premium Packaging", desc: "Air-tight seal to lock freshness" },
              { icon: "🚀", title: "Fast Delivery in Karachi", desc: "Delivered within 2-3 days in Karachi" },
              { icon: "💵", title: "Cash on Delivery", desc: "Pay when you receive your order" },
              { icon: "🎯", title: "Quality Assured", desc: "Every batch tested for quality" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-amber-50 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl"
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

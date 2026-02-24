import { motion } from 'framer-motion'

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-100 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400">SamadStore</h3>
            <p className="text-sm text-gray-300">
              Premium Roasted Chana with premium packaging – tasty, crunchy & 100% natural.
            </p>
            <p className="text-sm font-semibold text-amber-400 mt-2">
              SamadStore – Health Everyday. One Bite at a Time.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="/#products" className="hover:text-amber-400 transition-colors">Products</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-amber-400 transition-colors">Contact</a>
              </li>
              <li>
                <a href="/checkout" className="hover:text-amber-400 transition-colors">Checkout</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +92 312 8796934
              </p>
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +92 346 0928846
              </p>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} SamadStore. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer


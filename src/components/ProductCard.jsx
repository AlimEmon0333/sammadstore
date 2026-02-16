import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [selectedWeight, setSelectedWeight] = useState('1kg')
  const [showToast, setShowToast] = useState(false)

  const price = selectedWeight === '1kg' ? product.pricePerKg : product.halfKgPrice
  const discountedPrice = Math.round(price - (price * product.discount / 100))

  const handleAddToCart = () => {
    addToCart(product, selectedWeight)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -8 }}
        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
      >
        {/* Image Container */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          <motion.img
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.4 }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
            >
              -{product.discount}% OFF
            </motion.div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Product Name */}
          <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem] group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-500 text-xs mb-3 line-clamp-1">
            {product.description}
          </p>

          {/* Weight Selection */}
          <div className="flex gap-2 mb-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedWeight('1kg')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                selectedWeight === '1kg'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1 KG
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedWeight('0.5kg')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                selectedWeight === '0.5kg'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ½ KG
            </motion.button>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-3 bg-gradient-to-r from-amber-50 to-orange-50 p-2 rounded-lg">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-amber-600">
                Rs {Math.round(discountedPrice)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                Rs {Math.round(price)}
              </span>
            </div>
            <div className="text-green-600 text-[10px] font-semibold bg-green-50 px-1.5 py-0.5 rounded">
              Save {product.discount}%
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to Cart
          </motion.button>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Added to cart successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProductCard

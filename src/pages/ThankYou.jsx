import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

function ThankYou() {
  const navigate = useNavigate()
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-chana-brown mb-4">
          Thank You for Your Order!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Your order has been successfully placed. We'll contact you shortly on WhatsApp to confirm your order details.
        </p>

        <div className="card p-8 mb-8 bg-gradient-to-br from-chana-beige to-white">
          <h2 className="text-2xl font-display font-bold text-chana-brown mb-4">
            What's Next?
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="font-bold text-chana-brown">WhatsApp Confirmation</h3>
                <p className="text-gray-600">We'll message you on WhatsApp to confirm your order</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">📦</div>
              <div>
                <h3 className="font-bold text-chana-brown">Processing</h3>
                <p className="text-gray-600">Your order will be carefully prepared</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">🚚</div>
              <div>
                <h3 className="font-bold text-chana-brown">Delivery</h3>
                <p className="text-gray-600">Fast delivery right to your doorstep</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Continue Shopping
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="btn-secondary"
          >
            Contact Us
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default ThankYou


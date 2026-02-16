import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

function Checkout() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Karachi',
    address: '',
    email: ''
  })

  const subtotal = getCartTotal()
  const discount = subtotal * 0.1
  const delivery = 150
  const grandTotal = subtotal - discount + delivery

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    // Create WhatsApp message
    let message = `🧾 *New Order Received!*\n\n`
    message += `👤 Name: ${formData.name}\n`
    message += `📞 Phone: ${formData.phone}\n`
    message += `📍 City: ${formData.city}\n`
    message += `🏠 Address: ${formData.address}\n`
    message += `✉️ Email: ${formData.email || 'Not provided'}\n\n`
    message += `🛍️ *Products:*\n`
    
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity
      const itemDiscount = itemTotal * 0.1
      const itemFinal = itemTotal - itemDiscount
      message += `${index + 1}. ${item.name} (${item.weightType})\n`
      message += `   Qty: ${item.quantity} × Rs ${item.price} = Rs ${itemTotal}\n`
      message += `   After 10% off: Rs ${itemFinal.toFixed(0)}\n\n`
    })
    
    message += `💸 *Subtotal:* Rs ${subtotal}\n`
    message += `🎁 *Discount (10%):* -Rs ${discount.toFixed(0)}\n`
    message += `🚚 *Delivery:* Rs ${delivery}\n`
    message += `🧮 *Grand Total:* Rs ${grandTotal.toFixed(0)}\n\n`
    message += `Thank you for your order! 🙏`

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/923128796934?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    // Navigate to thank you page
    setTimeout(() => {
      navigate('/thankyou')
    }, 500)
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-chana-brown mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious roasted chana to get started!</p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-block"
          >
            Continue Shopping
          </motion.a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-display font-bold text-chana-brown mb-8 text-center"
      >
        Checkout
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card p-6">
            <h2 className="text-2xl font-display font-bold mb-6 text-chana-brown">Your Cart</h2>
            
            <div className="space-y-4">
              {cart.map((item) => {
                const itemTotal = item.price * item.quantity
                const itemDiscount = itemTotal * 0.1
                const itemFinal = itemTotal - itemDiscount
                
                return (
                  <div key={`${item.id}-${item.weightType}`} className="flex gap-4 border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://www.bombaydryfruits.com/images/product_gallery/313.webp'
                      }}
                    />
                    
                    <div className="flex-grow">
                      <h3 className="font-bold text-chana-brown">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.weightType}</p>
                      <p className="text-sm font-semibold text-green-600">
                        Rs {itemFinal.toFixed(0)} <span className="text-gray-400 line-through">Rs {itemTotal}</span>
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.weightType, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full font-bold"
                        >
                          -
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.weightType, item.quantity + 1)}
                          className="bg-chana-gold hover:bg-yellow-600 text-white w-8 h-8 rounded-full font-bold"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.weightType)}
                          className="ml-auto text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">Rs {subtotal}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount (10%):</span>
                <span className="font-semibold">-Rs {discount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="font-semibold">Rs {delivery}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-chana-brown border-t pt-2">
                <span>Grand Total:</span>
                <span>Rs {grandTotal.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customer Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card p-6">
            <h2 className="text-2xl font-display font-bold mb-6 text-chana-brown">Customer Details</h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chana-gold"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chana-gold"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">City *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chana-gold bg-white"
                >
                  <option value="Karachi">📍 Karachi</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Currently serving Karachi only</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chana-gold"
                  placeholder="Enter your complete address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chana-gold"
                  placeholder="Enter your email (optional)"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary w-full text-lg py-3"
              >
                Place Order via WhatsApp
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import CheckoutSteps from '../components/CheckoutSteps'

function Checkout() {
  const navigate = useNavigate()
  const { cart, getCartTotal } = useCart()

  const [loading, setLoading] = useState(false)

  // ✅ NEW: payment method state
  const [paymentMethod, setPaymentMethod] = useState('cod')

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

    setLoading(true)

    let message = `🧾 *New Order Received*\n\n`

    message += `👤 Name: ${formData.name}\n`
    message += `📞 Phone: ${formData.phone}\n`
    message += `📍 City: ${formData.city}\n`
    message += `🏠 Address: ${formData.address}\n`
    message += `✉️ Email: ${formData.email || 'Not provided'}\n\n`

    // ✅ PAYMENT METHOD ADDED
    message += `💳 *Payment Method:* ${
      paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : 'Online Payment (JazzCash / EasyPaisa / SadaPay)'
    }\n\n`

    message += `🛍️ *Products:*\n`

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} (${item.weightType}) x ${item.quantity}\n`
    })

    message += `\n💰 *Subtotal:* Rs ${subtotal}`
    message += `\n🎁 *Discount:* -Rs ${discount.toFixed(0)}`
    message += `\n🚚 *Delivery:* Rs ${delivery}`
    message += `\n🧮 *Total:* Rs ${grandTotal.toFixed(0)}`

    const whatsappUrl = `https://wa.me/923128796934?text=${encodeURIComponent(message)}`

    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
      navigate('/thankyou')
    }, 1000)
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn-primary mt-4">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">

      {/* STEP INDICATOR */}
      <CheckoutSteps />

      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Checkout
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT - CUSTOMER DETAILS */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-6">👤 Customer Details</h2>

          <form onSubmit={handlePlaceOrder} className="space-y-4">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name *"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="Karachi">Karachi</option>
            </select>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Delivery Address *"
              required
              rows="3"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email (optional)"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-lg transition"
            >
              {loading ? 'Placing Order...' : 'Place Order via WhatsApp'}
            </button>

          </form>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-6">🛍️ Order Summary</h2>

          {/* PRODUCTS */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">

            {cart.map((item, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × Rs {item.price}
                  </p>
                </div>

                <div className="font-semibold">
                  Rs {item.price * item.quantity}
                </div>
              </div>
            ))}

          </div>

          {/* 💳 PAYMENT METHOD (NEW) */}
          <div className="mt-6 border-t pt-4">

            <h3 className="text-lg font-bold mb-3">💳 Payment Method</h3>

            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              Cash on Delivery (COD)
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === 'digital'}
                onChange={() => setPaymentMethod('digital')}
              />
              JazzCash / EasyPaisa / SadaPay
            </label>

            {paymentMethod === 'digital' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-3 bg-gray-100 rounded-lg text-sm"
              >
                <p className="font-semibold">📌 Payment Details:</p>
                <p>📱 JazzCash: 03XX-XXXXXXX</p>
                <p>📱 EasyPaisa: 03XX-XXXXXXX</p>
                <p>📱 SadaPay: yourname@sadapay</p>

                <p className="text-red-500 font-semibold mt-2">
                  ⚠️ Send screenshot after payment on WhatsApp
                </p>
              </motion.div>
            )}

          </div>

          {/* TOTALS */}
          <div className="mt-6 space-y-2">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs {subtotal}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span>- Rs {discount.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>Rs {delivery}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>Rs {grandTotal.toFixed(0)}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Checkout
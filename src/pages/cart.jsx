import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

function Cart() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()

  const subtotal = getCartTotal()
  const discount = subtotal * 0.1
  const delivery = 150
  const grandTotal = subtotal - discount + delivery

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-7xl mb-4">🛒</div>

          <h2 className="text-3xl font-bold text-chana-brown mb-2">
            Your Cart is Empty
          </h2>

          <p className="text-gray-600 mb-6">
            Add some delicious roasted chana to continue shopping
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-chana-brown mb-10"
      >
        Your Cart
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT - CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">

          {cart.map((item) => {
            const itemTotal = item.price * item.quantity
            const itemDiscount = itemTotal * 0.1
            const itemFinal = itemTotal - itemDiscount

            return (
              <motion.div
                key={`${item.id}-${item.weightType}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center"
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src =
                      'https://www.bombaydryfruits.com/images/product_gallery/313.webp'
                  }}
                />

                {/* DETAILS */}
                <div className="flex-1">

                  <h3 className="font-bold text-chana-brown text-lg">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.weightType}
                  </p>

                  <div className="mt-1">
                    <span className="text-green-600 font-semibold">
                      Rs {itemFinal.toFixed(0)}
                    </span>
                    <span className="text-gray-400 line-through ml-2 text-sm">
                      Rs {itemTotal}
                    </span>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.weightType,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold"
                    >
                      -
                    </button>

                    <span className="font-semibold w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.weightType,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 rounded-full bg-chana-gold text-white hover:bg-yellow-600 font-bold"
                    >
                      +
                    </button>

                    {/* REMOVE */}
                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.weightType)
                      }
                      className="ml-auto text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>

                  </div>
                </div>

              </motion.div>
            )
          })}

        </div>

        {/* RIGHT - SUMMARY CARD */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-10">

          <h2 className="text-2xl font-bold text-chana-brown mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-700">

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

            <hr />

            <div className="flex justify-between text-xl font-bold text-chana-brown">
              <span>Total</span>
              <span>Rs {grandTotal.toFixed(0)}</span>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-6 space-y-3">

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full"
            >
              Proceed to Checkout
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/')}
              className="w-full border border-chana-brown text-chana-brown py-2 rounded-lg"
            >
              Continue Shopping
            </motion.button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Cart
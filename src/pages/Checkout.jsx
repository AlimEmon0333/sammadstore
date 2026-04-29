import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Karachi",
    address: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = getCartTotal();
  const discount = subtotal * 0.1;
  const delivery = subtotal >= 2000 ? 0 : 150;
  const grandTotal = subtotal - discount + delivery;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const items = cart.map((item) => ({
      id: item.id,
      name: item.name,
      weightType: item.weightType,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));

    const subtotal = getCartTotal();
    const discount = subtotal * 0.1;
    const delivery = subtotal >= 2000 ? 0 : 150;
    const grandTotal = subtotal - discount + delivery;

    if (window.fbq) {
      window.fbq("track", "Purchase", {
        value: grandTotal,
        currency: "PKR",
        contents: items.map((i) => ({
          id: i.id,
          quantity: i.quantity,
          item_price: i.price,
        })),
        content_type: "product",
        num_items: items.length,
      });
    }

    let message = `🧾 *New Order Received!*\n\n`;
    message += `👤 Name: ${formData.name}\n`;
    message += `📞 Phone: ${formData.phone}\n`;
    message += `📍 City: ${formData.city}\n`;
    message += `🏠 Address: ${formData.address}\n`;
    message += `✉️ Email: ${formData.email || "Not provided"}\n\n`;

    message += `🛍️ *Products:*\n`;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      const itemFinal = itemTotal - itemTotal * 0.1;

      message += `${index + 1}. ${item.name} (${item.weightType})\n`;
      message += `   Qty: ${item.quantity} × Rs ${item.price} = Rs ${itemTotal}\n`;
      message += `   After 10% off: Rs ${itemFinal.toFixed(0)}\n\n`;
    });

    message += `💸 *Subtotal:* Rs ${subtotal}\n`;
    message += `🎁 *Discount:* -Rs ${discount.toFixed(0)}\n`;
    message += `🚚 *Delivery:* ${delivery === 0 ? "Free" : `Rs ${delivery}`}\n`;
    message += `🧮 *Grand Total:* Rs ${grandTotal.toFixed(0)}\n\n`;
    message += `Thank you for your order 🙏`;

    const whatsappUrl = `https://wa.me/923072608734?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      navigate("/thankyou");
    }, 500);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-chana-brown mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some delicious roasted chana to get started!
          </p>
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
    );
  }
  useEffect(() => {
    fbq("track", "InitiateCheckout");
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-chana-brown mb-10 text-center"
      >
        Checkout
      </motion.h1>

      <form
        onSubmit={handlePlaceOrder}
        className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start"
      >
        {/* Right column: one grid cell + flex stack = no stretched row gap between Payment & Cart */}
        <div className="order-1 flex min-w-0 flex-col gap-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {/* Mobile: cart first — Deskinset-block-start: cart below payment */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="order-1 min-w-0 lg:order-2"
          >
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-chana-brown mb-6">
                Your Cart
              </h2>

              <div className="space-y-4">
                {cart.map((item) => {
                  const itemTotal = item.price * item.quantity;
                  const itemDiscount = itemTotal * 0.1;
                  const itemFinal = itemTotal - itemDiscount;

                  return (
                    <div
                      key={`${item.id}-${item.weightType}`}
                      className="flex gap-4 border-b pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shrink-0"
                        onError={(e) => {
                          e.target.src =
                            "https://www.bombaydryfruits.com/images/product_gallery/313.webp";
                        }}
                      />

                      <div className="flex-grow min-w-0">
                        <h3 className="font-bold text-chana-brown">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.weightType}
                        </p>
                        <p className="text-sm font-semibold text-green-600">
                          Rs {itemFinal.toFixed(0)}{" "}
                          <span className="text-gray-400 line-through">
                            Rs {itemTotal}
                          </span>
                        </p>

                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.weightType,
                                item.quantity - 1,
                              )
                            }
                            className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full font-bold"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.weightType,
                                item.quantity + 1,
                              )
                            }
                            className="bg-chana-gold hover:bg-yellow-600 text-white w-8 h-8 rounded-full font-bold"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.id, item.weightType)
                            }
                            className="ml-auto text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-2 text-lg">
                <div className="flex justify-between gap-2">
                  <span>Subtotal:</span>
                  <span className="font-semibold tabular-nums">
                    Rs {subtotal}
                  </span>
                </div>
                <div className="flex justify-between gap-2 text-green-600">
                  <span>Discount (10%):</span>
                  <span className="font-semibold tabular-nums">
                    -Rs {discount.toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Delivery Charges:</span>
                  <span className="font-semibold tabular-nums">
                    {delivery === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <>Rs {delivery}</>
                    )}
                  </span>
                </div>
                <div className="flex justify-between gap-2 text-2xl font-bold text-chana-brown border-t pt-2">
                  <span>Grand Total:</span>
                  <span className="tabular-nums">
                    Rs {grandTotal.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile: payment second — Desktop: payment on top */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="order-2 min-w-0 lg:order-1"
          >
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-chana-brown mb-6">
                Payment Method
              </h2>

              <label className="flex items-center gap-2 mb-2 cursor-pointer text-sm text-gray-800">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-chana-gold shrink-0"
                />
                Cash on Delivery (COD)
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "digital"}
                  onChange={() => setPaymentMethod("digital")}
                  className="accent-chana-gold shrink-0"
                />
                Bank transfer
              </label>

              {paymentMethod === "digital" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                >
                  <p className="text-sm font-semibold text-chana-brown">
                    Payment details
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-gray-700 list-none">
                    <li>SadaPay: 03128796934 Abdul Samad</li>
                  </ul>
                  <p className="text-red-600 text-sm font-semibold mt-3">
                    Send screenshot after payment on WhatsApp
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Mobile: 3) user details + submit — Desktop: left column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-3 min-w-0 lg:col-start-1 lg:row-span-2 lg:row-start-1"
        >
          <div className="card p-6 flex flex-col h-full min-h-0">
            <h2 className="text-2xl font-bold text-chana-brown mb-6">
              Customer Details
            </h2>

            <div className="space-y-4 flex-1 text-gray-800">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Name *
                </label>
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
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone *
                </label>
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
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chana-gold bg-white"
                >
                  <option value="Karachi">Karachi</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Currently serving Karachi only
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Address *
                </label>
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
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chana-gold"
                  placeholder="Enter your email (optional)"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary w-full text-lg py-3 mt-8 shrink-0"
            >
              Place Order via WhatsApp
            </motion.button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}

export default Checkout;

import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import ThankYou from './pages/ThankYou'
import ScrollToTop from './components/ScrollToTop'
import FAQ from './pages/faqs'
import Cart from './pages/cart'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faqs" element={<FAQ />} />
          <Route path="thankyou" element={<ThankYou />} />
        </Route>
      </Routes>
    </>
  )
}

export default App


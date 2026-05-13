import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { WishlistProvider } from './contexts/WishlistContext'
import { ToastProvider } from './contexts/ToastContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CheckoutPage from './pages/CheckoutPage'
import WishlistPage from './pages/WishlistPage'
import CategoryPage from './pages/CategoryPage'
import OffersPage from './pages/OffersPage'
import SearchPage from './pages/SearchPage'
import OrdersPage from './pages/OrdersPage'
import OrderSuccessPage from './pages/OrderSuccessPage'

/**
 * The root component of the application.
 * It wraps the entire app with necessary Context Providers for state management
 * and defines the routing structure using React Router.
 */
export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                {/* 
                  Providers are nested to allow child components to access 
                  different pieces of global state (Theme, Auth, Cart, etc.)
                */}
                {/* Navbar shows on every page */}
                <Navbar />

                {/* Main content area */}
                <main style={{ minHeight: 'calc(100vh - 64px - 300px)' }}>
                  <Routes>
                    {/* Public Routes: Accessible to everyone */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    <Route path="/offers" element={<OffersPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/order-success" element={<OrderSuccessPage />} />

                    {/* Protected Routes: Require the user to be logged in */}
                    <Route path="/orders" element={
                      <ProtectedRoute>
                        <OrdersPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    } />

                    {/* Fallback Route: Redirects any unknown URL to the home page */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </main>

                {/* Footer shows on every page */}
                <Footer />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

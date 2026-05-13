import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

// Simple hook to use the Cart context anywhere in our app
export function useCart() {
  let context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>')
  }
  return context
}

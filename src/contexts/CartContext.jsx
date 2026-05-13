import { createContext, useState, useEffect } from 'react'

// Create a context to share cart data across the application
export const CartContext = createContext(null)

// This component wraps our app and provides cart features
export function CartProvider({ children }) {
  /**
   * Loads the cart from localStorage during initialization to persist across sessions.
   */
  const [cart, setCart] = useState(function () {
    try {
      let saved = localStorage.getItem('lx_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  /**
   * Syncs the cart state to localStorage whenever it changes.
   */
  useEffect(function () {
    localStorage.setItem('lx_cart', JSON.stringify(cart))
  }, [cart])

  /**
   * Listens for a logout event to clear the cart from memory.
   */
  useEffect(function () {
    function handleLogout() { setCart([]) }
    window.addEventListener('user-logout', handleLogout)
    return function () { window.removeEventListener('user-logout', handleLogout) }
  }, [])

  // Add a product to cart (or increase quantity if already there)
  function addToCart(product) {
    setCart(function (oldCart) {
      let existingItem = oldCart.find(function (item) {
        return item.id === product.id
      })

      if (existingItem) {
        // Product already in cart - increase quantity by 1
        return oldCart.map(function (item) {
          if (item.id === product.id) {
            return { ...item, qty: item.qty + 1 }
          }
          return item
        })
      }

      // Product not in cart - add it with qty 1
      return [...oldCart, { ...product, qty: 1 }]
    })
  }

  // Add multiple of same product at once
  function addMultipleToCart(product, quantity) {
    setCart(function (oldCart) {
      let existingItem = oldCart.find(function (item) {
        return item.id === product.id
      })

      if (existingItem) {
        return oldCart.map(function (item) {
          if (item.id === product.id) {
            return { ...item, qty: item.qty + quantity }
          }
          return item
        })
      }

      return [...oldCart, { ...product, qty: quantity }]
    })
  }

  // Remove a product from cart
  function removeFromCart(id) {
    setCart(function (oldCart) {
      return oldCart.filter(function (item) {
        return item.id !== id
      })
    })
  }

  // Update quantity for a cart item
  function updateQty(id, newQty) {
    if (newQty < 1) {
      removeFromCart(id)
      return
    }
    setCart(function (oldCart) {
      return oldCart.map(function (item) {
        if (item.id === id) {
          return { ...item, qty: newQty }
        }
        return item
      })
    })
  }

  // Empty the entire cart
  function clearCart() {
    setCart([])
  }

  /**
   * Derived state: Total count of all items (sum of quantities).
   */
  let cartCount = 0
  for (let i = 0; i < cart.length; i++) {
    cartCount = cartCount + cart[i].qty
  }

  /**
   * Derived state: Total price of all items in the cart.
   */
  let cartTotal = 0
  for (let i = 0; i < cart.length; i++) {
    cartTotal = cartTotal + cart[i].price * cart[i].qty
  }

  // Share these values with all child components
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      addMultipleToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartCount,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}

import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  /**
   * Initializes wishlist from localStorage to persist across page refreshes.
   */
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  })

  /**
   * Syncs the wishlist state to localStorage whenever it changes.
   */
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  /**
   * Listens for the 'user-logout' event to clear the wishlist from memory.
   */
  useEffect(() => {
    function handleLogout() { setWishlist([]) }
    window.addEventListener('user-logout', handleLogout)
    return () => window.removeEventListener('user-logout', handleLogout)
  }, [])

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(p => p.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(p => p.id !== productId))
  }

  const isInWishlist = (productId) => {
    return wishlist.some(p => p.id === productId)
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)

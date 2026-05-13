import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

// Key used to store the registered users list in localStorage
const USERS_KEY = 'lx_users'
// Key used to store the currently logged-in user
const SESSION_KEY = 'lx_user'

// Helper used by CheckoutPage / OrdersPage to scope orders to the current user
export function getOrdersKey(email) {
  return email ? `orders_${email}` : 'orders_guest'
}

export function AuthProvider({ children }) {
  /**
   * Initializes the user state from localStorage.
   * If a session exists, it parses and returns it.
   */
  const [user, setUser] = useState(function () {
    try {
      const saved = localStorage.getItem(SESSION_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Helper: get all registered users from localStorage
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    } catch {
      return []
    }
  }

  // Helper: save updated users list
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  /**
   * Registers a new user.
   * Checks for existing emails, saves to localStorage, and auto-logs in.
   */
  function register(name, email, password) {
    const users = getUsers()
    const emailLower = email.toLowerCase()

    // Check if email is already registered
    if (users.find(u => u.email === emailLower)) {
      return { success: false, message: 'An account with this email already exists. Please sign in.' }
    }

    // Prepare new user object (password is stored as plain text for this demo)
    const newUser = {
      name,
      email: emailLower,
      password,
      avatar: name.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString(),
    }
    saveUsers([...users, newUser])

    // Automatically log the user in after registration
    const sessionData = { email: emailLower, name, avatar: newUser.avatar }
    setUser(sessionData)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))

    return { success: true }
  }

  // Login: check if email exists and password matches
  // Returns { success: true } or { success: false, message: '...' }
  function login(email, password) {
    if (!email || !password) {
      return { success: false, message: 'Please enter your email and password.' }
    }

    const users = getUsers()
    const emailLower = email.toLowerCase()
    const found = users.find(u => u.email === emailLower)

    // Email not registered → tell user to sign up
    if (!found) {
      return { success: false, message: 'No account found with this email. Please create one.', notFound: true }
    }

    // Email found but wrong password
    if (found.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' }
    }

    // Success
    const sessionData = { email: found.email, name: found.name, avatar: found.avatar }
    setUser(sessionData)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
    return { success: true }
  }

  /**
   * Logs out the user by clearing state and localStorage.
   * Dispatches a custom event so other contexts (Cart, Wishlist) can reset their state.
   */
  function logout() {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem('lx_cart')
    localStorage.removeItem('wishlist')
    
    // Signal other contexts to reset their in-memory state
    window.dispatchEvent(new Event('user-logout'))
  }

  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

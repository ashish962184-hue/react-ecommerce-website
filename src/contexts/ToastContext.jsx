import { createContext, useContext, useState, useCallback } from 'react'

// Create a context for toast notifications
const ToastContext = createContext(null)

const ICONS = {
  success: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff' }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff' }}>
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff' }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  wishlist: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff' }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
}

const COLORS = {
  success: '#22c55e',
  error: '#ef4444',
  info: '#3b82f6',
  wishlist: '#f43f5e',
}

export function ToastProvider({ children }) {
  // State to store an array of active toast notifications
  const [toasts, setToasts] = useState([])

  /**
   * Adds a new toast notification to the list.
   * @param {string} message - The text to display.
   * @param {string} type - The type of toast ('success', 'error', 'info', 'wishlist').
   * @param {number} duration - Time in ms before the toast automatically disappears.
   */
  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random() // Unique ID for each toast
    
    // Add toast to state
    setToasts(prev => [...prev, { id, message, type }])
    
    // Auto-remove toast after specified duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  /**
   * Manually removes a toast by its ID.
   */
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 9999,
        pointerEvents: 'none',
      }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="slide-up"
            onClick={() => removeToast(toast.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 20px',
              borderRadius: 14,
              background: COLORS[toast.type] || COLORS.success,
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              minWidth: 260,
              maxWidth: 360,
              pointerEvents: 'auto',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div style={{ flexShrink: 0 }}>{ICONS[toast.type] || ICONS.success}</div>
            <span style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/**
 * Custom hook to easily access the showToast function from any component.
 */
export const useToast = () => useContext(ToastContext)

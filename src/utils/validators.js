// Simple form validation functions

// Check if email is valid
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// Check if password is at least 6 characters
export function isValidPassword(password) {
  return password.length >= 6
}

// Check if ZIP code is 5-6 digits
export function isValidZip(zip) {
  return /^\d{5,6}$/.test(zip.trim())
}

// Check if card number is 16 digits
export function isValidCardNumber(card) {
  let digitsOnly = card.replace(/\s/g, '')
  return digitsOnly.length === 16
}

// Check if expiry is in MM/YY format
export function isValidExpiry(expiry) {
  return /^\d{2}\/\d{2}$/.test(expiry)
}

// Check if CVV is at least 3 digits
export function isValidCVV(cvv) {
  return cvv.length >= 3
}

// Validate shipping form fields
export function validateShipping(form) {
  let errors = {}

  if (!form.name.trim()) errors.name = 'Full name is required'
  if (!form.address.trim()) errors.address = 'Street address is required'
  if (!form.city.trim()) errors.city = 'City is required'
  if (!form.state.trim()) errors.state = 'State is required'
  if (!isValidZip(form.zip)) errors.zip = 'Enter a valid ZIP (5-6 digits)'

  return errors
}

// Validate payment form fields
export function validatePayment(form) {
  let errors = {}

  if (!isValidCardNumber(form.card)) errors.card = 'Enter a valid 16-digit card number'
  if (!isValidExpiry(form.expiry)) errors.expiry = 'Use MM/YY format'
  if (!isValidCVV(form.cvv)) errors.cvv = '3-digit CVV required'

  return errors
}

// Format card number with spaces: 1234 5678 9012 3456
export function formatCard(raw) {
  let digits = raw.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

// Format expiry as MM/YY
export function formatExpiry(raw) {
  let digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length > 2) {
    return digits.slice(0, 2) + '/' + digits.slice(2)
  }
  return digits
}

// Generate a random 6-digit order ID
export function generateOrderId() {
  return Math.floor(Math.random() * 900000 + 100000).toString()
}

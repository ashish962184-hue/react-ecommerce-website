// Design colors used throughout the app (Mapped to CSS variables for dynamic themes)
export const C = {
  bg:        'var(--bg)',
  bgCard:    'var(--bg-card)',
  bgHover:   'var(--bg-hover)',
  bgInput:   'var(--bg-input)',
  border:    'var(--border)',
  borderHov: 'var(--border-hov)',
  text:      'var(--text)',
  textSub:   'var(--text-sub)',
  textHint:  'var(--text-hint)',
  primary:   'var(--primary)',
  secondary: 'var(--secondary)',
  green:     'var(--green)',
  greenBg:   'var(--green-bg)',
  red:       'var(--red)',
  redBg:     'var(--red-bg)',
  blue:      'var(--primary)', // Using primary for info by default
  blueBg:    'var(--green-bg)', // Using light green as placeholder
}

// Font families
export const FONTS = {
  serif: "'Outfit', 'Inter', system-ui, sans-serif",
  sans:  "'Outfit', 'Inter', system-ui, sans-serif",
}

// Default input style (reused in forms)
export const inputStyle = {
  width:        '100%',
  padding:      '12px 16px',
  background:   C.bgInput,
  border:       '1px solid ' + C.border,
  borderRadius: 8,
  color:        C.text,
  fontSize:     14,
  boxSizing:    'border-box',
  outline:      'none',
  transition:   'all 0.3s ease',
}

// Input style when there's an error
export const inputErrorStyle = {
  ...inputStyle,
  border: '1px solid ' + C.red,
  background: C.redBg,
}

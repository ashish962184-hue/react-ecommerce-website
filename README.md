# 🛍️ LUXE Store — Modern E-Commerce React App

A fully-featured single-page e-commerce application built with React 18, React Router v6, Context API, and Vite.

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server (opens at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── main.jsx                  # App entry point
├── App.jsx                   # Root component + routing
├── index.css                 # Global styles & CSS reset
│
├── constants/
│   └── theme.js              # Design tokens (colors, fonts)
│
├── utils/
│   └── validators.js         # Form validation helpers
│
├── contexts/
│   ├── AuthContext.jsx       # Auth state + login/logout
│   ├── CartContext.jsx       # Cart state + localStorage sync
│   └── RouterContext.jsx     # (unused — using React Router)
│
├── hooks/
│   ├── useAuth.js            # useContext(AuthContext)
│   ├── useCart.js            # useContext(CartContext)
│   └── useProducts.js        # Custom hook — API fetch + state
│
├── components/
│   ├── Navbar.jsx            # Sticky navigation bar
│   ├── ProductCard.jsx       # Product grid card
│   ├── Spinner.jsx           # Loading indicator
│   ├── Stars.jsx             # Star rating display
│   ├── Badge.jsx             # Category / label badge
│   ├── QtyControl.jsx        # +/- quantity selector
│   ├── OrderSummary.jsx      # Checkout sidebar summary
│   ├── FormField.jsx         # Labelled input wrapper
│   └── ProtectedRoute.jsx    # Auth guard for routes
│
└── pages/
    ├── HomePage.jsx          # / — Product grid + search + filter
    ├── ProductDetailPage.jsx # /product/:id — Full product view
    ├── CartPage.jsx          # /cart — Cart management
    ├── LoginPage.jsx         # /login — Auth form
    └── CheckoutPage.jsx      # /checkout — 3-step checkout (protected)
```

## 🧩 Key Features

| Feature | Implementation |
|---------|---------------|
| Component Architecture | Modular, reusable components |
| Global State | React Context API (Auth + Cart) |
| Local State | useState for UI, forms, toggles |
| Side Effects | useEffect for API calls |
| API Integration | Axios + fakestoreapi.com |
| Routing | React Router v6 |
| Protected Routes | ProtectedRoute component |
| Cart Persistence | localStorage sync |
| Auth Persistence | localStorage (JWT-like token) |
| Search & Filter | Live client-side filtering |
| Form Validation | Custom validators.js utility |

## 🔑 Demo Login

Use **any valid email** + **any password (6+ characters)** to sign in.

> Example: `user@example.com` / `password123`

## 📦 Tech Stack

- **React 18** — UI library
- **React Router v6** — Client-side routing
- **Axios** — HTTP client
- **Vite** — Build tool & dev server
- **Fake Store API** — `https://fakestoreapi.com`

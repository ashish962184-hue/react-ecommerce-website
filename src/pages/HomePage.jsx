import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useTheme } from '../contexts/ThemeContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

/**
 * Static configuration for the hero slider banners.
 */
const heroSlides = [
  { 
    id: 1, 
    color: '#2874f0', 
    title: 'Future Tech Sale', 
    sub: 'Next-gen devices at unbeatable prices',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2070',
    link: '/category/Electronics'
  },
  { 
    id: 2, 
    color: '#fb641b', 
    title: 'Autumn Collection', 
    sub: 'Elegant styles for the modern individual',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070',
    link: '/category/Fashion'
  },
  {
    id: 3,
    color: '#388e3c',
    title: 'Home & Living',
    sub: 'Transform your space with premium essentials',
    image: 'https://images.unsplash.com/photo-1616489953149-847d3d14697c?auto=format&fit=crop&q=80&w=2070',
    link: '/category/Home'
  },
  {
    id: 4,
    color: '#7b1fa2',
    title: 'Beauty & Glow',
    sub: 'Discover skincare & beauty favorites',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=2070',
    link: '/category/Beauty'
  },
  {
    id: 5,
    color: '#c62828',
    title: 'Mega Deals',
    sub: 'Up to 70% off on top brands',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=2070',
    link: '/offers'
  }
];

export default function HomePage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { products, loading, error } = useProducts();

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Daily Deals Timer State
  function getTimeLeft() {
    const now = new Date();
    const h = (23 - now.getHours()).toString().padStart(2, '0');
    const m = (59 - now.getMinutes()).toString().padStart(2, '0');
    const s = (59 - now.getSeconds()).toString().padStart(2, '0');
    return h + ":" + m + ":" + s;
  }
  
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  // Setup timers for the countdown and the auto-sliding carousel
  useEffect(function() {
    const timer = setInterval(function() {
      setTimeLeft(getTimeLeft());
    }, 1000);

    const slideTimer = setInterval(function() {
      setCurrentSlide(function(prev) {
        return (prev + 1) % heroSlides.length;
      });
    }, 5000);

    return function() {
      clearInterval(timer);
      clearInterval(slideTimer);
    };
  }, []);

  function handleNext() {
    setCurrentSlide((currentSlide + 1) % heroSlides.length);
  }

  function handlePrev() {
    setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }

  // Groups products by their category
  const productSections = useMemo(function() {
    const sections = {};
    products.forEach(function(p) {
      if (!sections[p.category]) {
        sections[p.category] = [];
      }
      sections[p.category].push(p);
    });
    return sections;
  }, [products]);

  if (loading) return <Spinner />;
  if (error) return <div style={{ textAlign: 'center', padding: 100 }}>{error}</div>;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 60 }}>
      {/* Hero Carousel Section */}
      <div className="container" style={{ marginBottom: 40, marginTop: 20 }}>
        <div style={{ 
          height: 440, 
          borderRadius: 24, 
          overflow: 'hidden', 
          position: 'relative',
          background: '#000',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
        }}>
          {/* Main Slide Image with Smooth Transition */}
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            transition: 'opacity 1s ease-in-out'
          }}>
            <img 
              src={heroSlides[currentSlide].image} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Hero Banner"
            />
            {/* Dark Overlay for better text readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, ' + heroSlides[currentSlide].color + 'cc, transparent)'
            }} />
          </div>

          {/* Text Content for the Slide */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 80px',
            color: '#fff',
            zIndex: 5
          }}>
            <h2 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16 }}>
              {heroSlides[currentSlide].title}
            </h2>
            <p style={{ fontSize: 20, marginBottom: 32, opacity: 0.9 }}>
              {heroSlides[currentSlide].sub}
            </p>
            <button 
              onClick={function() { navigate(heroSlides[currentSlide].link) }}
              style={{
                background: '#fff',
                color: heroSlides[currentSlide].color,
                padding: '16px 40px',
                borderRadius: 12,
                fontWeight: 800,
                width: 'fit-content',
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              SHOP NOW
            </button>
          </div>

          {/* Navigation Controls (Left/Right arrows) */}
          <button 
            onClick={handlePrev}
            style={{ 
              position: 'absolute', 
              left: 20, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              background: 'rgba(255,255,255,0.2)', 
              width: 48, 
              height: 48, 
              borderRadius: '50%', 
              color: '#fff', 
              zIndex: 10,
              cursor: 'pointer',
              border: 'none'
            }}
          >
            ‹
          </button>
          <button 
            onClick={handleNext}
            style={{ 
              position: 'absolute', 
              right: 20, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              background: 'rgba(255,255,255,0.2)', 
              width: 48, 
              height: 48, 
              borderRadius: '50%', 
              color: '#fff', 
              zIndex: 10,
              cursor: 'pointer',
              border: 'none'
            }}
          >
            ›
          </button>

          {/* Indicator Dots for Navigation */}
          <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
            {heroSlides.map(function(_, idx) {
              return (
                <div 
                  key={idx}
                  onClick={function() { setCurrentSlide(idx) }}
                  style={{
                    width: currentSlide === idx ? 30 : 10,
                    height: 10,
                    borderRadius: 5,
                    background: currentSlide === idx ? '#fff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Daily Deals Highlights Section */}
      <div className="container">
        <div style={{ 
          background: 'var(--bg-card)', 
          padding: 24, 
          borderRadius: 20, 
          marginBottom: 40,
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900 }}>Deal of the Day</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg)', padding: '6px 12px', borderRadius: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-sub)' }}>Ends in:</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--red)', fontFamily: 'monospace' }}>{timeLeft}</span>
            </div>
          </div>
          <button 
            onClick={function() { navigate('/offers') }}
            style={{ 
              background: 'var(--primary)', 
              color: '#fff', 
              padding: '10px 24px', 
              borderRadius: 8, 
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer'
            }}
          >
            VIEW ALL
          </button>
        </div>

        {/* Dynamically Render Product Sections by Category */}
        {Object.keys(productSections).map(function(category) {
          return (
            <div key={category} style={{ marginBottom: 60 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: 24, fontWeight: 900 }}>{category}</h2>
                <button 
                  onClick={function() { navigate('/category/' + category) }}
                  style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}
                >
                  VIEW ALL
                </button>
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: 24 
              }}>
                {productSections[category].slice(0, 4).map(function(product) {
                  return <ProductCard key={product.id} product={product} />
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useTheme } from '../contexts/ThemeContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

/**
 * Static configuration for the hero slider banners.
 * These match the 5 main sections of the application.
 */
const heroSlides = [
  { 
    id: 1, 
    color: '#2874f0', 
    title: 'Electronics', 
    sub: 'Mobiles, Laptops, Accessories & More',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2070',
    link: '/category/Electronics'
  },
  { 
    id: 2, 
    color: '#fb641b', 
    title: 'Fashion & Clothes', 
    sub: 'Latest trends in Men & Women fashion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070',
    link: '/category/Fashion'
  },
  {
    id: 3,
    color: '#388e3c',
    title: 'Home Accessories',
    sub: 'Kitchen, Decor & Living essentials',
    image: 'https://images.unsplash.com/photo-1616489953149-847d3d14697c?auto=format&fit=crop&q=80&w=2070',
    link: '/category/Home'
  },
  {
    id: 4,
    color: '#7b1fa2',
    title: 'Beauty Products',
    sub: 'Skincare, Cosmetics & Fragrances',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=2070',
    link: '/category/Beauty'
  },
  {
    id: 5,
    color: '#c62828',
    title: 'Best Deals',
    sub: 'Exclusive offers on top brands',
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
      
      {/* Category Navigation Bar (Top Icons) */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '16px 0', gap: 60, overflowX: 'auto' }}>
          {heroSlides.map(function(slide) {
            return (
              <div 
                key={slide.id} 
                onClick={function() { navigate(slide.link) }}
                style={{ textAlign: 'center', cursor: 'pointer', minWidth: 80 }}
              >
                <div style={{ 
                  width: 60, 
                  height: 60, 
                  margin: '0 auto 8px', 
                  borderRadius: '50%', 
                  background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img src={slide.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={slide.title} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>{slide.title.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Carousel Section */}
      <div className="container" style={{ marginBottom: 40 }}>
        <div style={{ 
          height: 400, 
          borderRadius: 20, 
          overflow: 'hidden', 
          position: 'relative',
          background: '#000',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          {/* Main Slide Image */}
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            transition: 'opacity 1s ease-in-out'
          }}>
            <img 
              src={heroSlides[currentSlide].image} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Banner"
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, ' + heroSlides[currentSlide].color + 'cc, transparent)'
            }} />
          </div>

          {/* Text Content */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 60px',
            color: '#fff',
            zIndex: 5
          }}>
            <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 12 }}>{heroSlides[currentSlide].title}</h2>
            <p style={{ fontSize: 18, marginBottom: 24, opacity: 0.9 }}>{heroSlides[currentSlide].sub}</p>
            <button 
              onClick={function() { navigate(heroSlides[currentSlide].link) }}
              style={{
                background: '#fff',
                color: heroSlides[currentSlide].color,
                padding: '12px 32px',
                borderRadius: 8,
                fontWeight: 800,
                width: 'fit-content',
                fontSize: 15,
                cursor: 'pointer',
                border: 'none'
              }}
            >
              SHOP NOW
            </button>
          </div>

          {/* Controls */}
          <button 
            onClick={handlePrev}
            style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', width: 40, height: 40, borderRadius: '50%', color: '#fff', zIndex: 10, cursor: 'pointer', border: 'none' }}
          >
            ‹
          </button>
          <button 
            onClick={handleNext}
            style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', width: 40, height: 40, borderRadius: '50%', color: '#fff', zIndex: 10, cursor: 'pointer', border: 'none' }}
          >
            ›
          </button>

          {/* Dots */}
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
            {heroSlides.map(function(_, idx) {
              return (
                <div 
                  key={idx}
                  onClick={function() { setCurrentSlide(idx) }}
                  style={{
                    width: currentSlide === idx ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
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

      {/* Daily Deals Section */}
      <div className="container">
        <div style={{ 
          background: 'var(--bg-card)', 
          padding: 20, 
          borderRadius: 16, 
          marginBottom: 32,
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900 }}>Deal of the Day</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg)', padding: '4px 10px', borderRadius: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-sub)' }}>Ends in:</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--red)', fontFamily: 'monospace' }}>{timeLeft}</span>
            </div>
          </div>
          <button 
            onClick={function() { navigate('/offers') }}
            style={{ 
              background: 'var(--primary)', 
              color: '#fff', 
              padding: '8px 20px', 
              borderRadius: 6, 
              fontWeight: 800,
              fontSize: 12,
              cursor: 'pointer',
              border: 'none'
            }}
          >
            VIEW ALL
          </button>
        </div>

        {/* Product Sections Ordered to Match Slides */}
        {['Electronics', 'Fashion', 'Home', 'Beauty'].map(function(category) {
          if (!productSections[category]) return null;
          return (
            <div key={category} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 22, fontWeight: 900 }}>{category}</h2>
                <button 
                  onClick={function() { navigate('/category/' + category) }}
                  style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 13, cursor: 'pointer', border: 'none', background: 'none' }}
                >
                  VIEW ALL
                </button>
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
                gap: 20 
              }}>
                {productSections[category].slice(0, 4).map(function(product) {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            </div>
          )
        })}

        {/* 5th Section: Best Deals (Products with offers) */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900 }}>Top Deals For You</h2>
            <button 
              onClick={function() { navigate('/offers') }}
              style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 13, cursor: 'pointer', border: 'none', background: 'none' }}
            >
              VIEW ALL
            </button>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
            gap: 20 
          }}>
            {products.filter(function(p) { return p.offer; }).slice(0, 4).map(function(product) {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

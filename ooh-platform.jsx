import React, { useState, useEffect } from 'react';
import { ChevronRight, Map, TrendingUp, Users, DollarSign, MapPin, Image, BarChart3, Menu, X, Eye, CheckCircle, Clock, Calendar, FileText, Award, Target, Zap } from 'lucide-react';

// Advertisement Categories with Pricing
const AD_CATEGORIES = {
  tBanner: {
    name: 'T-Banner Advertisement',
    variants: [
      { id: 'tbanner-a', name: 'T-Banner A', price: 300 },
      { id: 'tbanner-b', name: 'T-Banner B', price: 400 },
      { id: 'tbanner-c', name: 'T-Banner C', price: 500 }
    ],
    icon: '🎯'
  },
  miniTV: {
    name: 'Mini TV - Out-of-Home Advertisement',
    variants: [
      { id: 'minitv-a', name: 'Mini TV A', price: 700 },
      { id: 'minitv-b', name: 'Mini TV B', price: 800 },
      { id: 'minitv-c', name: 'Mini TV C', price: 900 }
    ],
    icon: '📺'
  },
  led: {
    name: 'LED Screen Advertisement',
    variants: [
      { id: 'led-screen', name: 'LED Screen', price: 1200 }
    ],
    icon: '💡'
  },
  billboard: {
    name: 'Billboard Advertisement',
    variants: [
      { id: 'billboard', name: 'Billboard', price: 4500 }
    ],
    icon: '🏗️'
  },
  online: {
    name: 'Online Website Advertisement',
    variants: [
      { id: 'online-web', name: 'Website Ad', price: 300 }
    ],
    icon: '🌐'
  }
};

// Regions Data
const REGIONS_DATA = {
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Jumeirah', 'Bur Dubai', 'Deira', 'Fujairah'],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
  Oman: ['Muscat', 'Salalah', 'Sohar', 'Nizwa'],
  Qatar: ['Doha', 'Al Wakrah', 'Al Rayyan', 'Umm Salal'],
  Bahrain: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town']
};

// Mock Data Storage (in production, this would be a backend API)
const mockStorage = {
  users: [],
  freelancers: [],
  advertisements: [],
  currentUser: null
};

// Main App Component
export default function OOHAdvertisingPlatform() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('oohCurrentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setUserType(user.type);
      setIsLoggedIn(true);
      setCurrentPage(user.type === 'client' ? 'client-dashboard' : 'freelancer-dashboard');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('oohCurrentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserType(null);
    setCurrentPage('home');
  };

  // Navigation Component
  const Navigation = () => (
    <nav style={{
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '24px',
              color: '#0a0e27',
              boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)'
            }}>OOH</div>
            <div>
              <div style={{ color: '#FFD700', fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px' }}>MEDIASCAPE</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '11px', letterSpacing: '1px' }}>OUT-OF-HOME ADVERTISING</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }} className="desktop-menu">
            {!isLoggedIn ? (
              <>
                <a onClick={() => setCurrentPage('home')} style={{ color: currentPage === 'home' ? '#FFD700' : '#fff', cursor: 'pointer', fontWeight: '500', transition: 'color 0.3s' }}>Home</a>
                <a onClick={() => setCurrentPage('about')} style={{ color: currentPage === 'about' ? '#FFD700' : '#fff', cursor: 'pointer', fontWeight: '500', transition: 'color 0.3s' }}>About</a>
                <a onClick={() => setCurrentPage('categories')} style={{ color: currentPage === 'categories' ? '#FFD700' : '#fff', cursor: 'pointer', fontWeight: '500', transition: 'color 0.3s' }}>Services</a>
                <a onClick={() => setCurrentPage('regions')} style={{ color: currentPage === 'regions' ? '#FFD700' : '#fff', cursor: 'pointer', fontWeight: '500', transition: 'color 0.3s' }}>Locations</a>
                <a onClick={() => setCurrentPage('contact')} style={{ color: currentPage === 'contact' ? '#FFD700' : '#fff', cursor: 'pointer', fontWeight: '500', transition: 'color 0.3s' }}>Contact</a>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setCurrentPage('login')} style={{
                    padding: '10px 24px',
                    background: 'transparent',
                    border: '2px solid #FFD700',
                    color: '#FFD700',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s'
                  }}>Login</button>
                  <button onClick={() => setCurrentPage('register')} style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    border: 'none',
                    color: '#0a0e27',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
                  }}>Get Started</button>
                </div>
              </>
            ) : (
              <>
                <a onClick={() => setCurrentPage(userType === 'client' ? 'client-dashboard' : 'freelancer-dashboard')} style={{ color: '#FFD700', cursor: 'pointer', fontWeight: '500' }}>Dashboard</a>
                <div style={{ color: '#fff', fontSize: '14px' }}>Welcome, {currentUser?.name}</div>
                <button onClick={handleLogout} style={{
                  padding: '10px 24px',
                  background: 'rgba(255, 215, 0, 0.1)',
                  border: '2px solid #FFD700',
                  color: '#FFD700',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>Logout</button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-toggle" style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#FFD700',
            cursor: 'pointer'
          }}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu" style={{
            display: 'none',
            flexDirection: 'column',
            gap: '20px',
            paddingBottom: '20px'
          }}>
            {!isLoggedIn ? (
              <>
                <a onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} style={{ color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Home</a>
                <a onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} style={{ color: '#fff', cursor: 'pointer', fontWeight: '500' }}>About</a>
                <a onClick={() => { setCurrentPage('categories'); setMobileMenuOpen(false); }} style={{ color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Services</a>
                <a onClick={() => { setCurrentPage('regions'); setMobileMenuOpen(false); }} style={{ color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Locations</a>
                <a onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} style={{ color: '#fff', cursor: 'pointer', fontWeight: '500' }}>Contact</a>
                <button onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }} style={{
                  padding: '12px',
                  background: 'transparent',
                  border: '2px solid #FFD700',
                  color: '#FFD700',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>Login</button>
                <button onClick={() => { setCurrentPage('register'); setMobileMenuOpen(false); }} style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  border: 'none',
                  color: '#0a0e27',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>Get Started</button>
              </>
            ) : (
              <>
                <a onClick={() => { setCurrentPage(userType === 'client' ? 'client-dashboard' : 'freelancer-dashboard'); setMobileMenuOpen(false); }} style={{ color: '#FFD700', cursor: 'pointer', fontWeight: '500' }}>Dashboard</a>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} style={{
                  padding: '12px',
                  background: 'rgba(255, 215, 0, 0.1)',
                  border: '2px solid #FFD700',
                  color: '#FFD700',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>Logout</button>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-toggle { display: block !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{ 
        padding: '120px 20px 80px',
        background: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.15) 0%, transparent 60%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: 'clamp(40px, 8vw, 72px)', 
              fontWeight: '800', 
              color: '#fff', 
              marginBottom: '24px',
              lineHeight: '1.1',
              letterSpacing: '-2px'
            }}>
              Elevate Your Brand<br />
              <span style={{ 
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Across the Gulf</span>
            </h1>
            <p style={{ 
              fontSize: 'clamp(16px, 3vw, 22px)', 
              color: 'rgba(255, 255, 255, 0.8)', 
              maxWidth: '700px', 
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>
              Premium Out-of-Home and Digital advertising solutions across UAE, Saudi Arabia, and the GCC region
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setCurrentPage('register')} style={{
                padding: '18px 40px',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                border: 'none',
                color: '#0a0e27',
                fontSize: '18px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)',
                transition: 'all 0.3s'
              }}>Start Advertising</button>
              <button onClick={() => setCurrentPage('categories')} style={{
                padding: '18px 40px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 215, 0, 0.3)',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}>View Services</button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '30px',
            marginTop: '80px'
          }}>
            {[
              { icon: <MapPin size={32} />, value: '5+', label: 'Countries Covered' },
              { icon: <Target size={32} />, value: '1000+', label: 'Active Campaigns' },
              { icon: <Users size={32} />, value: '500+', label: 'Happy Clients' },
              { icon: <Award size={32} />, value: '99%', label: 'Satisfaction Rate' }
            ].map((stat, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 215, 0, 0.1)',
                borderRadius: '16px',
                padding: '30px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}>
                <div style={{ color: '#FFD700', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '100px 20px', background: 'rgba(0, 0, 0, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: '60px' }}>
            Why Choose <span style={{ color: '#FFD700' }}>MediaScape</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {[
              { icon: <Map size={40} />, title: 'Strategic Locations', desc: 'Premium placements across high-traffic areas in the GCC region' },
              { icon: <Zap size={40} />, title: 'Quick Deployment', desc: 'Launch your campaign within 48 hours with our streamlined process' },
              { icon: <BarChart3 size={40} />, title: 'Real-Time Analytics', desc: 'Track performance and ROI with detailed campaign insights' },
              { icon: <DollarSign size={40} />, title: 'Flexible Pricing', desc: 'Transparent monthly rates with no hidden fees or long-term contracts' },
              { icon: <Image size={40} />, title: 'Creative Support', desc: 'Professional design services available to make your brand shine' },
              { icon: <TrendingUp size={40} />, title: 'Proven Results', desc: 'Join hundreds of brands seeing measurable growth' }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0.02) 100%)',
                border: '1px solid rgba(255, 215, 0, 0.15)',
                borderRadius: '20px',
                padding: '40px',
                transition: 'all 0.3s'
              }}>
                <div style={{ color: '#FFD700', marginBottom: '20px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', fontSize: '16px' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '100px 20px', background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#fff', marginBottom: '20px' }}>Ready to Amplify Your Reach?</h2>
          <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '40px' }}>
            Join leading brands across the Gulf region in making an impact
          </p>
          <button onClick={() => setCurrentPage('register')} style={{
            padding: '20px 50px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            border: 'none',
            color: '#0a0e27',
            fontSize: '20px',
            fontWeight: '700',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 10px 40px rgba(255, 215, 0, 0.5)',
            transition: 'all 0.3s'
          }}>Get Started Today</button>
        </div>
      </div>
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)', minHeight: '100vh', padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '800', color: '#fff', marginBottom: '30px', textAlign: 'center' }}>
          About <span style={{ color: '#FFD700' }}>MediaScape</span>
        </h1>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px solid rgba(255, 215, 0, 0.1)',
          borderRadius: '24px',
          padding: '60px',
          marginBottom: '60px'
        }}>
          <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8', marginBottom: '30px' }}>
            MediaScape is the leading Out-of-Home and Digital Out-of-Home advertising platform serving the Gulf Cooperation Council region. We connect brands with audiences through strategic placements in high-traffic locations across UAE, Saudi Arabia, Oman, Qatar, and Bahrain.
          </p>
          <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8', marginBottom: '30px' }}>
            Our mission is to make premium outdoor advertising accessible, measurable, and effective for businesses of all sizes. With transparent pricing, flexible terms, and a commitment to exceptional service, we're transforming how brands engage with their target markets.
          </p>
          <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
            From traditional billboards to cutting-edge LED displays and digital screens, our diverse portfolio ensures your message reaches the right people at the right time, every time.
          </p>
        </div>

        <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#FFD700', marginBottom: '40px', textAlign: 'center' }}>Our Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {[
            { title: 'Transparency', desc: 'Clear pricing with no hidden fees. What you see is what you get.' },
            { title: 'Innovation', desc: 'Leveraging the latest technology for maximum campaign impact.' },
            { title: 'Partnership', desc: 'Building long-term relationships with our clients and freelance marketers.' },
            { title: 'Excellence', desc: 'Delivering exceptional results through strategic placement and creative execution.' }
          ].map((value, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.03) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#FFD700', marginBottom: '16px' }}>{value.title}</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Categories Page
  const CategoriesPage = () => (
    <div style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)', minHeight: '100vh', padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '800', color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
          Advertising <span style={{ color: '#FFD700' }}>Solutions</span>
        </h1>
        <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: '60px', maxWidth: '700px', margin: '0 auto 60px' }}>
          Choose from our range of premium advertising formats designed to maximize your brand visibility
        </p>

        <div style={{ display: 'grid', gap: '40px' }}>
          {Object.entries(AD_CATEGORIES).map(([key, category]) => (
            <div key={key} style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.15)',
              borderRadius: '24px',
              padding: '40px',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <div style={{ fontSize: '48px' }}>{category.icon}</div>
                <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>{category.name}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {category.variants.map((variant) => (
                  <div key={variant.id} style={{
                    background: 'rgba(255, 215, 0, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '16px',
                    padding: '30px',
                    textAlign: 'center'
                  }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>{variant.name}</h3>
                    <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFD700', marginBottom: '8px' }}>
                      ${variant.price}
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>per month</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '60px',
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#FFD700', marginBottom: '16px' }}>Design Services Available</h3>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '12px' }}>
            Don't have a design? Our creative team can help bring your vision to life.
          </p>
          <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>
            Additional design charges apply based on complexity and requirements.
          </p>
        </div>
      </div>
    </div>
  );

  // Regions Page
  const RegionsPage = () => (
    <div style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)', minHeight: '100vh', padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '800', color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
          Coverage <span style={{ color: '#FFD700' }}>Across the Gulf</span>
        </h1>
        <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: '60px', maxWidth: '700px', margin: '0 auto 60px' }}>
          Strategic placements in prime locations across five countries
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {Object.entries(REGIONS_DATA).map(([country, cities]) => (
            <div key={country} style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.15)',
              borderRadius: '24px',
              padding: '40px',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <MapPin size={28} color="#FFD700" />
                <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#fff' }}>{country}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cities.map((city) => (
                  <div key={city} style={{
                    background: 'rgba(255, 215, 0, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.1)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    {city}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    };

    return (
      <div style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)', minHeight: '100vh', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
            Get in <span style={{ color: '#FFD700' }}>Touch</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: '60px' }}>
            Have questions? We'd love to hear from you.
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 215, 0, 0.15)',
            borderRadius: '24px',
            padding: '50px'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <CheckCircle size={64} color="#FFD700" style={{ marginBottom: '20px' }} />
                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Thank You!</h3>
                <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button type="submit" style={{
                  padding: '18px',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  border: 'none',
                  color: '#0a0e27',
                  fontSize: '18px',
                  fontWeight: '700',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)',
                  transition: 'all 0.3s'
                }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Login Page
  const LoginPage = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '', userType: 'client' });

    const handleLogin = (e) => {
      e.preventDefault();
      // Mock login - in production, verify credentials with backend
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: loginData.email.split('@')[0],
        email: loginData.email,
        type: loginData.userType,
        referralCode: loginData.userType === 'freelancer' ? 'MKT' + Math.random().toString(36).substr(2, 6).toUpperCase() : null
      };
      
      localStorage.setItem('oohCurrentUser', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      setUserType(mockUser.type);
      setIsLoggedIn(true);
      setCurrentPage(mockUser.type === 'client' ? 'client-dashboard' : 'freelancer-dashboard');
    };

    return (
      <div style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)', minHeight: '100vh', padding: '80px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#fff', marginBottom: '40px', textAlign: 'center' }}>
            Welcome <span style={{ color: '#FFD700' }}>Back</span>
          </h1>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 215, 0, 0.15)',
            borderRadius: '24px',
            padding: '50px'
          }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Account Type</label>
                <select
                  value={loginData.userType}
                  onChange={(e) => setLoginData({ ...loginData, userType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                >
                  <option value="client">Client Account</option>
                  <option value="freelancer">Freelance Marketer</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>
              <button type="submit" style={{
                padding: '18px',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                border: 'none',
                color: '#0a0e27',
                fontSize: '18px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)',
                transition: 'all 0.3s'
              }}>
                Login
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Don't have an account? </span>
              <button onClick={() => setCurrentPage('register')} style={{
                background: 'none',
                border: 'none',
                color: '#FFD700',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'underline'
              }}>
                Register here
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Register Page
  const RegisterPage = () => {
    const [registerData, setRegisterData] = useState({
      name: '',
      email: '',
      password: '',
      userType: 'client',
      company: '',
      phone: ''
    });

    const handleRegister = (e) => {
      e.preventDefault();
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: registerData.name,
        email: registerData.email,
        type: registerData.userType,
        company: registerData.company,
        phone: registerData.phone,
        referralCode: registerData.userType === 'freelancer' ? 'MKT' + Math.random().toString(36).substr(2, 6).toUpperCase() : null
      };
      
      localStorage.setItem('oohCurrentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      setUserType(newUser.type);
      setIsLoggedIn(true);
      setCurrentPage(newUser.type === 'client' ? 'client-dashboard' : 'freelancer-dashboard');
    };

    return (
      <div style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)', minHeight: '100vh', padding: '80px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#fff', marginBottom: '40px', textAlign: 'center' }}>
            Create <span style={{ color: '#FFD700' }}>Account</span>
          </h1>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 215, 0, 0.15)',
            borderRadius: '24px',
            padding: '50px'
          }}>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Account Type</label>
                <select
                  value={registerData.userType}
                  onChange={(e) => setRegisterData({ ...registerData, userType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                >
                  <option value="client">Client Account</option>
                  <option value="freelancer">Freelance Marketer</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Full Name</label>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Phone</label>
                  <input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>
                  {registerData.userType === 'client' ? 'Company Name' : 'Agency/Organization'}
                </label>
                <input
                  type="text"
                  value={registerData.company}
                  onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Password</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>
              <button type="submit" style={{
                padding: '18px',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                border: 'none',
                color: '#0a0e27',
                fontSize: '18px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)',
                transition: 'all 0.3s'
              }}>
                Create Account
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Already have an account? </span>
              <button onClick={() => setCurrentPage('login')} style={{
                background: 'none',
                border: 'none',
                color: '#FFD700',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'underline'
              }}>
                Login here
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Client Dashboard
  const ClientDashboard = () => {
    const [advertisements, setAdvertisements] = useState([
      {
        id: '1',
        category: 'T-Banner A',
        price: 300,
        country: 'UAE',
        region: 'Dubai',
        status: 'Running',
        designBy: 'Client',
        startDate: '2025-01-15',
        duration: 3
      },
      {
        id: '2',
        category: 'LED Screen',
        price: 1200,
        country: 'Saudi Arabia',
        region: 'Riyadh',
        status: 'Pending',
        designBy: 'Company',
        startDate: '2025-02-01',
        duration: 1
      }
    ]);

    const [showNewAd, setShowNewAd] = useState(false);
    const [newAd, setNewAd] = useState({
      category: '',
      variant: '',
      country: '',
      region: '',
      designBy: 'client',
      duration: 1
    });

    const totalMonthly = advertisements.reduce((sum, ad) => sum + ad.price, 0);
    const runningAds = advertisements.filter(ad => ad.status === 'Running').length;

    const handleCreateAd = (e) => {
      e.preventDefault();
      const selectedVariant = Object.values(AD_CATEGORIES)
        .flatMap(cat => cat.variants)
        .find(v => v.id === newAd.variant);

      const advertisement = {
        id: Math.random().toString(36).substr(2, 9),
        category: selectedVariant.name,
        price: selectedVariant.price,
        country: newAd.country,
        region: newAd.region,
        status: 'Pending',
        designBy: newAd.designBy === 'client' ? 'Client' : 'Company',
        startDate: new Date().toISOString().split('T')[0],
        duration: newAd.duration
      };

      setAdvertisements([...advertisements, advertisement]);
      setShowNewAd(false);
      setNewAd({ category: '', variant: '', country: '', region: '', designBy: 'client', duration: 1 });
    };

    return (
      <div style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)', minHeight: '100vh', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
              Client <span style={{ color: '#FFD700' }}>Dashboard</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.6)' }}>
              Welcome back, {currentUser?.name}
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(255, 215, 0, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BarChart3 size={28} color="#FFD700" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>Total Campaigns</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{advertisements.length}</div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle size={28} color="#22c55e" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>Running Ads</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{runningAds}</div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <DollarSign size={28} color="#3b82f6" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>Monthly Cost</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>${totalMonthly}</div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '20px',
              padding: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <button onClick={() => setShowNewAd(true)} style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                border: 'none',
                color: '#0a0e27',
                fontSize: '16px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
                width: '100%'
              }}>
                + New Campaign
              </button>
            </div>
          </div>

          {/* New Advertisement Form */}
          {showNewAd && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 215, 0, 0.15)',
              borderRadius: '24px',
              padding: '40px',
              marginBottom: '40px'
            }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '30px' }}>Create New Campaign</h2>
              <form onSubmit={handleCreateAd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Category</label>
                  <select
                    value={newAd.category}
                    onChange={(e) => setNewAd({ ...newAd, category: e.target.value, variant: '' })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '15px'
                    }}
                  >
                    <option value="">Select Category</option>
                    {Object.entries(AD_CATEGORIES).map(([key, cat]) => (
                      <option key={key} value={key}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {newAd.category && (
                  <div>
                    <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Variant</label>
                    <select
                      value={newAd.variant}
                      onChange={(e) => setNewAd({ ...newAd, variant: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 215, 0, 0.2)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '15px'
                      }}
                    >
                      <option value="">Select Variant</option>
                      {AD_CATEGORIES[newAd.category].variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.name} - ${variant.price}/month
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Country</label>
                  <select
                    value={newAd.country}
                    onChange={(e) => setNewAd({ ...newAd, country: e.target.value, region: '' })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '15px'
                    }}
                  >
                    <option value="">Select Country</option>
                    {Object.keys(REGIONS_DATA).map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {newAd.country && (
                  <div>
                    <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Region</label>
                    <select
                      value={newAd.region}
                      onChange={(e) => setNewAd({ ...newAd, region: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 215, 0, 0.2)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '15px'
                      }}
                    >
                      <option value="">Select Region</option>
                      {REGIONS_DATA[newAd.country].map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Design By</label>
                  <select
                    value={newAd.designBy}
                    onChange={(e) => setNewAd({ ...newAd, designBy: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '15px'
                    }}
                  >
                    <option value="client">Upload My Design</option>
                    <option value="company">Company Design (Additional Charges)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#FFD700', marginBottom: '8px', fontWeight: '600' }}>Duration (Months)</label>
                  <input
                    type="number"
                    min="1"
                    value={newAd.duration}
                    onChange={(e) => setNewAd({ ...newAd, duration: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '15px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                  <button type="submit" style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    border: 'none',
                    color: '#0a0e27',
                    fontSize: '16px',
                    fontWeight: '700',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}>
                    Create Campaign
                  </button>
                  <button type="button" onClick={() => setShowNewAd(false)} style={{
                    flex: 1,
                    padding: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '700',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Advertisements List */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 215, 0, 0.15)',
            borderRadius: '24px',
            padding: '40px'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '30px' }}>Active Campaigns</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {advertisements.map((ad) => (
                <div key={ad.id} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 215, 0, 0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Category</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{ad.category}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Location</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{ad.region}, {ad.country}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Monthly Cost</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#FFD700' }}>${ad.price}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Design</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{ad.designBy}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Status</div>
                    <div style={{
                      display: 'inline-block',
                      padding: '6px 16px',
                      background: ad.status === 'Running' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                      border: `1px solid ${ad.status === 'Running' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(251, 191, 36, 0.4)'}`,
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: ad.status === 'Running' ? '#22c55e' : '#fbbf24'
                    }}>
                      {ad.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Freelancer Dashboard
  const FreelancerDashboard = () => {
    const [clients, setClients] = useState([
      {
        id: '1',
        name: 'Tech Solutions LLC',
        email: 'contact@techsolutions.ae',
        totalAds: 3,
        monthlyValue: 2200,
        commission: 220,
        status: 'Active',
        joinDate: '2025-01-10'
      },
      {
        id: '2',
        name: 'Fashion Boutique',
        email: 'info@fashionboutique.com',
        totalAds: 1,
        monthlyValue: 4500,
        commission: 450,
        status: 'Active',
        joinDate: '2025-01-25'
      }
    ]);

    const totalClients = clients.length;
    const totalCommission = clients.reduce((sum, client) => sum + client.commission, 0);
    const totalValue = clients.reduce((sum, client) => sum + client.monthlyValue, 0);

    return (
      <div style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)', minHeight: '100vh', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
              Marketer <span style={{ color: '#FFD700' }}>Dashboard</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.6)' }}>
              Welcome back, {currentUser?.name}
            </p>
            {currentUser?.referralCode && (
              <div style={{
                marginTop: '16px',
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '12px',
                padding: '16px 24px',
                display: 'inline-block'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', marginRight: '12px' }}>Your Referral Code:</span>
                <span style={{ fontSize: '20px', fontWeight: '700', color: '#FFD700' }}>{currentUser.referralCode}</span>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(255, 215, 0, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={28} color="#FFD700" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>Total Clients</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{totalClients}</div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <DollarSign size={28} color="#22c55e" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>Monthly Commission</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>${totalCommission}</div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp size={28} color="#3b82f6" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>Total Ad Value</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>${totalValue}</div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(168, 85, 247, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={28} color="#a855f7" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>Commission Rate</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>10%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Client List */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 215, 0, 0.15)',
            borderRadius: '24px',
            padding: '40px'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '30px' }}>Your Clients</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {clients.map((client) => (
                <div key={client.id} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 215, 0, 0.1)',
                  borderRadius: '16px',
                  padding: '30px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '6px' }}>Client Name</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>{client.name}</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>{client.email}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '6px' }}>Active Campaigns</div>
                      <div style={{ fontSize: '28px', fontWeight: '700', color: '#FFD700' }}>{client.totalAds}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '6px' }}>Monthly Value</div>
                      <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff' }}>${client.monthlyValue}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '6px' }}>Your Commission (10%)</div>
                      <div style={{ fontSize: '28px', fontWeight: '700', color: '#22c55e' }}>${client.commission}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255, 215, 0, 0.1)' }}>
                    <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
                      Joined: {new Date(client.joinDate).toLocaleDateString()}
                    </div>
                    <div style={{
                      padding: '8px 20px',
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#22c55e'
                    }}>
                      {client.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commission Breakdown */}
          <div style={{
            marginTop: '40px',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#FFD700', marginBottom: '16px' }}>
              How Commissions Work
            </h3>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '700px', margin: '0 auto' }}>
              Earn 10% commission on every client's monthly advertising spend. Track your earnings in real-time and get paid monthly directly to your account.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'categories': return <CategoriesPage />;
      case 'regions': return <RegionsPage />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage />;
      case 'register': return <RegisterPage />;
      case 'client-dashboard': return <ClientDashboard />;
      case 'freelancer-dashboard': return <FreelancerDashboard />;
      default: return <HomePage />;
    }
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <Navigation />
      {renderPage()}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import HeroCanvas from './components/HeroCanvas';
import CocktailCanvas from './components/CocktailCanvas';
import ParticleBackground from './components/ParticleBackground';

const menuItems = [
  {
    category: 'Pour Overs',
    items: [
      { name: 'Ethiopia Yirgacheffe', notes: 'Blueberry · Jasmine · Citrus', price: '7' },
      { name: 'Colombia Huila', notes: 'Caramel · Stone Fruit · Hazelnut', price: '7' },
      { name: 'Kenya AB', notes: 'Blackcurrant · Tomato · Brown Sugar', price: '8' },
    ],
  },
  {
    category: 'Espresso',
    items: [
      { name: 'Single Origin Shot', notes: 'Rotating seasonal selection', price: '4' },
      { name: 'Flat White', notes: 'Double ristretto · Silky microfoam', price: '6' },
      { name: 'Cortado', notes: '1:1 espresso to steamed milk', price: '5' },
    ],
  },
  {
    category: 'Bar',
    items: [
      { name: 'SERO Old Fashioned', notes: 'Bourbon · Coffee bitters · Orange', price: '14' },
      { name: 'Mezcal Negroni', notes: 'Mezcal · Campari · Sweet vermouth', price: '15' },
      { name: 'Cold Brew Martini', notes: 'Vodka · Coffee liqueur · Cold brew', price: '14' },
    ],
  },
];

const foodItems = [
  {
    title: 'Ricotta Toast',
    subtitle: 'Honey drizzle, toasted almonds, sea salt',
    gradient: 'linear-gradient(145deg, #3A2518 0%, #C88555 100%)',
  },
  {
    title: 'Almond Croissant',
    subtitle: 'Twice-baked, frangipane, powdered sugar',
    gradient: 'linear-gradient(145deg, #D27D67 0%, #1C110A 100%)',
  },
  {
    title: 'Smoked Salmon Bowl',
    subtitle: 'Crème fraîche, dill, capers, rye crisps',
    gradient: 'linear-gradient(145deg, #C88555 0%, #D27D67 60%, #1C110A 100%)',
  },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('revealed');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero-section' },
    { name: 'The Craft', href: '#cocktail-section' },
    { name: 'Menu', href: '#digital-menu' },
    { name: 'Food', href: '#food-grid' },
    { name: 'Fusion Fridays', href: '#fusion-fridays' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'The Space', href: '#the-space' },
    { name: 'Visit Us', href: '#visit-us' },
  ];

  return (
    <>
      {/* Premium Texture Overlay */}
      <div className="noise-overlay fixed inset-0 z-[100] opacity-30 mix-blend-overlay" />
      
      <nav
        id="main-nav"
        className="fixed top-0 left-0 w-full z-50 transition-all duration-700 px-8 py-6 md:px-12 md:py-8"
        style={{
          background: scrolled ? 'rgba(28, 17, 10, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(185, 115, 67, 0.1)' : '1px solid transparent'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C88555" strokeWidth="1.5">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" x2="6" y1="2" y2="4" />
              <line x1="10" x2="10" y1="2" y2="4" />
              <line x1="14" x2="14" y1="2" y2="4" />
            </svg>
            <a href="#" className="font-display text-2xl tracking-[0.2em] uppercase text-[#F5ECD7] hover:text-[#C88555] transition-colors duration-500">
              SERO
            </a>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-display text-[10px] tracking-[0.4em] uppercase text-[#F5ECD7]/60 hover:text-[#F5ECD7] transition-all duration-500 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C88555] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="https://instagram.com/cafe_sero" target="_blank" rel="noreferrer" className="text-[#F5ECD7]/40 hover:text-[#F5ECD7] transition-colors duration-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#digital-menu"
              className="premium-button font-display text-[10px] tracking-[0.3em] uppercase px-8 py-3 bg-[#B97343] text-[#1C110A]"
            >
              Order Now
            </a>
          </div>

          <button 
            className="lg:hidden z-50 p-2"
            style={{ color: '#F5ECD7' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: '#1C110A' }}
      >
        <div className="flex flex-col items-center gap-8 text-center mt-12">
          {navLinks.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              className="font-display text-4xl transition-colors duration-300 hover:text-[#B97343]"
              style={{ 
                color: '#F5ECD7',
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s`
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#digital-menu"
            className="font-display text-[10px] tracking-[0.3em] uppercase px-12 py-5 mt-10 bg-[#B97343] text-[#1C110A]"
            style={{ 
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileMenuOpen ? 1 : 0,
              transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${navLinks.length * 0.05}s`
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Order Now
          </a>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section
      id="hero-section"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: '#1C110A' }}
    >
      <HeroCanvas />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(185,115,67,0.12) 0%, transparent 70%)' }}
      />

      <div id="hero-content" className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="pointer-events-auto relative">


          <h1
            id="hero-title"
            className="font-display mb-6 overflow-hidden flex flex-col items-center"
            style={{
              color: '#F5ECD7',
              fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            <div className="flex gap-[0.3em] mb-2">
              <span className="hero-word inline-block">Your</span>
              <span className="hero-word inline-block">Ritual</span>
            </div>
            <em className="hero-word-italic italic font-body block mt-2">Starts Here</em>
          </h1>
          <p
            id="hero-subtitle"
            className="font-body text-sm md:text-lg max-w-xl mx-auto leading-relaxed mb-4"
            style={{ color: '#F5ECD7' }}
          >
            Speciality Coffee • Creative Fusions • Warm Vibes in Gachibowli
          </p>
          <p
            id="hero-tagline"
            className="font-display text-[9px] tracking-[0.4em] uppercase mb-12"
            style={{ color: '#B97343' }}
          >
            Indira Nagar, Gachibowli • Est. 2025
          </p>
          <div
            id="hero-ctas"
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <a
              href="#digital-menu"
              className="premium-button font-display text-[10px] tracking-[0.3em] uppercase px-12 py-5 bg-[#B97343] text-[#1C110A]"
            >
              Explore Menu
            </a>
            <a
              href="#about"
              className="font-display text-[10px] tracking-[0.3em] uppercase px-12 py-5 text-[#F5ECD7] border border-white/20 hover:bg-white/5 transition-all duration-500"
            >
              Our Story
            </a>
          </div>
        </div>
      </div>

      <div id="scroll-indicator" className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#F5ECD7] opacity-30">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#B97343] to-transparent" />
      </div>
    </section>
  );
}

function CocktailSection() {
  return (
    <section
      id="cocktail-section"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', background: '#1C110A' }}
    >
      <CocktailCanvas />

      {/* Large ghost heading behind everything */}
      <h2
        className="font-display absolute pointer-events-none select-none"
        style={{
          color: 'rgba(245,236,215,0.03)',
          fontSize: 'clamp(6rem, 20vw, 22rem)',
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        Rituals
      </h2>

      {/* Foreground content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8">
        <div className="flex items-center gap-4 mb-8" data-reveal>
          <div className="w-12 h-px bg-[#C88555]/40" />
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#C88555]">The Craft</span>
          <div className="w-12 h-px bg-[#C88555]/40" />
        </div>
        <h2
          className="font-display text-center mb-10 text-[#F5ECD7]"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1 }}
          data-reveal
        >
          Poured with <br /><em>Intention</em>
        </h2>
        <p
          className="font-body text-center text-sm md:text-lg leading-relaxed max-w-xl mb-20 italic text-[#F5ECD7]/50"
          data-reveal
        >
          "Every cup at Sero is crafted with care — from sourcing rare beans to perfecting every pour and fusion."
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 w-full max-w-4xl"
          style={{ gap: '1px', background: 'rgba(200,133,85,0.1)' }}
          data-reveal
        >
          {[
            { num: '6', label: 'Signature Creations' },
            { num: '3', label: 'Rotating Fusions' },
            { num: '3', label: 'Handcrafted Methods' },
          ].map((stat, idx) => (
            <div key={stat.num} className="px-12 py-16 text-center group" style={{ background: '#1C110A' }}>
              <div className="font-display text-6xl mb-4 group-hover:scale-110 transition-transform duration-700" style={{ color: '#B97343' }}>{stat.num}</div>
              <div className="font-display text-[10px] tracking-[0.3em] uppercase text-[#F5ECD7]/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoodGrid() {
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    imgRefs.current.forEach((_img) => {
    });
  }, []);

  return (
    <section id="food-grid" className="py-28 px-8" style={{ background: '#1C110A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-20" data-reveal>
          <p className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: '#B97343' }}>
            From the Kitchen
          </p>
          <h2
            className="font-display"
            style={{ color: '#F5ECD7', fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            Food that<br /><em>anchors the day</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foodItems.map((item, i) => (
            <div
              key={item.title}
              className="group cursor-pointer"
              data-reveal
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative w-full overflow-hidden mb-6" style={{ paddingBottom: '125%' }}>
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: item.gradient }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: '300px 300px',
                    mixBlendMode: 'overlay',
                    opacity: 0.5,
                  }}
                />
                <img
                  ref={(el) => { imgRefs.current[i] = el; }}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0"
                  style={{ transition: 'opacity 0.6s ease' }}
                  onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = '1'; }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2"
                  style={{ background: 'linear-gradient(to top, rgba(28,17,10,0.6), transparent)' }}
                />
              </div>

              <h3
                className="font-display text-xl mb-1 transition-colors duration-300"
                style={{ color: '#F5ECD7' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#B97343')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#F5ECD7')}
              >
                {item.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(245,236,215,0.5)' }}>
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DigitalMenu() {
  const [activePanel, setActivePanel] = useState(0);
  
  const menuPages = [
    {
      title: 'Coffee & Matcha',
      categories: [
        {
          title: 'Hot Brew',
          items: [
            { name: 'Espresso', desc: 'A bright, syrupy double shot with notes of stone fruit.', price: '119' },
            { name: 'Americano', desc: 'Espresso topped with hot water for a smooth, light-bodied coffee.', price: '149' },
            { name: 'Long Black', desc: 'Hot water first, espresso poured on top for a stronger aroma and crema.', price: '159' },
            { name: 'Cappuccino', desc: 'Espresso with equal parts steamed milk and foam; creamy and balanced.', price: '179' },
            { name: 'Flat White', desc: 'Velvety steamed milk poured over a double espresso; smooth and rich.', price: '189' },
            { name: 'Latte', desc: 'Espresso with plenty of steamed milk and a light layer of foam.', price: '219' },
            { name: 'Mocha', desc: 'Espresso blended with chocolate and steamed milk; sweet and indulgent.', price: '229' },
            { name: 'Hot Chocolate', desc: 'Creamy, rich chocolate drink topped with silky foam.', price: '229' },
            { name: 'Barista\'s Choice', desc: 'A seasonal signature coffee crafted by our chef, featuring unique flavours.', price: '249' },
          ]
        },
        {
          title: 'Manual Brew',
          items: [
            { name: 'Pour Over', desc: 'Clean, bright flavors extracted through slow manual brewing.', price: '249' },
            { name: 'French Press', desc: 'Full-bodied and aromatic coffee with natural oils preserved.', price: '249' },
            { name: 'AeroPress', desc: 'Smooth, concentrated brew with low bitterness.', price: '249' },
          ]
        },
        {
          title: 'Cold Brew',
          items: [
            { name: 'Iced Americano', desc: 'Chilled espresso over ice with water, crisp and refreshing.', price: '179' },
            { name: 'Aero Cano', desc: 'AeroPress brew served over ice; smooth, cool, and light.', price: '189' },
            { name: 'Iced Latte', desc: 'Espresso and cold milk over ice for a silky, cool drink.', price: '229' },
            { name: 'Iced Mocha', desc: 'Iced latte blended with chocolate for a sweet chill.', price: '239' },
            { name: 'Spanish Latte', desc: 'A creamy iced latte sweetened with condensed milk.', price: '239' },
            { name: 'Vietnamese Latte', desc: 'Strong espresso layered with sweet condensed milk over ice.', price: '239' },
            { name: 'Espresso Tonic', desc: 'Bold espresso poured over tonic water and ice; fizzy and bright.', price: '249' },
            { name: 'Coconut Espresso', desc: 'Double espresso poured over chilled coconut water for a tropical contrast.', price: '249' },
            { name: 'Espresso Cranberry', desc: 'Visually striking mix of bold espresso over tart cranberry.', price: '249' },
            { name: 'Espresso Sunrise', desc: 'Espresso layered with orange notes for a citrusy, refreshing blend.', price: '249' },
            { name: 'Classic Cold Brew', desc: 'Slow-steeped coffee served cold for a smooth, bold flavor.', price: '199' },
            { name: 'Cranberry Cold Fizz', desc: 'Cold brew with cranberry and soda for a tangy, sparkling drink.', price: '229' },
            { name: 'Barista\'s Choice (Cold)', desc: 'A rotating cold coffee creation made with seasonal ingredients.', price: '249' },
          ]
        },
        {
          title: 'Matcha',
          items: [
            { name: 'Matcha Latte', desc: 'Organic ceremonial-grade matcha whisked with milk for a smooth, earthy ritual.', price: '269' },
            { name: 'Iced Matcha Latte', desc: 'Refreshing iced version of our matcha latte, made with organic ceremonial-grade matcha.', price: '269' },
            { name: 'Coconut Cloud Matcha', desc: 'Ceremonial matcha whisked with condensed milk foam, served on chilled coconut water.', price: '299' },
            { name: 'Berry Matcha', desc: 'Matcha blended with sweet strawberry for a fruity, refreshing experience.', price: '299' },
          ]
        }
      ]
    },
    {
      title: 'Beverages & More',
      categories: [
        {
          title: 'Frappe',
          items: [
            { name: 'Vanilla', desc: 'Creamy ice-blended coffee with premium vanilla bean notes.', price: '209' },
            { name: 'Salted Caramel', desc: 'Coffee blended with sweet salted caramel for a rich, balanced chill.', price: '219' },
            { name: 'Hazelnut', desc: 'Creamy frappe with nutty hazelnut flavour and a smooth coffee base.', price: '229' },
          ]
        },
        {
          title: 'Milkshakes',
          items: [
            { name: 'Vanilla Milkshake', desc: 'Classic, creamy, and made with real vanilla bean.', price: '149' },
            { name: 'Hazelnut', desc: 'Rich, nutty milkshake with a smooth, velvety texture.', price: '189' },
            { name: 'Oreo', desc: 'Blended with crunchy Oreo cookies and premium milk.', price: '169' },
            { name: 'Kit Kat', desc: 'Smooth milkshake with the crunch of Kit Kat chocolate bars.', price: '179' },
            { name: 'Blueberry', desc: 'Sweet and tangy blueberry notes in a creamy base.', price: '189' },
            { name: 'Strawberry', desc: 'Fresh strawberry flavors blended to silky perfection.', price: '189' },
            { name: 'Barista\'s Choice', desc: 'A seasonal milkshake creation crafted by our team.', price: '199' },
          ]
        },
        {
          title: 'Tea',
          items: [
            { name: 'English Breakfast Tea', desc: 'A robust, full-bodied morning ritual served hot.', price: '179' },
            { name: 'Lemon Tea', desc: 'Refreshing tea with a bright citrus lift and clean finish.', price: '189' },
            { name: 'Moroccan Mint Tea', desc: 'Green tea infused with fresh mint for a cooling, aromatic ritual.', price: '189' },
            { name: 'Butterfly Pea Tea', desc: 'A visually stunning floral infusion with earthy, botanical notes.', price: '199' },
          ]
        },
        {
          title: 'Add On’s',
          items: [
            { name: 'Oat Milk', desc: 'Creamy, plant-based alternative with a subtle nutty sweetness.', price: '49' },
            { name: 'Almond Milk', desc: 'Light and nutty plant-based milk for a clean coffee experience.', price: '49' },
            { name: 'Soya Milk', desc: 'Smooth, protein-rich plant-based ritual for any cup.', price: '49' },
            { name: 'Vanilla', desc: 'A dash of premium vanilla syrup to sweeten the moment.', price: '29' },
            { name: 'Hazelnut', desc: 'Add a rich, nutty aromatic layer to your favourite brew.', price: '29' },
            { name: 'Caramel', desc: 'Decadent caramel sweetness to elevate your everyday ritual.', price: '29' },
          ]
        }
      ]
    }
  ];

  const nextPanel = () => {
    if (activePanel < menuPages.length - 1) setActivePanel(activePanel + 1);
  };

  const prevPanel = () => {
    if (activePanel > 0) setActivePanel(activePanel - 1);
  };

  return (
    <section id="digital-menu" className="relative py-28 px-8 overflow-hidden" style={{ background: '#1C110A' }}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C88555]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16" data-reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#C88555]/40" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#C88555]">The Menu</span>
            <div className="w-12 h-px bg-[#C88555]/40" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-[#F5ECD7]">
            Handcrafted <em>Selection</em>
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 pointer-events-none">
          <div className="sticky top-1/2 -translate-y-1/2 flex justify-between px-6 md:px-12">
            <button 
              onClick={prevPanel}
              className={`pointer-events-auto transition-all duration-700 flex items-center group ${activePanel === 0 ? 'opacity-0 pointer-events-none' : 'opacity-30 hover:opacity-100'}`}
              disabled={activePanel === 0}
            >
              <svg width="40" height="80" viewBox="0 0 40 80" fill="none" className="transition-transform duration-500 group-hover:-translate-x-2">
                <path d="M35 10L5 40L35 70" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button 
              onClick={nextPanel}
              className={`pointer-events-auto transition-all duration-500 flex items-center group ${activePanel === menuPages.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-30 hover:opacity-100'}`}
              disabled={activePanel === menuPages.length - 1}
            >
              <svg width="40" height="80" viewBox="0 0 40 80" fill="none" className="transition-transform duration-500 group-hover:translate-x-2">
                <path d="M5 10L35 40L5 70" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider Track */}
        <div className="relative overflow-visible">
          <div 
            className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activePanel * 100}%)` }}
          >
            {menuPages.map((page, idx) => (
              <div 
                key={page.title} 
                className="w-full flex-shrink-0 px-8 md:px-24 transition-opacity duration-700"
                style={{ opacity: activePanel === idx ? 1 : 0.1, filter: activePanel === idx ? 'blur(0)' : 'blur(4px)' }}
              >
                <div className="space-y-24 max-w-5xl mx-auto">
                  {page.categories.map((cat) => (
                    <div key={cat.title}>
                      <h3 className="font-display text-xs tracking-[0.4em] uppercase mb-12 text-[#C88555] border-b border-white/5 pb-4 text-center max-w-xs mx-auto">
                        {cat.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {cat.items.map((item) => (
                          <div key={item.name} className="group relative">
                            <div className="flex justify-between items-baseline mb-3">
                              <h4 className="font-display text-xl text-[#F5ECD7] group-hover:text-[#C88555] transition-colors duration-500">
                                {item.name}
                              </h4>
                              <div className="flex-grow border-b border-[#C88555]/10 mx-4 h-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                              <span className="font-display text-base text-[#C88555] opacity-80">₹{item.price}</span>
                            </div>
                            <p className="font-body text-sm leading-relaxed opacity-40 group-hover:opacity-70 transition-opacity duration-500 italic">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Progress */}
        <div className="flex justify-center items-center gap-4 md:gap-6 mt-12 md:mt-20">
          <span className={`font-display text-[8px] md:text-[9px] tracking-widest uppercase transition-opacity duration-500 ${activePanel === 0 ? 'text-[#C88555]' : 'text-white/20'}`}>01</span>
          <div className="w-24 md:w-32 h-px bg-white/10 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-[#C88555] transition-all duration-700"
              style={{ width: `${((activePanel + 1) / menuPages.length) * 100}%` }}
            />
          </div>
          <span className={`font-display text-[8px] md:text-[9px] tracking-widest uppercase transition-opacity duration-500 ${activePanel === 1 ? 'text-[#C88555]' : 'text-white/20'}`}>02</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-8 pt-28 pb-12" style={{ background: '#1C110A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C88555" strokeWidth="2">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" x2="6" y1="2" y2="4" />
                <line x1="10" x2="10" y1="2" y2="4" />
                <line x1="14" x2="14" y1="2" y2="4" />
              </svg>
              <span className="font-display text-2xl tracking-widest uppercase text-[#F5ECD7]">SERO</span>
            </div>
            <p className="font-body text-sm opacity-50 text-[#F5ECD7] leading-relaxed italic">
              Your Everyday Ritual
            </p>
          </div>

          <div>
            <h4 className="font-display text-[10px] tracking-[0.3em] uppercase mb-8 text-[#C88555]">Explore</h4>
            <div className="flex flex-col gap-4">
              {['Home', 'Menu', 'Fusion Fridays', 'The Space', 'Visit Us', 'Journal'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(' ', '-')}`} 
                  className="font-body text-sm text-[#F5ECD7] opacity-40 hover:opacity-100 hover:text-[#C88555] transition-all"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 max-w-sm">
            <h4 className="font-display text-[10px] tracking-[0.3em] uppercase mb-8 text-[#C88555]">Newsletter</h4>
            <p className="font-body text-sm opacity-50 text-[#F5ECD7] mb-6">
              Join the ritual. Get notified about weekly fusion drops, cupping sessions, and secret menu offers.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-transparent border-b border-white/10 py-4 font-body text-sm text-[#F5ECD7] outline-none focus:border-[#C88555] transition-colors"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[10px] tracking-widest uppercase text-[#C88555] hover:text-[#F5ECD7] transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/cafe_sero" target="_blank" rel="noreferrer" className="text-[#F5ECD7] opacity-40 hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="font-body text-[10px] opacity-20 text-[#F5ECD7] tracking-widest uppercase">
              © 2026 SERO Specialty Coffee
            </span>
            <span className="font-body text-[10px] opacity-40 text-[#C88555] tracking-widest uppercase flex items-center gap-2">
              Made with <span className="text-[#B97343]">♥</span> in Hyderabad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function OurStorySection() {
  return (
    <section id="about" className="relative py-40 px-8 overflow-hidden" style={{ background: '#1C110A' }}>
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-[0.52] pointer-events-none"
      >
        <source src="/coffe_beans.mp4" type="video/mp4" />
      </video>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
        <div data-reveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#C88555]/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#C88555]">The Narrative</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-10 text-[#F5ECD7]">
            A Ritual Born in <br /><em>Hyderabad</em>
          </h2>
          <div className="space-y-8 font-body text-base text-[#F5ECD7]/50 leading-relaxed max-w-lg">
            <p className="text-lg text-[#F5ECD7]/80 italic mb-10">
              "At Sero, we believe in Third Wave Coffee — where every bean is respected, every pour is intentional, and every cup becomes a ritual."
            </p>
            <p>
              We source specialty beans, craft bold espressos, and create indulgent fusions like our signature Tiramisu Latte. 
            </p>
            <p>
              Nestled in Indira Nagar, Gachibowli, Sero is your calm third place — a warm space for deep conversations, focused work, or quiet moments of joy.
            </p>
          </div>
        </div>
        <div className="relative" data-reveal style={{ transitionDelay: '300ms' }}>
          <div className="aspect-[4/5] rounded-sm overflow-hidden border border-[#C88555]/10 p-4">
            <img 
              src="/barista_enhanced.webp" 
              alt="The Art of the Pour" 
              className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          {/* Decorative Gold Frame */}
          <div className="absolute -top-4 -right-4 w-32 h-32 border-t border-r border-[#C88555]/30 pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b border-l border-[#C88555]/30 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

function SignatureOfferings() {
  const items = [
    { name: 'Vietnamese Latte', desc: 'Strong espresso layered with sweet condensed milk over ice for an authentic bold ritual.', price: '239', img: '/viatnamese_latte.webp', highlighted: true },
    { name: 'Espresso Cranberry', desc: 'A visually striking mix of bold espresso over tart cranberry, offering a bright flavor balance.', price: '249', img: '/espresso_cranberry.webp' },
    { name: 'Coconut Espresso', desc: 'Double espresso poured over chilled coconut water for a smooth tropical contrast.', price: '249', img: '/coconut_espresso.webp' },
    { name: 'Spanish Latte', desc: 'A creamy iced latte sweetened with condensed milk for a smooth, indulgent finish.', price: '239', img: '/spanish_latte.webp' },
    { name: 'Espresso Sunrise', desc: 'Espresso layered with orange notes for a citrusy, refreshing ritual.', price: '249', img: '/espresso_sunrise.webp' },
    { name: 'Pour Over', desc: 'Clean, bright flavors extracted through slow manual brewing to highlight the coffee terroir.', price: '249', img: '/pour_over.webp' },
  ];

  return (
    <section id="offerings" className="py-40 px-8" style={{ background: '#1C110A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center" data-reveal>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#C88555]/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#C88555]">Our Craft</span>
            <div className="w-12 h-px bg-[#C88555]/40" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-[#F5ECD7]">
            Signature <em>Offerings</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {items.map((item, idx) => (
            <div 
              key={item.name} 
              className={`group cursor-pointer transition-all duration-500 rounded-sm p-3 md:p-2 ${item.highlighted ? 'shadow-[0_8px_32px_rgba(196,122,95,0.09)]' : ''} hover:shadow-[0_8px_32px_rgba(196,122,95,0.18)]`} 
              data-reveal 
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-6 border border-white/5 relative">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]" 
                  alt={item.name} 
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                   <span className={`font-display text-[9px] tracking-widest uppercase ${item.highlighted ? 'text-[#D27D67]' : 'text-[#C88555]'}`}>₹{item.price}</span>
                </div>
              </div>
              <div className="transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className={`font-display text-base md:text-lg mb-2 transition-colors duration-500 ${item.highlighted ? 'text-[#D27D67]' : 'text-[#F5ECD7] group-hover:text-[#C88555]'}`}>{item.name}</h3>
                <p className="font-body text-[10px] md:text-[11px] text-[#F5ECD7]/40 leading-relaxed italic line-clamp-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FusionFridays() {
  const fusions = [
    {
      title: 'The "Dirty" Kit Kat Shake',
      story: 'A decadent blend of creamy milkshake and crunchy Kit Kat wafers, elevated by a bold, "dirty" pour of our signature espresso.',
      image: '/dirty_kitkat_shake.webp'
    },
    {
      title: 'Oreo Mocha Crunch Frappe',
      story: 'A rich, ice-blended mocha ritual featuring crushed Oreo cookies and a velvety whipped cream cloud, topped with a cocoa crunch.',
      image: '/oreo_mocha_frappe.webp'
    },
    {
      title: 'Salted Caramel Cloud Brew',
      story: 'Our signature cold brew layered with a precise swirl of salted caramel and topped with a fluffy, aerated cloud foam.',
      image: '/caramel_cloud_brew.webp'
    }
  ];

  return (
    <section id="fusion-fridays" className="py-40 px-8 overflow-hidden" style={{ background: '#1C110A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12" data-reveal>
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#C88555]/40" />
              <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#C88555]">Weekly Specials</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-[#F5ECD7]">
              Fusion Fridays — Where <br /><em>Coffee Meets Dessert</em>
            </h2>
          </div>
          <p className="font-body text-base text-[#F5ECD7]/50 max-w-sm mb-0 italic">
            "Every week we transform classics into something unforgettable."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {fusions.map((fusion, idx) => (
            <div key={fusion.title} className="group" data-reveal style={{ transitionDelay: `${idx * 200}ms` }}>
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-10 border border-white/5 relative bg-white/[0.02]">
                <img 
                  src={fusion.image} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  alt={fusion.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C110A] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-all duration-500" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="font-display text-2xl text-[#F5ECD7] mb-4">{fusion.title}</h4>
                  <p className="font-body text-sm text-[#F5ECD7]/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    {fusion.story}
                  </p>
                </div>
              </div>
              <a href="#digital-menu" className="font-display text-[10px] tracking-[0.3em] uppercase text-[#C88555] border-b border-[#C88555]/20 pb-2 group-hover:border-[#C88555] transition-all">
                Taste the ritual
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TheSpace() {
  const testimonials = [
    {
      name: "Rohan M.",
      role: "Product Designer",
      text: "The only place in Gachibowli where I can truly find my flow. The natural light and the minimal aesthetic are a rare luxury.",
      image: "/customer1.png"
    },
    {
      name: "Sanya K.",
      role: "Writer",
      text: "Sero is my sanctuary. The quiet corners and the ritual of the pour-over make it the perfect escape from the city bustle.",
      image: "/barista_enhanced.png"
    }
  ];

  return (
    <section id="the-space" className="py-40 px-8" style={{ background: '#1C110A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-40">
          <div data-reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#C88555]/40" />
              <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#C88555]">The Sanctuary</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl mb-10 text-[#F5ECD7]">
              Your Third Place in <br /><em>Gachibowli</em>
            </h2>
            <p className="font-body text-lg leading-relaxed text-[#F5ECD7]/50 max-w-lg mb-12 italic">
              "Minimal design, maximum comfort. A warm space for focused work, deep conversations, or quiet moments of joy."
            </p>
            <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-12">
              <div>
                <p className="font-display text-[9px] tracking-[0.3em] uppercase text-[#C88555] mb-2">Ambience</p>
                <p className="font-body text-sm text-[#F5ECD7]/40">Calm, sunlit, and distraction-free.</p>
              </div>
              <div>
                <p className="font-display text-[9px] tracking-[0.3em] uppercase text-[#C88555] mb-2">Utility</p>
                <p className="font-body text-sm text-[#F5ECD7]/40">Work-friendly corners with seamless connectivity.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 h-[600px]" data-reveal style={{ transitionDelay: '300ms' }}>
            <div className="h-full overflow-hidden rounded-sm relative group border border-white/5">
              <img src="/space1_enhanced.png" alt="Sero Interior 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            </div>
            <div className="grid grid-rows-2 gap-6 h-full">
              <div className="overflow-hidden rounded-sm relative group border border-white/5">
                <img src="/space2_enhanced.png" alt="Sero Interior 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              </div>
              <div className="overflow-hidden rounded-sm relative group border border-white/5">
                <img src="/space3_enhanced.png" alt="Sero Interior 3" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-20 border-t border-white/5">
          {testimonials.map((t, idx) => (
            <div key={t.name} className="flex flex-col md:flex-row gap-10 items-center md:items-start" data-reveal style={{ transitionDelay: `${idx * 200}ms` }}>
              <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border border-[#C88555]/20 p-1">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div>
                <p className="font-body text-lg italic mb-6 leading-relaxed text-[#F5ECD7]/80">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-px bg-[#C88555]/40" />
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.3em] text-[#F5ECD7]">{t.name}</p>
                    <p className="font-display text-[9px] opacity-40 uppercase tracking-[0.2em] text-[#C88555]">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisitUs() {
  return (
    <section id="visit-us" className="py-40 px-8" style={{ background: '#1C110A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div data-reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#C88555]/40" />
              <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#C88555]">Visit Us</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl mb-12 text-[#F5ECD7]">
              Come Say <em>Hello</em>
            </h2>
            
            <div className="space-y-16 mb-20">
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-[#C88555] mb-4">Location</p>
                <p className="font-body text-lg text-[#F5ECD7]/80 leading-relaxed">
                  Indira Nagar, Gachibowli<br />Hyderabad, Telangana 500032
                </p>
              </div>
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-[#C88555] mb-4">The Ritual Hours</p>
                <p className="font-body text-sm text-[#F5ECD7]/60 leading-loose">
                  Monday – Friday: 7:30 AM – 10:30 PM<br />
                  Saturday – Sunday: 8:30 AM – 11:30 PM
                </p>
              </div>
              <div className="flex flex-wrap gap-10">
                <a href="tel:+910000000000" className="group">
                  <p className="font-display text-[9px] tracking-[0.3em] uppercase text-[#C88555] mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Call</p>
                  <p className="font-display text-sm text-[#F5ECD7]">+91 99999 88888</p>
                </a>
                <a href="https://wa.me/910000000000" className="group">
                  <p className="font-display text-[9px] tracking-[0.3em] uppercase text-[#C88555] mb-2 opacity-50 group-hover:opacity-100 transition-opacity">WhatsApp</p>
                  <p className="font-display text-sm text-[#F5ECD7]">Chat with us</p>
                </a>
              </div>
            </div>

            <div className="h-96 rounded-sm overflow-hidden border border-white/5 grayscale group hover:grayscale-0 transition-all duration-1000">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.273155743453!2d78.3615468!3d17.4466547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c1e874b%3A0xc3191630c722513c!2sSero%20Speciality%20Coffee!5e0!3m2!1sen!2sin!4v1714650000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.6)' }} 
                allowFullScreen={true} 
                loading="lazy" 
              />
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-12 md:p-20 rounded-sm" data-reveal style={{ transitionDelay: '300ms' }}>
            <h3 className="font-display text-4xl text-[#F5ECD7] mb-12">Reserve a <em>Table</em></h3>
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative">
                  <label className="block font-display text-[9px] tracking-[0.3em] uppercase text-[#C88555] mb-4">Date</label>
                  <input type="date" className="w-full bg-transparent border-b border-white/10 py-3 font-body text-sm text-[#F5ECD7] outline-none focus:border-[#C88555] transition-colors" />
                </div>
                <div className="relative">
                  <label className="block font-display text-[9px] tracking-[0.3em] uppercase text-[#C88555] mb-4">Time</label>
                  <select className="w-full bg-transparent border-b border-white/10 py-3 font-body text-sm text-[#F5ECD7] outline-none focus:border-[#C88555] transition-colors appearance-none bg-inherit">
                    <option className="bg-[#1C110A]">7:00 PM</option>
                    <option className="bg-[#1C110A]">8:00 PM</option>
                    <option className="bg-[#1C110A]">9:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <label className="block font-display text-[9px] tracking-[0.3em] uppercase text-[#C88555] mb-4">Guests</label>
                <select className="w-full bg-transparent border-b border-white/10 py-3 font-body text-sm text-[#F5ECD7] outline-none focus:border-[#C88555] transition-colors appearance-none bg-inherit">
                  <option className="bg-[#1C110A]">2 People</option>
                  <option className="bg-[#1C110A]">4 People</option>
                  <option className="bg-[#1C110A]">6+ People</option>
                </select>
              </div>
              <div className="relative">
                <label className="block font-display text-[9px] tracking-[0.3em] uppercase text-[#C88555] mb-4">Your Name</label>
                <input type="text" placeholder="e.g. Rahul Sharma" className="w-full bg-transparent border-b border-white/10 py-3 font-body text-sm text-[#F5ECD7] outline-none focus:border-[#C88555] transition-colors" />
              </div>
              <button type="submit" className="premium-button w-full mt-10 py-6 bg-[#B97343] text-[#1C110A] font-display text-[10px] tracking-[0.4em] uppercase">
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperiencesSection() {
  const upcoming = [
    {
      title: 'Coffee Lab Tasting',
      date: 'MAY 12, 2026',
      time: '11:00 AM',
      desc: 'An exploration of 10 unique varietals. Discover your perfect profile.',
      image: '/insta1.png'
    },
    {
      title: 'Sero x Dai-Nisho',
      date: 'MAY 18, 2026',
      time: '07:00 PM',
      desc: 'A fusion of Japanese culinary craft and specialty coffee rituals.',
      image: '/saffron.png'
    }
  ];

  const past = [
    { title: 'Coffee Rave', info: 'Sunrise beats & espresso', image: '/insta2.png' },
    { title: 'Grand Prix Live', info: 'F1 Screening & Pairings', image: '/space1_enhanced.png' },
    { title: 'Roasting Workshop', info: 'From bean to craft brew', image: '/barista_enhanced.png' }
  ];

  return (
    <section id="experiences" className="py-40 px-8" style={{ background: '#1C110A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-32" data-reveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#C88555]/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#C88555]">Sero Culture</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-[#F5ECD7]">
            Experiences at <em>Sero</em>
          </h2>
          <p className="font-body text-lg text-[#F5ECD7]/40">
            "More than coffee — join the ritual"
          </p>
        </div>

        <div className="mb-40">
          <h3 className="font-display text-[10px] tracking-[0.3em] uppercase text-[#C88555] mb-16 pb-6 border-b border-white/5">Upcoming Rituals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {upcoming.map((event, idx) => (
              <div key={event.title} className="group flex flex-col md:flex-row gap-10 items-center bg-white/[0.02] border border-white/5 p-10 rounded-sm hover:border-[#C88555]/20 transition-all duration-700" data-reveal style={{ transitionDelay: `${idx * 200}ms` }}>
                <div className="w-full md:w-1/3 aspect-square overflow-hidden rounded-sm">
                  <img src={event.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={event.title} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <p className="font-display text-[9px] tracking-widest text-[#C88555] uppercase">{event.date}</p>
                    <span className="font-body text-[10px] text-[#F5ECD7]/20 uppercase tracking-widest">{event.time}</span>
                  </div>
                  <h4 className="font-display text-2xl text-[#F5ECD7] mb-4">{event.title}</h4>
                  <p className="font-body text-sm text-[#F5ECD7]/40 leading-relaxed mb-8">{event.desc}</p>
                  <a href="https://instagram.com/cafe_sero" target="_blank" rel="noreferrer" className="premium-button inline-block font-display text-[9px] tracking-[0.3em] uppercase bg-[#C88555] text-[#1C110A] px-8 py-3">
                    DM us to join
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-40">
          <h3 className="font-display text-[10px] tracking-[0.3em] uppercase text-[#C88555] mb-16 pb-6 border-b border-white/5">Past Moments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {past.map((event, idx) => (
              <div key={event.title} className="group" data-reveal style={{ transitionDelay: `${idx * 200}ms` }}>
                <div className="aspect-video overflow-hidden rounded-sm mb-8 border border-white/5 relative bg-white/[0.01]">
                  <img src={event.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" alt={event.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C110A] to-transparent opacity-60" />
                </div>
                <h4 className="font-display text-lg text-[#F5ECD7] mb-2">{event.title}</h4>
                <p className="font-display text-[9px] text-[#C88555] uppercase tracking-widest opacity-40">{event.info}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.01] p-12 md:p-32 rounded-sm border border-white/5 relative overflow-hidden" data-reveal>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <h3 className="font-display text-4xl md:text-5xl text-[#F5ECD7] mb-10">Host Your <em>Ritual</em></h3>
              <p className="font-body text-base text-[#F5ECD7]/40 mb-16 leading-relaxed max-w-md">
                From private cupping sessions to creative workshops, our Gachibowli sanctuary provides the perfect minimalist backdrop for intentional gatherings.
              </p>
              <ul className="space-y-6">
                {['Custom Menu Curation', 'Pro Barista Support', 'Minimalist Architecture'].map(item => (
                  <li key={item} className="flex items-center gap-4 text-[10px] font-display tracking-widest uppercase text-[#C88555]">
                    <div className="w-1.5 h-1.5 rounded-full border border-[#C88555]/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <input type="text" placeholder="Name" className="bg-transparent border-b border-white/10 py-3 font-body text-sm text-[#F5ECD7] outline-none focus:border-[#C88555] transition-colors" />
                <input type="tel" placeholder="Contact" className="bg-transparent border-b border-white/10 py-3 font-body text-sm text-[#F5ECD7] outline-none focus:border-[#C88555] transition-colors" />
              </div>
              <select className="w-full bg-transparent border-b border-white/10 py-3 font-body text-sm text-[#F5ECD7] outline-none focus:border-[#C88555] transition-colors appearance-none bg-inherit">
                <option className="bg-[#1C110A]">Private cupping</option>
                <option className="bg-[#1C110A]">Workshop</option>
                <option className="bg-[#1C110A]">Creative Meetup</option>
              </select>
              <button className="premium-button w-full py-5 bg-[#B97343] text-[#1C110A] font-display text-[10px] tracking-[0.4em] uppercase">
                Enquire Now
              </button>
            </form>
          </div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C88555]/5 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

function MomentsSection() {
  const posts = [
    { image: '/insta1.webp', link: 'https://instagram.com/cafe_sero' },
    { image: '/space1_enhanced.webp', link: 'https://instagram.com/cafe_sero' },
    { image: '/frappe.webp', link: 'https://instagram.com/cafe_sero' },
    { image: '/insta2.webp', link: 'https://instagram.com/cafe_sero' },
    { image: '/space3_enhanced.webp', link: 'https://instagram.com/cafe_sero' },
    { image: '/barista_enhanced.webp', link: 'https://instagram.com/cafe_sero' },
  ];

  return (
    <section id="journal" className="py-40 px-8 overflow-hidden" style={{ background: '#1C110A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div data-reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#C88555]/40" />
              <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#C88555]">Journal</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-[#F5ECD7]">
              Moments Worth <em>Sipping</em>
            </h2>
          </div>
          <div data-reveal style={{ transitionDelay: '200ms' }}>
            <p className="font-body text-base text-[#F5ECD7]/50 max-w-sm mb-10 leading-relaxed italic">
              Tag us @cafe_sero for a chance to be featured in our monthly ritual highlight.
            </p>
            <a 
              href="https://instagram.com/cafe_sero" 
              target="_blank" 
              rel="noreferrer"
              className="font-display text-[10px] tracking-[0.4em] uppercase pb-2 border-b border-[#C88555]/20 hover:text-[#C88555] hover:border-[#C88555] transition-all"
              style={{ color: '#F5ECD7' }}
            >
              Follow our journey
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {posts.map((post, idx) => (
            <a 
              key={idx}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm border border-white/5 bg-white/[0.02]"
              data-reveal
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <img 
                src={post.image} 
                alt={`Sero Moment ${idx + 1}`} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C110A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C88555" strokeWidth="1.5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useScrollReveal();

  return (
    <div className="font-body relative">
      <ParticleBackground />
      <Nav />
      <Hero />
      <OurStorySection />
      <SignatureOfferings />
      <FusionFridays />
      <TheSpace />
      <ExperiencesSection />
      <CocktailSection />
      <FoodGrid />
      <DigitalMenu />
      <VisitUs />
      <MomentsSection />
      <Footer />
    </div>
  );
}

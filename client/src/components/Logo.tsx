import { useState, useEffect } from 'react';
import logoImage from '@assets/image-removebg-preview_1764013789708.png';

export default function Logo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed z-30 transition-all duration-300"
      style={{
        top: scrolled ? '0.75rem' : '2.5rem',
        left: scrolled ? '1.5rem' : '50%',
        transform: scrolled ? 'translateX(0)' : 'translateX(-50%)',
        width: scrolled ? '50px' : '120px',
        height: scrolled ? '50px' : '120px',
      }}
      data-testid="logo-container"
    >
      <img
        src={logoImage}
        alt="Heat & Eat Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

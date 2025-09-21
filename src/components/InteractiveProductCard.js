'use client';

import { useRef, useState } from 'react';
import ProductCard from './ProductCard';

const InteractiveProductCard = ({ product }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation angles (max 25 degrees for more dramatic effect)
    const rotateX = (mouseY / rect.height) * 25;
    const rotateY = (mouseX / rect.width) * 25;
    
    setMousePosition({ x: rotateX, y: rotateY });
    
    // Apply CSS custom properties with immediate effect
    cardRef.current.style.setProperty('--mouse-x', `${rotateX}deg`);
    cardRef.current.style.setProperty('--mouse-y', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mouse-x', '0deg');
      cardRef.current.style.setProperty('--mouse-y', '0deg');
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}

      className='col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4'
    >
      <ProductCard product={product} />
    </div>
  );
};

export default InteractiveProductCard;

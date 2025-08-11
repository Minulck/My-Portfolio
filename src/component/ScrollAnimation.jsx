import { useEffect, useRef, useState } from 'react';

const ScrollAnimation = ({ 
  children, 
  className = '', 
  delay = 0, 
  animationType = 'fadeUp', 
  stagger = false,
  staggerDelay = 100 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect(); // Cleanup observer
    };
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animationType) {
        case 'slideLeft':
          return 'opacity-0 -translate-x-12 scale-95 blur-sm';
        case 'slideRight':
          return 'opacity-0 translate-x-12 scale-95 blur-sm';
        case 'fadeUp':
        default:
          return 'opacity-0 translate-y-8 scale-95 blur-sm';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-none';
  };

  // If stagger is enabled and children is an array
  if (stagger && Array.isArray(children)) {
    return (
      <div ref={ref} className={className}>
        {children.map((child, index) => (
          <div
            key={index}
            className={`transition-all duration-600 ease-out will-change-transform will-change-opacity ${getAnimationClass()}`}
            style={{
              transitionDelay: `${delay + (isVisible ? index * staggerDelay : 0)}ms`
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out will-change-transform will-change-opacity ${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
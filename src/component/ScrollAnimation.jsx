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
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
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
    };
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animationType) {
        case 'slideLeft':
          return 'opacity-0 -translate-x-12';
        case 'slideRight':
          return 'opacity-0 translate-x-12';
        case 'fadeUp':
        default:
          return 'opacity-0 translate-y-8';
      }
    } else {
      return 'opacity-100 translate-y-0 translate-x-0';
    }
  };

  // If stagger is enabled and children is an array
  if (stagger && Array.isArray(children)) {
    return (
      <div ref={ref} className={className}>
        {children.map((child, index) => (
          <div
            key={index}
            className={`transition-all duration-1000 ease-out ${getAnimationClass()}`}
            style={{
              transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
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
      className={`transition-all duration-1000 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
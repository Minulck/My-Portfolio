import { useState, useEffect, Suspense, lazy } from 'react'
import './App.css'
import LoadingScreen from './component/LoadingScreen'
import NavBar from './component/NavBar/NavBar'
import About from './component/About/About'
import BlurBlob from './BlurBlob'

// Lazy load components for better performance
const Experience = lazy(() => import('./component/Experience/Experience'))
const Education = lazy(() => import('./component/Education/Education'))
const Work = lazy(() => import('./component/Work/Work'))
const Skills = lazy(() => import('./component/Skills/Skills'))
const Contact = lazy(() => import('./component/Contact/Contact'))
const Footer = lazy(() => import('./component/Footer/Footer'))

function App() {
  const [count, setCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Fix scroll position on page refresh and optimize loading
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Preload critical resources
    const preloadImage = new Image();
    preloadImage.src = '/src/assets/profile_round.png';
    
    // Also handle browser back/forward navigation
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Component fallback for lazy loading
  const ComponentFallback = () => (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8245ec]"></div>
    </div>
  );

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} bg-[#050414] min-h-screen`}>

        <BlurBlob position={{ top: '35%', left: '20%' }} size={{ width: '30%', height: '40%' }} />

        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

        <div className='relative pt-20'>
          <NavBar />
          <About />
          
          <Suspense fallback={<ComponentFallback />}>
            <Skills />
          </Suspense>
          
          <Suspense fallback={<ComponentFallback />}>
            <Education />
          </Suspense>
          
          <Suspense fallback={<ComponentFallback />}>
            <Experience />
          </Suspense>
          
          <Suspense fallback={<ComponentFallback />}>
            <Work />
          </Suspense>
          
          <Suspense fallback={<ComponentFallback />}>
            <Contact />
          </Suspense>
          
          <Suspense fallback={<ComponentFallback />}>
            <Footer />
          </Suspense>
        </div>

      </div>
    </>
  )
}

export default App

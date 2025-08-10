import { useState, useEffect } from 'react'
import './App.css'
import LoadingScreen from './component/LoadingScreen'
import NavBar from './component/NavBar/NavBar'
import About from './component/About/About'
import Experience from './component/Experience/Experience'
import Education from './component/Education/Education'
import Work from './component/Work/Work'
import Skills from './component/Skills/Skills'
import Testimonials from  './component/Testimonials/Testimonials'
import Contact from './component/Contact/Contact'
import Footer from './component/Footer/Footer'
import BlurBlob from './BlurBlob'
import BackgroundDots from './component/BackgroundDots'
import ScrollAnimation from './component/ScrollAnimation'

function App() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Force scroll to top on page load/reload
    window.scrollTo(0, 0);
    
    // Prevent scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      {!isLoading && <LoadingScreen onComplete={() => setIsLoading(true)} />}
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-50'} bg-[#050414] `}>

            <BlurBlob position={{ top: '35%', left: '20%' }} size={{ width: '30%', height: '40%' }} />
            <BackgroundDots />

            <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <div className='relative pt-20'>
              <NavBar />
              <ScrollAnimation>
                <About />
              </ScrollAnimation>
              <ScrollAnimation delay={100}>
                <Skills/>
              </ScrollAnimation>
              <ScrollAnimation delay={200}>
                <Work />
              </ScrollAnimation>
              <ScrollAnimation delay={100}>
                <Education />
              </ScrollAnimation>
              <ScrollAnimation delay={150}>
                <Experience />
              </ScrollAnimation>
              <ScrollAnimation delay={100}>
                <Testimonials />
              </ScrollAnimation>
              <ScrollAnimation delay={100}>
                <Contact />
              </ScrollAnimation>
              <Footer/>
            </div>

        </div>
    </>
  )
}

export default App

import { useState } from 'react'
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

function App() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {!isLoading && <LoadingScreen onComplete={() => setIsLoading(true)} />}
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-50'} bg-[#050414] `}>

            <BlurBlob position={{ top: '35%', left: '20%' }} size={{ width: '30%', height: '40%' }} />

            <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <div className='relative pt-20'>
              <NavBar />
              <About />
              <Skills/>
              <Work />
              <Education />
              <Experience />
              <Testimonials />
              <Footer/>
            </div>

        </div>
    </>
  )
}

export default App

import { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-dark min-h-screen">
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        <Navbar />
        <main>
          <Hero />
          <About />
          <Education />
          {/* Future sections will be added here */}
          <section id="portfolio" className="min-h-screen flex items-center justify-center"><p className="text-gray-600">Portfolio – coming soon</p></section>
          <section id="contact"   className="min-h-screen flex items-center justify-center"><p className="text-gray-600">Contact – coming soon</p></section>
          <section id="blogs"     className="min-h-screen flex items-center justify-center"><p className="text-gray-600">Blogs – coming soon</p></section>
        </main>
      </div>
    </MotionConfig>
  );
}

export default App;

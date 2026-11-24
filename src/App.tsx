import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      <main>
        <Hero />
        {/* Future sections will be added here */}
        <section id="about"      className="min-h-screen flex items-center justify-center"><p className="text-gray-600">About – coming soon</p></section>
        <section id="portfolio"  className="min-h-screen flex items-center justify-center"><p className="text-gray-600">Portfolio – coming soon</p></section>
        <section id="experience" className="min-h-screen flex items-center justify-center"><p className="text-gray-600">Experience – coming soon</p></section>
        <section id="contact"    className="min-h-screen flex items-center justify-center"><p className="text-gray-600">Contact – coming soon</p></section>
      </main>
    </div>
  );
}

export default App;

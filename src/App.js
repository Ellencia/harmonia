import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Spaces from './pages/Spaces';
import Join from './pages/Join';
import Reservation from './pages/Reservation';
import './App.css';

function MainLayout() {
  return (
    <>
      <Home />
      <About />
      <Spaces />
      <Join />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/reservation" element={<Reservation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;

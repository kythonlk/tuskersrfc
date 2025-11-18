import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Fixtures from './pages/Fixtures';
import News from './pages/News';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Membership from './pages/Membership';
import Sponsorship from './pages/Sponsorship';
import Contact from './pages/Contact';
import Policies from './pages/Policies';
import MembershipRegister from './pages/MembershipReg';
import WhatsAppChat from './components/whatsapp';
import SingleMatch from './pages/SingleMatch';
import SingleNews from './pages/SingleNews';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-rajdhani">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/players" element={<Players />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/membership-reg" element={<MembershipRegister />} />
            <Route path="/sponsorship" element={<Sponsorship />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/match/:id" element={<SingleMatch />} />
            <Route path="/news/:id" element={<SingleNews />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <WhatsAppChat />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

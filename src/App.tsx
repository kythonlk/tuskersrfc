import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EventSingle from './pages/EventSingle';
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
import MedicalClearance from './pages/Medical';
import TeamPage from './pages/TeamPages';
import { useLayoutEffect } from 'react';
import EventForm from './pages/EventForm';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import MembersList from './pages/admin/MembersList';
import EventsList from './pages/admin/EventsList';
import EventEditor from './pages/admin/EventEditor';
import MemberEditor from './pages/admin/MemberEditor';
import FixturesList from './pages/admin/FixturesList';
import FixtureEditor from './pages/admin/FixtureEditor';
import NewsList from './pages/admin/NewsList';
import NewsEditor from './pages/admin/NewsEditor';
import PlayersList from './pages/admin/PlayersList';
import PlayerEditor from './pages/admin/PlayerEditor';
import MedicalClearanceList from './pages/admin/MedicalClearanceList';
import EventSubmissionsList from './pages/admin/EventSubmissionsList';
import AdminRoute from './components/AdminRoute';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

function App() {

  return (
    <Router>
      <Wrapper>
        <div className="min-h-screen flex flex-col font-rajdhani">
          <Header />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/event/:id" element={<EventSingle />} />
              <Route path="/event/:id/register" element={<EventForm />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/medical-clearance" element={<MedicalClearance />} />
              <Route path="/teams/:type" element={<TeamPage />} />
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
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="members" element={<MembersList />} />
                  <Route path="members/:id" element={<MemberEditor />} />
                  <Route path="events" element={<EventsList />} />
                  <Route path="events/new" element={<EventEditor />} />
                  <Route path="events/:id" element={<EventEditor />} />
                  <Route path="fixtures" element={<FixturesList />} />
                  <Route path="fixtures/new" element={<FixtureEditor />} />
                  <Route path="fixtures/:id" element={<FixtureEditor />} />
                  <Route path="news" element={<NewsList />} />
                  <Route path="news/new" element={<NewsEditor />} />
                  <Route path="news/:id" element={<NewsEditor />} />
                  <Route path="players" element={<PlayersList />} />
                  <Route path="players/new" element={<PlayerEditor />} />
                  <Route path="players/:id" element={<PlayerEditor />} />
                  <Route path="medical" element={<MedicalClearanceList />} />
                  <Route path="submissions" element={<EventSubmissionsList />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <WhatsAppChat />
          <Footer />
        </div>
      </Wrapper>
    </Router>
  );
}

export default App;

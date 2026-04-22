import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Tours from './pages/Tours';
import Guide from './pages/Guide';
import Article from './pages/Article';
import FAQ from './pages/FAQ';

import Guestbook from './pages/Guestbook';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="enshi-tours" element={<Tours />} />
            <Route path="enshi-travel-guide" element={<Guide />} />
            <Route path="enshi-travel-guide/:slug" element={<Article />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="guestbook" element={<Guestbook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

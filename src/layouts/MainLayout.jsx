import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from '../components/vibe/layout/AnnouncementBar';
import Navbar from '../components/vibe/layout/Navbar';
import MobileMenu from '../components/vibe/layout/MobileMenu';
import SearchOverlay from '../components/vibe/layout/SearchOverlay';
import CartDrawer from '../components/vibe/layout/CartDrawer';
import Footer from '../components/vibe/layout/Footer';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-ink flex flex-col">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

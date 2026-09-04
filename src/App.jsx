import React, { useState, useEffect } from 'react';
import LiveTicker from './components/LiveTicker';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustMarquee from './components/TrustMarquee';
import StatsSection from './components/StatsSection';
import Leaderboard from './components/Leaderboard';
import VerificationSimulator from './components/VerificationSimulator';
import MarketplaceSection from './components/MarketplaceSection';
import ValuationCalculator from './components/ValuationCalculator';
import ArchitectureSection from './components/ArchitectureSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import StartupModal from './components/Modals/StartupModal';
import DealRoomModal from './components/Modals/DealRoomModal';
import CommandPalette from './components/Modals/CommandPalette';
import Toasts from './components/Toasts';

export default function App() {
  const [currency, setCurrency] = useState('INR');
  const [theme, setTheme] = useState(() => localStorage.getItem('fl_theme') || 'light');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fl_theme', theme);
  }, [theme]);

  const handleOpenVerify = () => {
    const el = document.getElementById('verify-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Grids & Ambient Lighting */}
      <div className="bg-grid-ambient" aria-hidden="true" />
      <div className="ambient-blue-glow" aria-hidden="true" />

      {/* Live Activity Ticker */}
      <LiveTicker />

      {/* Navigation Header */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        theme={theme}
        setTheme={setTheme}
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenVerify={handleOpenVerify}
      />

      {/* Hero Section with Interactive Live Revenue Dashboard */}
      <main>
        <HeroSection
          currency={currency}
          onSelectStartup={(s) => setSelectedStartup(s)}
          onOpenVerify={handleOpenVerify}
        />

        {/* Trust Marquee */}
        <TrustMarquee />

        {/* Stats Counter */}
        <StatsSection currency={currency} />

        {/* Verified Startup Leaderboard Directory */}
        <Leaderboard
          currency={currency}
          onSelectStartup={(s) => setSelectedStartup(s)}
        />

        {/* Interactive 3-Step Verification Simulator */}
        <VerificationSimulator currency={currency} />

        {/* Micro-Acquisition Marketplace */}
        <MarketplaceSection
          currency={currency}
          onOpenDealRoom={(deal) => setSelectedDeal(deal)}
        />

        {/* Startup Valuation Calculator */}
        <ValuationCalculator currency={currency} />

        {/* Fintech Architecture & Triple-Lock Trust */}
        <ArchitectureSection />

        {/* Testimonials Wall of Proof */}
        <TestimonialsSection />

        {/* Transparent Pricing Plans */}
        <PricingSection
          currency={currency}
          onOpenVerify={handleOpenVerify}
        />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Startup Financial Audit Drawer / Modal */}
      <StartupModal
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
        onOpenDeal={(s) => {
          setSelectedStartup(null);
          setSelectedDeal({ startupId: s.id, title: s.name, askingPrice: s.askingPrice, ttmRevenue: s.arr });
        }}
        currency={currency}
      />

      {/* Acquisition Deal Room NDA Modal */}
      <DealRoomModal
        deal={selectedDeal}
        startup={selectedDeal ? selectedStartup : null}
        onClose={() => setSelectedDeal(null)}
        currency={currency}
      />

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onSelectStartup={(s) => setSelectedStartup(s)}
        currency={currency}
      />

      {/* Live Toast Stream */}
      <Toasts />
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Zm91bmRlcmxlZGdlci1jbGVyay1hdXRoLTE4LmNsZXJrLmFjY291bnRzLmRldiQ";

// Custom Clerk theme matching FounderLedger branding (White, Royal Blue #2563EB, Inter font)
const clerkAppearance = {
  layout: {
    socialButtonsPlacement: 'top',
    socialButtonsVariant: 'blockButton',
    logoPlacement: 'inside'
  },
  variables: {
    colorPrimary: '#2563EB',
    colorText: '#090E1A',
    colorTextSecondary: '#475569',
    colorBackground: '#FFFFFF',
    colorInputBackground: '#F8FAFC',
    colorInputBorder: '#E2E8F0',
    colorInputText: '#090E1A',
    fontFamily: "'Inter', sans-serif",
    borderRadius: '12px'
  },
  elements: {
    card: {
      boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(226, 232, 240, 0.8)',
      borderRadius: '20px'
    },
    formButtonPrimary: {
      backgroundColor: '#2563EB',
      fontSize: '0.875rem',
      fontWeight: 600,
      '&:hover': {
        backgroundColor: '#1D4ED8'
      }
    },
    socialButtonsBlockButton: {
      borderColor: '#E2E8F0',
      '&:hover': {
        backgroundColor: '#F8FAFC'
      }
    },
    footerActionLink: {
      color: '#2563EB',
      fontWeight: 600
    }
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={clerkAppearance}>
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);

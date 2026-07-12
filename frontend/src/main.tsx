import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import '@fontsource/playfair-display';
import './index.css'

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fee', color: 'red' }}>
          <h2>Something went wrong.</h2>
          <details open style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// Retrieve Clerk publishable key from environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        {PUBLISHABLE_KEY ? (
          <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            appearance={{
              variables: {
                fontFamily: '"Geist Sans", sans-serif',
                colorPrimary: '#10b981',
                colorBackground: '#FDFBF7',
                colorText: '#2D2B2A',
                colorInputText: '#2D2B2A',
                borderRadius: '0.5rem',
              }
            }}
          >
            <App />
          </ClerkProvider>
        ) : (
          <App />
        )}
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

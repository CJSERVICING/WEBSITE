import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import { ErrorBoundary } from './components/ErrorBoundary'
import './styles.css'

// Mark that the app module loaded
window.__appStarted = true;

// Log initialization start
console.log('[CJ] App initialization starting...');

// Helper to show errors in UI even if console is closed
function showErrorUI(title: string, message: string, details: string = '') {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui, -apple-system, sans-serif; background: #f5f5f5;">
        <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px; margin: 20px;">
          <h1 style="margin: 0 0 10px; color: #d32f2f; font-size: 24px; font-weight: bold;">${title}</h1>
          <p style="margin: 0 0 20px; color: #666; font-size: 16px;">${message}</p>
          ${details ? `<details style="margin-top: 20px; text-align: left;"><summary style="cursor: pointer; color: #666; font-size: 14px; font-weight: 500;">Technical Details</summary><pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; color: #d32f2f; font-size: 12px; margin: 10px 0 0 0;">${details.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre></details>` : ''}
          <button onclick="location.reload()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 20px;">Refresh Page</button>
        </div>
      </div>
    `
  }
}

// Track script loading
window.addEventListener('error', (e) => {
  console.error('[CJ] Global error:', e.error);
}, true);

window.addEventListener('unhandledrejection', (e) => {
  console.error('[CJ] Unhandled rejection:', e.reason);
});

// Ensure CSP headers aren't blocking execution
if (typeof window === 'undefined') {
  console.error('[CJ] Window object not available - fatal error');
}

// Check if DOM is ready
function initializeApp() {
  console.log('[CJ] App initialization continuing...');
  
  try {
    const rootElement = document.getElementById('root')
    if (!rootElement) {
      console.error('[CJ] Root element not found');
      showErrorUI(
        'Root Element Not Found',
        'The application container is missing from the HTML.',
        'The <div id="root"></div> element was not found in the page.'
      );
      return
    }

    console.log('[CJ] Creating router...');
    const router = getRouter()

    console.log('[CJ] Rendering React app...');
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </React.StrictMode>
    )
    console.log('[CJ] React app rendered successfully');
  } catch (error) {
    console.error('[CJ] Fatal initialization error:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    showErrorUI(
      'Failed to Load Application',
      'The application encountered a critical error during initialization.',
      `${errorMsg}\n\n${errorStack}`
    );
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  console.log('[CJ] DOM still loading, waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  console.log('[CJ] DOM already ready, initializing now...');
  initializeApp()
}

// Log when page is fully loaded
window.addEventListener('load', () => {
  console.log('[CJ] Page fully loaded');
});

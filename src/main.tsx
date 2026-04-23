import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import { ErrorBoundary } from './components/ErrorBoundary'
import './styles.css'

// Ensure CSP and security headers are respected
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}

function initializeApp() {
  try {
    const rootElement = document.getElementById('root')
    if (!rootElement) {
      throw new Error('Root element not found in HTML')
    }

    const router = getRouter()

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </React.StrictMode>
    )
  } catch (error) {
    console.error('Failed to mount React app:', error)
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui, -apple-system, sans-serif; background: #f5f5f5;">
          <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px;">
            <h1 style="margin: 0 0 10px; color: #333; font-size: 24px;">Application Failed to Load</h1>
            <p style="margin: 0 0 20px; color: #666; font-size: 16px;">We're having trouble loading the application. Please try refreshing the page.</p>
            <button onclick="location.reload()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px;">Refresh Page</button>
            <details style="margin-top: 20px; text-align: left;">
              <summary style="cursor: pointer; color: #666; font-size: 14px;">Error Details</summary>
              <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; color: #d32f2f; font-size: 12px;">${error instanceof Error ? error.message : String(error)}</pre>
            </details>
          </div>
        </div>
      `
    }
    // Also log to console for debugging
    if (import.meta.env.DEV) {
      console.error('Full error:', error)
    }
  }
}

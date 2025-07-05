import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

// PWA Install Prompt
let deferredPrompt: any

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt available')
  e.preventDefault()
  deferredPrompt = e
  
  // Show install button or banner
  const installButton = document.getElementById('pwa-install-btn')
  if (installButton) {
    installButton.style.display = 'block'
    
    installButton.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt()
        
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the PWA install prompt')
          } else {
            console.log('User dismissed the PWA install prompt')
          }
          deferredPrompt = null
        })
      }
    })
  }
})

// PWA Install Success
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed successfully')
  // Hide install button
  const installButton = document.getElementById('pwa-install-btn')
  if (installButton) {
    installButton.style.display = 'none'
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
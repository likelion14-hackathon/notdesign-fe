import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import App from '@/App'
import { queryClient } from '@/shared/api/queryClient'
import '@/shared/styles/index.css'

if (import.meta.env.DEV && import.meta.env.VITE_TEST_TOKEN) {
  if (!localStorage.getItem('accessToken')) {
    localStorage.setItem('accessToken', import.meta.env.VITE_TEST_TOKEN)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)

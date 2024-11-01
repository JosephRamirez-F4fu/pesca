import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  AppRouter } from '@/'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)

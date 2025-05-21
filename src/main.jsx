import { I18nextProvider } from 'react-i18next'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './input.css'
import i18n from './i18n'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>
)

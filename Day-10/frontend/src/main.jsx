import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import {AuthProvider} from './features/auth/auth.context.jsx'
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </BrowserRouter>
)

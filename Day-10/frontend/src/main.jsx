import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import {AuthProvider} from './features/auth/auth.context.jsx'
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import './index.scss'
import { SongProvider } from './features/MoodifySongs/song.context.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <SongProvider> <App />
      <Toaster position="bottom-right" reverseOrder={false} />
      </SongProvider>
    </AuthProvider>
  </BrowserRouter>
)

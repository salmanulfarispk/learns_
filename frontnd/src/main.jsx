import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import { CssBaseline } from "@mui/material"
import App from './App.jsx'
import { Message } from './components/Message.jsx';


createRoot(document.getElementById('root')).render(
  <>
        <CssBaseline/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/message' element={<Message />}/>
      </Routes>
    </BrowserRouter>
  </>,
)

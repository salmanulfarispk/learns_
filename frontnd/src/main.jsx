import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { Message } from './components/Message.jsx';
import { Login } from './components/Login.jsx';


createRoot(document.getElementById('root')).render(
  <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/message' element={<Message />}/>
        <Route path="/login" element={<Login />} />
       


      </Routes>
    </BrowserRouter>
  </>,
)

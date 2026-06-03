import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position='bottom-right'
    />
  </BrowserRouter>,
)

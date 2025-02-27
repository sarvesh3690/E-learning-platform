import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./styles/flexboxgrid.min.css";
// import "./styles/index.css"
import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// reportWebVitals();

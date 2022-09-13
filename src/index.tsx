import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
);

reportWebVitals();

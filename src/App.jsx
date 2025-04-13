// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';

export default function App() {
   return (
      <Router>
         <Routes>
            {/* Páginas generales */}
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </Router>
   )
}
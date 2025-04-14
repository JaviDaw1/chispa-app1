// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Preference from './pages/Preference';
import Match from './pages/Match';

export default function App() {
   return (
      <Router>
         <Routes>
            {/* Páginas generales */}
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/preference" element={<Preference/>} />
            <Route path="/match" element={<Match/>} />
         </Routes>
      </Router>
   )
}
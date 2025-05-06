// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';
import Preference from './pages/Preference';
import Match from './pages/Match';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import ChatsPage from './pages/ChatsPage';

export default function App() {
   return (
      <Router>
         <Routes>
            {/* Páginas generales */}
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/preference" element={<Preference/>} />
            <Route path="/matches" element={<Match/>} />
            <Route path="/chat/:matchId" element={<Chat />} />
            <Route path="/messages" element={<ChatsPage />} />
         </Routes>
      </Router>
   )
}
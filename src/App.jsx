import React, { useEffect } from 'react';
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
import Error404 from './pages/Error404';
import Settings from './pages/Settings';
import BlockedUsers from './pages/BlockedUsers';
import AuthService from './services/AuthService';
import Language from './pages/Language';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';

const authService = new AuthService();

export default function App() {
  useEffect(() => {
    const user = authService.getUserInfo();
    if (user) {
      authService.setupOnlineStatusHandlers();
    }

    return () => {
      authService.cleanupOnlineStatusHandlers();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/preference" element={<Preference />} />
        <Route path="/matches" element={<Match />} />
        <Route path="/chat/:matchId" element={<Chat />} />
        <Route path="/messages" element={<ChatsPage />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/blockedUsers" element={<BlockedUsers />} />
        <Route path="/settings/languages" element={<Language />} />
        <Route path="/settings/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}
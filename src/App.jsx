// The main entry point for the application, setting up routes and handling authentication.
import { useEffect } from 'react';
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
import ResetPassword from './pages/ResetPassword';

const authService = new AuthService();

/**
 * App component serves as the main entry point for the application.
 * It sets up the routing and handles user authentication.
 * @returns {JSX.Element} The main application component.
 */
export default function App() {
  useEffect(() => {
    const currentUser = authService.getUserInfo();
    if (currentUser) {
      authService.setupOnlineStatusHandlers();
    }

    return () => {
      authService.cleanupOnlineStatusHandlers();
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Error404 />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Profile Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/create-profile" element={<CreateProfile />} />

          {/* Application Routes */}
          <Route path="/preference" element={<Preference />} />
          <Route path="/matches" element={<Match />} />
          <Route path="/chat/:matchId" element={<Chat />} />
          <Route path="/messages" element={<ChatsPage />} />

          {/* Settings Routes */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/blocked-users" element={<BlockedUsers />} />
          <Route path="/settings/languages" element={<Language />} />
          <Route path="/settings/change-password" element={<ChangePassword />} />
        </Routes>
      </Router>
    </>
  );
}


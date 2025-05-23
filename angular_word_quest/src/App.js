import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import PlayPage from './pages/PlayPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import { GameProvider } from './contexts/GameContext';
import './App.css';

function App() {
  return (
    <Router>
      <GameProvider>
        <div className="app">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/play" element={<PlayPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </GameProvider>
    </Router>
  );
}

export default App;
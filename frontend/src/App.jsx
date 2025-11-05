import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default App;
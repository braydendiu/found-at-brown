import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './fonts.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PostItem from './pages/PostItem';
import ItemDetail from './pages/ItemDetail';
import Chat from './pages/Chat'; 
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-item" element={<PostItem />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/chat/:receiverId/:senderId" element={<Chat />} /> {/* Route for chat */}
      </Routes>
    </Router>
  );
};

export default App;

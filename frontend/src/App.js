import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css'
import ProductPage from './pages/ProductPage';
import Favorites from './pages/Favorites';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
  );
};

export default App;

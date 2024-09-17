import React from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/HomePage';

function App() {


  return (
    <div className="App">
      {/* thanh dieu huong */}
      <Navbar />

      <HomePage />
      {/* chan Trang */}
      <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';

function App() {
  return (
    <div className="App">
      {/* thanh dieu huong */}
      <Navbar />
      {/* chan Trang */}
      <Footer />
    </div>
  );
}

export default App;

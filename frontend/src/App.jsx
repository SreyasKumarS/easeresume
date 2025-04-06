import React from 'react';
import { Outlet } from 'react-router-dom';  
import { ToastContainer } from 'react-toastify';
import Header from './components/header';
import Footer from './components/footer';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top navigation bar */}
      <Header />

      {/* Global toast messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Main content area */}
      <main style={{ flex: 1 }}>
        <Outlet /> {/* Render current route screen */}
      </main>

      {/* Sticky footer */}
      <Footer />
    </div>
  );
};

export default App;

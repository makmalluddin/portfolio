import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/homes/Main';
import Navbar from './pages/Navbar';
import NotFound from './pages/NotFound';
import CertificationDetail from './pages/slug/CertificationDetail';
import Footer from './pages/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-bg-primary'>
        {/* Navigation Bar  */}
        <Navbar />

        {/* Main Content */}
        <main className='w-full'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/certification/slug' element={<CertificationDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

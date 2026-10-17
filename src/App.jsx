import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/homes/Main';
import Navbar from './pages/Navbar';

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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

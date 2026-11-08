import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/homes/Main';
import Navbar from './pages/Navbar';
import NotFound from './pages/NotFound';
import Footer from './pages/Footer';
import ProjectDetailWrapper from './pages/wrapper/ProjectDetailWrapper';
import ExperienceDetailWrapper from './pages/wrapper/ExperienceDetailWrapper';
import CertificationPage from './pages/homes/subpages/CertificationPage';
import ExperiencePage from './pages/homes/subpages/ExperiencePage';

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
            <Route path='/projects/:slug' element={<ProjectDetailWrapper />} />
            <Route path="/experience/:slug" element={<ExperienceDetailWrapper />} />
            <Route path="/certifications" element={<CertificationPage />} />
            <Route path="/experiences" element={<ExperiencePage />} />
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

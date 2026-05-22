import React from 'react'
import { Suspense, lazy } from 'react';
const Navbar = lazy(() => import('./component/Navbar'));
const Main = lazy(() => import('./session/Main'));
const Experience = lazy(() => import('./session/Experience'));
const Skills = lazy(() => import('./session/Skills'));
const Projects = lazy(() => import('./session/Projects'));
const Contact = lazy(() => import('./session/Contact'));
const BigContent = lazy(() => import('./layout/BigContent'));
const Footer = lazy(() => import('./session/Footer'));
const Certification = lazy(() => import('./session/Certification'));


function App() {
  return (
    <div >
      <Suspense fallback={<div className="h-screen bg-black" />}/>
      <BigContent>
        <Navbar />
        <Main />
        <Experience />
        <Skills />
        <Certification />
        <Projects/>
        <Contact />
        <Footer/>
      </BigContent>
    </div>
  )
}

export default App
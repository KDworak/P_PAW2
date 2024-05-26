"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
//import signIn from './login/page'
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) { 
        setIsOpen(false); 
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-center shadow-lg">
      {!isOpen && (
        <div>
          <h1 className="text-myCol font-bold text-3xl p-8">Galeria</h1>
        </div>
      )}
      <div className={`flex flex-col lg:flex-row lg:justify-center lg:mx-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <Link href="/" className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">Zdjęcia</Link>
        <Link href="/addImage" className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">Dodaj zdjęcie</Link>
        <Link href="/login" className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">Logowanie</Link>
        <Link href="/register" className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">Rejestracja</Link>
        {/*<Link href={`${!signIn ? "/userImages" : "#"}`} className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">Moje Zdjęcia</Link>*/}
      </div>
      <button onClick={toggleMenu} className="block absolute right-5 top-5 lg:hidden p-4">
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Menu;
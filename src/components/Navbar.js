import React from 'react';

import '../assets/styles/components/Navbar.css';

const Navbar = () => {
  return (
    <div id='navbar'>
      <div className='links'>
        <a className={window.location.pathname === '/' ? 'active' : ''} href="/">BCD Generator</a>
        <a className={window.location.pathname === '/translator' ? 'active' : ''} href="/translator">Densely Packed BCD Translator</a>
      </div>
      <div className='title'>
        <h1>Group 3: BCD Converter</h1>
      </div>
      <div className='space'></div>
    </div>
  )
}

export default Navbar;
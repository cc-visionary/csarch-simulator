import React from 'react';

import information from '../assets/images/information.png';

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
      <div className='space'><a href='/group-members'><img src={information} alt='Group Members' /></a></div>
    </div>
  )
}

export default Navbar;
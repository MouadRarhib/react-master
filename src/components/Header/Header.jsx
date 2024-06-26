// src/Header.js
import React from 'react';
import './Header.css';  // Assuming you have some CSS for styling

function Header(){
  return (
    <header className="header">
          <div className="logo">
            <h1>Task Manager</h1>
          </div>
          <nav className="navigation">
            <ul>
              <li><a href="#boards">Boards</a></li>
              <li><a href="#templates">Templates</a></li>
              <li><a href="#home">Home</a></li>
            </ul>
          </nav>
          
          <div className='search-profile'>
              <div className="search-bar">
                      <input type="text" placeholder="Search..." />
              </div>
           
          </div>
        
    </header>
  );
};

export default Header;
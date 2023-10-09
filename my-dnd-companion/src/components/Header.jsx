import React from 'react'
import Banner from './Banner'
import NavBar from './NavBar'
import './Header.css'

const Header = () => {
  return (
    <div id='header'>
        <Banner />
        <NavBar />
    </div>
  )
}

export default Header
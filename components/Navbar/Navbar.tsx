import React from 'react'
import {images,variable} from "../../constants";
import "./Navbar.module.scss";

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img 
        src={images.logo.src} 
        alt="logo" 
        className="" />
      </div>
      <ul className='app__navbar-links'>
        {variable.navbarConstants.map((item,index)=>(
          <li className='app__flex p-text' key={`link-${index}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar

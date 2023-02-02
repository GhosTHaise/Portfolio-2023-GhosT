import React from 'react'
import {images,variable} from "../../constants";

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav>
      <div>
        <img 
        src={images.logo.src} 
        alt="logo" 
        className="" />
      </div>
      <ul>
        {variable.navbarConstants.map((item,index)=>(
          <li key={`link-${index}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar

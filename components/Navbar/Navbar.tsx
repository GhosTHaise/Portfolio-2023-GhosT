import React from 'react'
import {images} from "../../constants";
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
    </nav>
  )
}

export default Navbar
import React from 'react'
import {images,variable} from "../../constants";
import styles from "./Navbar.module.scss";

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className={styles.app__navbar}>
      <div className={styles.app__navbar_logo}>
        <img 
        src={images.logo.src} 
        alt="logo" 
        className="" />
      </div>
      <ul className={styles.app__navbar_links}>
        {variable.navbarConstants.map((item,index)=>(
          <li className={styles.app__flex && styles.p_text} key={`link-${index}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar

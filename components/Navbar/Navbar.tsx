import {useState} from 'react'
import {images,variable} from "../../constants";
import styles from "./Navbar.module.scss";
import {HiMenuAlt4,HiX} from "react-icons/hi";
import {motion as m} from "framer-motion";

type Props = {}

const Navbar = (props: Props) => {

  const [toggle, setToggle] = useState(false)

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
      <div className={styles.app__navbar_menu}>
          <HiMenuAlt4 onClick={()=> setToggle(true)}/>
          {toggle
              && 
            (
              <m.div
              whileInView={{ x : [300,0]}}
              transition={{ duration : .85,ease : "easeOut"}}
              style={{backgroundImage : `url(${images.bgWhite.src})`}}
              >
                  <HiX onClick={()=> setToggle(false)} />
                  <ul>
                      {variable.navbarConstants.map((item,index)=>(
                          <li className={styles.app__flex && styles.p_text} key={`${index}`}>
                            <a href={`#${item}`} onClick={() =>setToggle(false)}>{item}</a>
                          </li>
                      ))}
                  </ul>
              </m.div>
            )}
      </div>
    </nav>
  )
}

export default Navbar

import React from 'react'
import {motion as m} from "framer-motion";
import {images} from "../../constants";
import styles from "./Header.module.scss";
type Props = {}

function Header({}: Props) {
  return (
    <div className={styles.app__Header && styles.app__flex}>
        <m.div
          whileInView={{x : [-100,0],opacity : [0,1]}}
          transition={{duration : .5}}
          className={styles.app__header_info}
        >
            
        </m.div>
    </div>
  )
}

export default Header
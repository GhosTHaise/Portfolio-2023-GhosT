import React from 'react'
import Image from 'next/image';
import {motion as m} from "framer-motion";
import {images} from "../../constants";
import styles from "./Header.module.scss";
type Props = {}

function Header({}: Props) {
  return (
    <div className={styles.app__Header && styles.app__flex}>
        <m.div
          whileInView={{x : [-100,0],opacity : [0,1]}}
          transition={{duration : 0.5}}
          className={styles.app__header_info}
        >
            <div className={styles.app__header_badge}>
                <div className={`app__flex ${styles.badge_cmp}`}>
                      <span>

                      </span>
                      <div className='ml-[20]'>
                          <p className="p-text">
                            Hello,I am
                          </p>
                          <h1 className='head-text'>
                                Fitiavana
                          </h1>
                      </div>
                </div>
                <div className={`${styles.tag_cmp} app__flex`}>
                      <p className="p-text">
                            Fullstack Developper
                      </p>
                      <p className="p-text">
                            Freelancer
                      </p>
                </div>
            </div>
        </m.div>
        <m.div
        whileInView={{opacity : [0,1]}}
        transition={{duration : 0.5,delayChildren : 0.5}}
        className={styles.app__header_img}>
            <Image 
                src={images.profile.src} 
                alt="profile_bg" 
                className='' />
        </m.div>
        <m.div>

        </m.div>
    </div>
  )
}

export default Header
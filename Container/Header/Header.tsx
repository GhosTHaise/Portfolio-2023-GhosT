import React from 'react'
import Image from 'next/image';
import {motion as m} from "framer-motion";
import {images} from "../../constants";
import styles from "./Header.module.scss";
type Props = {}

function Header({}: Props) {
  const scaleVariants = {
    WhileInView:{
      scale : [0,1],
      opacity : [0,1],
      transition : {
          duration  :1,
          ease : "easeInOut"
       }
    }
  }
  return (
    <div id={styles.home} 
    className={`${styles.app__Header} app__flex`}
    style={{backgroundImage : `url(${images.bgIMG})`}}
    >
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
            <img 
                src={images.profile.src} 
                alt="profile_bg" 
                className='' />
            <m.img 
            src={images.circle.src}
            alt="profile_circle"
            whileInView={{scale : [0,1]}}
            transition={{duration : 1 ,ease:"easeInOut"}}
            className={styles.overlay_circle}
            />
        </m.div>
        <m.div
        variants={scaleVariants}
        whileInView={scaleVariants.WhileInView}
        className={styles.app__header_circle}
        >
          {
            [
              images.flutter.src,
              images.redux.src,
              images.sass.src].map((circle,index)=>(
                <div key={`circle-${index.toString()}`} className={`${styles.circle_cmp} app__flex`}>
                    <img 
                    src={circle} 
                    alt={`circle-${index.toString()}`} 
                    className=""/>
                </div>  
            ))
          }
        </m.div>
    </div>
  )
}

export default Header
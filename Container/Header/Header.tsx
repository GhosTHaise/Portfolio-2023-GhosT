import React from 'react'
import { images } from "../../constants";
import styles from "./Header.module.scss";
import { AppWrap } from '@/wrapper';
import { MotionDiv, MotionImage } from '@/components/motionDiv';
import Image from 'next/image';
type Props = {}

function Header({ }: Props) {
  const scaleVariants = {
    WhileInView: {
      scale: [0, 1],
      opacity: [0, 1],
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  }
  return (
    <div
      className={`${styles.app__header} ${styles.home} app__flex`}
    >
      <MotionDiv
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className={styles.app__header_info}
      >
        <div className={styles.app__header_badge}>
          <div className={`${styles.badge_cmp} app__flex`}>
            <span>
              👋
            </span>
            <div className='ml-[20px]'>
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
              Fullstack Developer
            </p>
            <p className="p-text">
              Freelancer
            </p>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className={styles.app__header_img}>
        <Image
          priority
          src={images.profile.src}
          alt="profile_bg"
          width={532}
          height={666} />
        <MotionImage
          src={images.circle.src}
          alt="profile_circle"
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className={styles.overlay_circle}
        />
      </MotionDiv>

      <MotionDiv
        variants={scaleVariants}
        whileInView={scaleVariants.WhileInView}
        className={styles.app__header_circle}
      >
        {
          [
            images.redux.src,
            images.react.src,
            images.sass.src].map((circle, index) => (
              <div key={`circle-${index.toString()}`}
                className={`${styles.circle_cmp} app__flex`}>
                <img
                  src={circle}
                  alt={`circle-${index.toString()}`}
                  className="" />
              </div>
            ))
        }
      </MotionDiv>
    </div>
  )
}

export default AppWrap(Header, "home", styles.home);
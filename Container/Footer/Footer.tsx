import React,{useState} from 'react';
import { images } from '@/constants';
import { AppWrap,MotionWrap } from '@/wrapper';
import { client } from '@/client'; 
import styles from "./Footer.module.scss";

type Props = {}

function Footer({}: Props) {
  return (
    <>
        <h2 className='head-text'>
              Take a coffee & chat with me
        </h2>
        <div className={styles.app__footer_cards}>
            <div className={styles.app__footer_card}>
                <img 
                src={images.email.src} 
                alt="email" />

                <a href="mailto:Ghostrex2@gmail.com" className='p-text'>
                  Ghostrex2@gmail.com
                </a>
            </div>
            <div className={styles.app__footer_card}>
                <img 
                src={images.mobile.src} 
                alt="email" />

                <a href="tel: +261 (33) 64-986-49" className='p-text'>
                  +261 33 64 986 49
                </a>
            </div>
        </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer,styles.app__footer),
  "contact",
  "app__whitebg");
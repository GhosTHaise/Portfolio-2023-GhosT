import React,{useState} from 'react';
import { images } from '@/constants';
import { AppWrap,MotionWrap } from '@/wrapper';
import { client } from '@/client'; 
import styles from "./Footer.module.scss";

type Props = {}

function Footer({}: Props) {
  return (
    <div>Footer</div>
  )
}

export default AppWrap(
  MotionWrap(Footer,styles.app__footer),
  "contact",
  "app__whitebg");
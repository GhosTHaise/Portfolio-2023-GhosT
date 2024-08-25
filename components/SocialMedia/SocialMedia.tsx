import React from 'react'
import {BsInstagram,BsGithub} from "react-icons/bs";
import {FaFacebook} from "react-icons/fa"
import { variable } from '@/constants';
import Link from 'next/link';
type Props = {}

const SocialMedia = (props: Props) => {
  return (
    <div className='app__social'>
         <div>
            <Link href={variable.socialMedia.github} target="__blank" rel="noreferrer">
               <BsGithub />
            </Link>
         </div>
         <div>
            <Link href={variable.socialMedia.facebook} target="__blank" rel="noreferrer">
               <FaFacebook />
            </Link>
         </div>
         <div>
            <Link href={variable.socialMedia.instagram} target="__blank" rel="noreferrer">
               <BsInstagram />
            </Link>
         </div>
    </div>
  )
}

export default SocialMedia
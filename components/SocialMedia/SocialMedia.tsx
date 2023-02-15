import React from 'react'
import {BsTwitter,BsInstagram} from "react-icons/bs";
import {FaFacebook} from "react-icons/fa"
import { variable } from '@/constants';
type Props = {}

const SocialMedia = (props: Props) => {
  return (
    <div className='app__social'>
         <div>
            <a href={variable.socialMedia.tweeter} target="__blank" rel="noreferrer">
               <BsTwitter />
            </a>
         </div>
         <div>
            <a href={variable.socialMedia.facebook} target="__blank" rel="noreferrer">
               <FaFacebook />
            </a>
         </div>
         <div>
            <a href={variable.socialMedia.instagram} target="__blank" rel="noreferrer">
               <BsInstagram />
            </a>
         </div>
    </div>
  )
}

export default SocialMedia
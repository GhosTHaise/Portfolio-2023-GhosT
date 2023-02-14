import React from 'react'
import {NavigationDots,SocialMedia} from "@/components";
import { images } from '@/constants';

const AppWrap = (Container : any,idName : string,className : string) => function HOC() {
  return (
    <div  id={idName} style={idName == "home" ? {backgroundImage : `url(${images.bgIMG.src})`} : {}}  className={`app__container ${className}`}>
          <SocialMedia/>
          <div style={{padding : 0}} className='app__wrapper app__flex'>
                <Container />
                <div style={idName == "home" ? {display : "none"} : {}} className='copyright'>
                    <p className='p-text'>@2023 GhosT</p>
                    <p className='p-text'>All rights reserved</p>
                </div>
          </div>
          <NavigationDots active={idName} />
    </div>
  )
}

export default  AppWrap;
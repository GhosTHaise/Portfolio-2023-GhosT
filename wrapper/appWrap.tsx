import React from 'react'
import {NavigationDots,SocialMedia} from "@/components";

type Props = {
  Container : any,
  idName : string,
  className : string
}

const appWrap = (props: Props) => {
  return (
    <div id={props.idName} className={`app__container ${props.className}`}>
          <SocialMedia/>
          <div className='app__wrapper app__wrapper'>
                <props.Container />
          </div>
    </div>
  )
}
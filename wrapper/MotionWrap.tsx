import { MotionDiv } from '@/components/motionDiv'
import React from 'react'

const MotionWrap = (Component : any,className : string) => function HOC() {
  return (
    <MotionDiv
    whileInView={{y : [100,50,0],opacity : [0,0,1]}}
    transition={{duration : 0.5}}
    className={`${className} app__flex`}
    >
        <Component />
    </MotionDiv>
  )
}

export default MotionWrap
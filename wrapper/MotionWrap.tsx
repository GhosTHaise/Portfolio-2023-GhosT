import React from 'react'
import {motion as m} from "framer-motion"



const MotionWrap = (Component : any,className : string) => function HOC() {
  return (
    <m.div
    whileInView={{y : [100,50,0],opacity : [0,0,1]}}
    transition={{duration : 0.5}}
    className={`${className} app__flex`}
    >
        <Component />
    </m.div>
  )
}

export default MotionWrap
import React,{useState,useEffect} from 'react'
import { motion as m } from 'framer-motion'
import { variable } from '@/constants';
import "./About.module.scss";

type Props = {}

const About = (props: Props) => {
  return (
    <>
      <h2 className='head-text'>
          I Know That
          <span>
            Good Design
          </span>
          <br />
              means
          <span>
            Good Business
          </span>
      </h2>

      <div className={`app__profiles`}>
            {variable.About.map((about,index)=>(
              <m.div
                key={`about-${index}`}
                whileInView={{opacity : 1}}
                whileHover={{scale : 1.1}}
                transition={{duration : 0.5,type : "tween"}}
                className={`app__profile-item`}
              >
                  <img 
                  src={about.ImageUrl} 
                  alt={about.title}  />

                  <h2 className='bold-text' style={{marginTop : 20}}>
                      {about.title}
                  </h2>
              </m.div>
            ))}
      </div>
    </>
  )
}

export default About
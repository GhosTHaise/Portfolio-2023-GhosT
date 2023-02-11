import React,{useState,useEffect} from 'react'
import { motion as m } from 'framer-motion'
import { variable } from '@/constants';
import styled from "./About.module.scss";
import { client,urlFor } from '@/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { AppWrap } from '@/wrapper';
type Props = {}

const About = (props: Props) => {
  const [abouts, setAbouts] = useState<{title : string ,description : string,imgUrl : SanityImageSource}[]>([]);
  useEffect(()=>{
    const query : string = `*[_type == "abouts"]`;
    client.fetch(query).then((data)=>{
      setAbouts(data);
    })
  },[]);
  return (
    <>
      <h2 className='head-text'>
          I Know That{" "}
          <span>
            Good {/* Design */} Apps
          </span>
          <br />
              means{" "}
          <span>
            Good Business
          </span>
      </h2>

      <div className={`${styled.app__profiles}`}>

            {abouts.map((about,index)=>(
              
              <m.div
                key={`about-${index}`}
                whileInView={{opacity : [0,1]}}
                whileHover={{scale : 1.1}}
                transition={{duration : 0.5,type : "tween"}}
                className={`${styled.app__profile_item}`}
              >
                  <img 
                  src={urlFor(about.imgUrl).url()} 
                  alt={about.title}  />

                    <h2 className='bold-text' style={{marginTop : 20}}>
                        {about.title}
                    </h2>
                    <p className='p-text' style={{marginTop : 10}}>
                        {about.description}
                    </p>
              </m.div>
            ))}
      </div>
    </>
  )
}

export default AppWrap(About,"about","");
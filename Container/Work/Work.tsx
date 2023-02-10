import React,{useState,useEffect} from 'react'
import {AiFillEye,AiFillGithub} from "react-icons/ai";
import {motion as m} from "framer-motion";
import { AppWrap } from '@/wrapper';
import styles from "./Work.module.scss";
import { client,urlFor } from '@/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type workSanity = {
  title : string,
  description : string,
  projectLink : string,
  codeLink : string,
  imgUrl : SanityImageSource,
  tags : string[]
}
type Props = {}

function Work({}: Props) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({y : 0,opacity :1});
  const [works, setWorks] = useState<workSanity[]>([]);
  const [filterWork, setFilterWork] = useState<workSanity[]>([])
  useEffect(()=>{
      const query = `*[_type == "works"]`;
      client.fetch(query).then( data => {
        setWorks(data);
        setActiveFilter(data);
      })
  });

  const handleWorkFilter = (item : string) => {

  }

  return (
    
    <>
       <h2 className='head-text'>
          My creative{" "}
          <span>
            Portfolio{" "}
          </span>
          section
      </h2>
      <div className={styles.app__work_filter}>
          {
            ["UI/UX","Web App","Mobile App","React JS","All"].map((item,index)=>(
              <div
              key={index}
              onClick={()=> handleWorkFilter(item)}
              className={`${styles.app__work_filter_item} app__flex p-text
                  ${activeFilter === item ? styles.item_active : ""}
              `}
              >
                  {item}
              </div>
            ))
          }
      </div>
      <m.div
      animate={animateCard}
      transition={{duration : .5,delayChildren : .5}}
      className={styles.app__work_portfolio}
      >
         {filterWork.map((work,index)=>(
          <div 
          key={index}
          className={`${styles.app__work_item} app__flex`}
          >
              <div className={`${styles.app__work_img} app__flex`}>
                    <img 
                    src={urlFor(work.imgUrl).url()} 
                    alt={work.title} />
              </div>
          </div>
         ))}
      </m.div>
    </>
  )
}

export default Work
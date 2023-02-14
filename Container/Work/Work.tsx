import React,{useState,useEffect} from 'react'
import {AiFillEye,AiFillGithub} from "react-icons/ai";
import {motion as m} from "framer-motion";
import { AppWrap, MotionWrap } from '@/wrapper';
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
        setFilterWork(data);
      })
  },[]);

  const handleWorkFilter = (item : string) => {
    setActiveFilter(item);
    setAnimateCard({y : 100,opacity : 0});
    
    setTimeout(() => {
      setAnimateCard({y : 0,opacity : 1});
      if(item === "All"){
        setFilterWork(works);
      }else{
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
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
                    src={urlFor(work.imgUrl)?.url()} 
                    alt={work.title} />

                    <m.div
                    whileHover={{opacity : [0,1]}}
                    transition={{duration : .25,ease : "easeInOut",staggerChildren : .5 }}
                    className={`${styles.app__work_hover} app__flex`}
                    >
                      <a href={work.projectLink} target="_blank" rel='noreferrer'>
                        <m.div
                        whileInView={{scale : [0,1]}}
                        whileHover={{scale : [1,0.9]}}
                        transition={{duration : .25}}
                        className={`app__flex`}
                        >
                            <AiFillEye />
                        </m.div>
                      </a>
                      <a href={work.codeLink} target="_blank" rel='noreferrer'>
                        <m.div
                        whileInView={{scale : [0,1]}}
                        whileHover={{scale : [1,0.9]}}
                        transition={{duration : .25}}
                        className={`app__flex`}
                        >
                            <AiFillGithub />
                        </m.div>
                      </a>
                    </m.div>
              </div>
              <div className={`${styles.app__work_content} app__flex`}>
                  <h4 className='bold_text'>
                        {work.title}
                  </h4>
                  <p className='p-text' style={{marginTop : 10,textAlign : "center"}}>
                        {work.description}
                  </p>

                  <div className={`${styles.app__work_tag} app__flex`}>
                      <p className='p-text' >
                          {work.tags[0]}
                      </p>
                  </div>
              </div>  
          </div>
         ))}
      </m.div>
    </>
  )
}

export default AppWrap(MotionWrap(Work,styles.app__works),"work","app__primarybg")
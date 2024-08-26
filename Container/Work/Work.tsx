'use client'
import React,{useState,useEffect} from 'react'
import {AiFillEye,AiFillGithub} from "react-icons/ai";
import { AppWrap, MotionWrap } from '@/wrapper';
import styles from "./Work.module.scss";
import { client,urlFor } from '@/client';
import { MotionDiv } from '@/components/motionDiv';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

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
        setFilterWork(works.filter((work) => work.tags.some(tag => tag.toLocaleLowerCase() === item.toLocaleLowerCase()))); 
      }
    }, 500);
  }

  return (
    
    <>
       <h2 className='head-text mt-6'>
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
      <MotionDiv
      animate={animateCard}
      transition={{duration : .5,delayChildren : .5}}
      className={styles.app__work_portfolio}
      >
         <InfiniteMovingCards
          items={filterWork}
          speed='slow'
         />
         <InfiniteMovingCards
          items={filterWork.reverse()}
          speed='slow'
          direction='right'
         />
      </MotionDiv>
    </>
  )
}

export default AppWrap(MotionWrap(Work,styles.app__works),"work","app__primarybg")
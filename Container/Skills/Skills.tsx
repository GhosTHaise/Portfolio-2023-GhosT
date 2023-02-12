import React,{useState,useEffect} from 'react'
import {motion as m} from "framer-motion";
import {Tooltip as ReactTooltip} from "react-tooltip"
import { AppWrap } from '@/wrapper';
import styles from "./Skills.module.scss";
import { client,urlFor } from '@/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type skills = {
  name : string,
  bgColor : string,
  icon : SanityImageSource
}

type Props = {}

function Skills({}: Props) {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState<skills[]>([])
  
  const experienceQuery = `*[_type == "works"]`;
  const skillsQuery = `*[_type == "skills"]`;
  
  /* Fetch Experience */
  useEffect(()=>{
    client.fetch(experienceQuery).then( data => {
      setExperience(data);
    })
  },[experienceQuery]);
  
  /* Fetch Skill */
  useEffect(()=>{
    client.fetch(skillsQuery).then( data => {
      setSkills(data);
    })
  },[skillsQuery]);

  return (
    <>
      <h2 className='head-text'>
          Skills & Experience
      </h2> 
      <div className={`${styles.app__sills_container}`}>
          <m.div className={styles.app__skills_list}>
              {skills.map( (skill) => (
                <m.div
                whileInView={{opacity : [0,1]}}
                transition={{duration : 0.5}}
                className={`${styles.app__skills_item} app__flex`}
                key={skill.name}
                >
                    <div className='app__flex' style={{backgroundColor : skill.bgColor}}> 
                        <img 
                        src={urlFor(skill.icon).url()} 
                        alt={skill.name} />
                    </div>
                    <p className='p-text'>
                        {skill.name}
                    </p>
                </m.div>
              ))}
          </m.div>
      </div>
    </>
  )
}

export default AppWrap(Skills,"skills","app__skills")
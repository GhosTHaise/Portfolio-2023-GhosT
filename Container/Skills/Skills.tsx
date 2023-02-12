import React,{useState,useEffect} from 'react'
import {motion as m} from "framer-motion";
import {Tooltip as ReactTooltip} from "react-tooltip"
import { AppWrap } from '@/wrapper';
import styles from "./Skills.module.scss";
import { client,urlFor } from '@/client';

type Props = {}

function Skills({}: Props) {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([])
  
  const experienceQuery = `*[_type == "works"]`;
  const skillsQuery = `[_type == "skills"]`;
  
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
              {skills.map((skill)=>(
                <m.div
                whileInView={{opacity : [0,1]}}
                transition={{duration : 0.5}}
                className={`${styles.app__skills_item} app__flex`}
                key={skill.name}
                >

                </m.div>
              )}
          </m.div>
      </div>
    </>
  )
}

export default Skills
import React,{useState,useEffect} from 'react'
import {motion as m} from "framer-motion";
import ReactTooltip from "react-tooltip"
import { AppWrap } from '@/wrapper';
import styles from "./Skills.module.scss";
import { client,urlFor } from '@/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { type } from 'os';

type workExperience = {
  name : string,
  company : string,
  desc : string
}

type experience = {
  year : string ,
  works : workExperience[]
}

type skills = {
  name : string,
  bgColor : string,
  icon : SanityImageSource
}

type Props = {}

function Skills({}: Props) {
  const [experiences, setExperiences] = useState<experience[]>([]);
  const [skills, setSkills] = useState<skills[]>([])
  
  const experienceQuery = `*[_type == "experiences"]`;
  const skillsQuery = `*[_type == "skills"]`;
  
  /* Fetch Experience */
  useEffect(()=>{
    client.fetch(experienceQuery).then( data => {
      setExperiences(data);
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
          <div className={styles.app__skills_exp}>
                {experiences?.map((experience,index) => 
                  (
                    <m.div 
                    key={`${experience.year}-0${index}`}
                    className={styles.app__skills_exp_item}
                    >
                        <div className={styles.app__skills_exp_year}>
                              <p className='bold_text'>
                                  {experience.year}
                              </p>
                        </div>
                        <m.div 
                        className={styles.app__skills_exp_works}
                        >
                            {experience?.works?.map((work,index)=>(
                              <>
                                <m.div
                                  key={work.name}
                                  whileInView={{opacity : [0,1]}}
                                  transition={{duration : 0.5}}
                                  className={styles.app__skills_exp_work}
                                  data-tip 
                                  data-for={work.name}
                                  >
                                    <h4 className="bold_text">
                                          {work.name}
                                    </h4>
                                    <p className='p-text'>
                                          {work.company}
                                    </p>
                                </m.div>
                                <ReactTooltip
                                  id={work.name}
                                  effect="solid"
                                  arrowColor="#fff"
                                  className={styles.skills_tooltip}
                                >
                                    {work.desc}
                                </ReactTooltip>
                              </>
                            ))}
                        </m.div>
                    </m.div>
                  )
                )}
          </div>
      </div>
    </>
  )
}

export default AppWrap(Skills,"skills","app__skills")
import { AppWrap, MotionWrap } from '@/wrapper';
import styles from "./Skills.module.scss";
import { urlFor } from '@/client';
import { getAllExperiences, getAllSkills } from '@/lib/actions/sanity.actions';
import { MotionDiv } from '@/components/motionDiv';
import Image from 'next/image';
import ExperienceList from './_components/ExperienceItem';

const Skills = async () => {
  const experiences = await getAllExperiences();
  const skills = await getAllSkills();

  return (
    <>
      <h2 className='head-text mt-6'>
        Skills & Experience
      </h2>
      <div className={`${styles.app__skills_container}`}>
        <MotionDiv className={styles.app__skills_list}>
          {skills.map((skill, index) => (
            <MotionDiv
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className={`${styles.app__skills_item} app__flex`}
              key={`${skill.name}-${index}`}
            >
              <div className={`app__flex bg-${skill.bgColor}`}>
                <Image
                  src={urlFor(skill.icon).url()}
                  alt={skill.name}
                  width={45}
                  height={45}
                />
              </div>
              <p className='p-text'>
                {skill.name}
              </p>
            </MotionDiv>
          ))}
        </MotionDiv>
        <div className={styles.app__skills_exp}>
          <ExperienceList experiences={experiences} />
        </div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, styles.app__skills),
  "skills",
  "app__whitebg");
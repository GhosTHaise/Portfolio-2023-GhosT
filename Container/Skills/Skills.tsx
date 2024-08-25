import { AppWrap, MotionWrap } from '@/wrapper';
import styles from "./Skills.module.scss";
import { urlFor } from '@/client';
import { getAllExperiences, getAllSkills } from '@/lib/actions/sanity.actions';
import { MotionDiv } from '@/components/motionDiv';
import ToolTip from "@/components/reactToolTip";
import Image from 'next/image';

const Skills = async () => {
  const experiences = await getAllExperiences();
  const skills = await getAllSkills();

  return (
    <>
      <h2 className='head-text mt-8'>
        Skills & Experience
      </h2>
      <div className={`${styles.app__skills_container}`}>
        <MotionDiv className={styles.app__skills_list}>
          {skills.map((skill) => (
            <MotionDiv
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className={`${styles.app__skills_item} app__flex`}
              key={skill.name}
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
          {experiences?.map((experience, index) =>
          (
            <MotionDiv
              key={`${experience.year}-0${index}`}
              className={styles.app__skills_exp_item}
            >
              <div className={styles.app__skills_exp_year}>
                <p className='bold_text'>
                  {experience.year}
                </p>
              </div>
              <MotionDiv
                className={styles.app__skills_exp_works}
              >
                {experience?.works?.map((work, index) => (
                  <>
                    <Image
                      src={urlFor(work.companyLogo).url()}
                      alt={work.company}
                      width={60}
                      height={60}
                      className='object-contain object-top pt-2'
                    />
                    <div className='exp-work-container' key={"work->" + index.toString()}>
                      <MotionDiv
                        key={work.name}
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
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
                      </MotionDiv>
                      <ToolTip name={work.name} desc={work.desc} className={styles.skills_tooltip} />
                    </div>
                  </>
                ))}
              </MotionDiv>
            </MotionDiv>
          )
          )}
        </div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, styles.app__skills),
  "skills",
  "app__whitebg");
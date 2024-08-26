'use client'
import React, { useState, useEffect } from 'react'
import { AppWrap, MotionWrap } from '@/wrapper';
import styles from "./Work.module.scss";
import { client } from '@/client';
import { MotionDiv } from '@/components/motionDiv';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { splitArray } from '@/lib/utils';

type Props = {}
const MAX_ITEMS = 6;
function Work({ }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState<workSanity[]>([]);
  const [filterWork, setFilterWork] = useState<{ first: workSanity[], second: workSanity[] }>({ first: [], second: [] })

  useEffect(() => {
    const query = `*[_type == "works"]`;
    client.fetch(query).then(data => {
      setWorks(data);
      const [first, second] = splitArray(data, MAX_ITEMS);
      setFilterWork({ first, second });
    })
  }, []);

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      if (item === "All") {
        const [first, second] = splitArray(works, MAX_ITEMS);
        setFilterWork({ first, second });
      } else {
        const worksFilter = works.filter((work) => work.tags.some(tag => tag.toLocaleLowerCase() === item.toLocaleLowerCase()));
        const [first, second] = splitArray(worksFilter, MAX_ITEMS);
        setFilterWork({ first, second });
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
          ["UI/UX", "Web App", "Mobile App", "React JS", "All"].map((item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
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
        transition={{ duration: .5, delayChildren: .5 }}
        className={styles.app__work_portfolio}
      >
        <div className="h-fit rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={filterWork.first ?? []}
            speed='normal'
          />
        </div>
        <div className="h-fit rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={filterWork.second ?? []}
            speed='normal'
            direction='right'
          />
        </div>
      </MotionDiv>
    </>
  )
}

export default AppWrap(MotionWrap(Work, styles.app__works), "work", "app__primarybg")
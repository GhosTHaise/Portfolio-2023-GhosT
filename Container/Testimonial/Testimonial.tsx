import React,{useEffect,useState} from 'react'
import {motion as m } from "framer-motion"
import { HiChevronLeft,HiChevronRight } from 'react-icons/hi'
import { client,urlFor } from '@/client';
import { AppWrap , MotionWrap } from '@/wrapper';

import styles from "./Testimonials.module.scss"
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type Testimonials = {
  name : string,
  company : string,
  imgurl : SanityImageSource,
  feedback : string
}

type Brands = {
  imgUrl : SanityImageSource,
  name : string
}
type Props = {}

function Testimonial({}: Props) {

  const [brands, setBrands] = useState<Brands[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(()=>{
    const testimonialsQuery = `*[_type == "testimonials"]`;
    const brandsQuery = `*[_type == "brands"]`;
    client.fetch(testimonialsQuery).then( data => {
      setTestimonials(data);
    });
    client.fetch(brandsQuery).then( data => {
      setBrands(data);
    });
  },[]);

  const  handleClick = (index : number) : void => {
    setCurrentIndex(index);
  } 

  return (
        <>
          {
            testimonials.length && (
              <>
                <div className={`${styles.app__testimonial_item} app__flex`}>
                    <img 
                        src={urlFor(testimonials[currentIndex].imgurl).url()} 
                        alt={testimonials[currentIndex].name} 
                    />
                    <div className={styles.app__testimonial_content}>
                        <p className={"p-text"}>
                              {testimonials[currentIndex].feedback}
                        </p>
                        <div>
                            <h4 className='bold_text'>
                                {testimonials[currentIndex].name}
                            </h4>
                            <h5 className='p-text'>
                                {testimonials[currentIndex].company}
                            </h5>
                        </div>
                    </div>
                </div>
                <div className={`${styles.app__testimonial_btns} app__flex`}>
                    <div 
                       className='app__flex'
                       onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
                       >
                        <HiChevronLeft />
                    </div>
                    <div 
                       className='app__flex'
                       onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
                       >
                        <HiChevronRight />
                    </div>
                </div>
              </>
            )
          }
          <div className={`${styles.app__testimonial_brands} app__flex`}>
                {
                brands.map((brand,index)=>(
                  <m.div
                  key={brand.name}
                  whileInView={{opacity: [0,1]}}
                  transition={{duration : 0.5 , type : "tween"}}
                  >
                        <img
                          src={urlFor(brand.imgUrl).url()}
                          alt={brand.name}
                        />
                  </m.div>
                ))
                }
          </div>
        </>
  )
}

export default AppWrap(
  MotionWrap(Testimonial,styles.app__testimonial),
  "testimonials",
  "app__primarybg"
);
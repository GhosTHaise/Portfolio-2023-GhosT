"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { MotionDiv } from "../motionDiv";
import styles from "@/Container/Work/Work.module.scss";
import { urlFor } from "@/client";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import Image from "next/image";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: workSanity[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 max:sm:gap-2 sm:py-2 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((work, index) => (
                    <li
                        className="w-fit max-w-full relative flex-shrink-0 px-2 "
                        key={`${work.title}-${index}`}
                    >
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>
                            <div
                                key={index}
                                className={`${styles.app__work_item} app__flex`}
                            >
                                <div className={`${styles.app__work_img} app__flex`}>
                                    <Image
                                        fill
                                        src={urlFor(work.imgUrl)?.url()}
                                        alt={work.title}
                                     />

                                    <MotionDiv
                                        whileHover={{ opacity: [0, 1] }}
                                        transition={{ duration: .25, ease: "easeInOut", staggerChildren: .5 }}
                                        className={`${styles.app__work_hover} app__flex`}
                                    >
                                        <a href={work.projectLink} target="_blank" rel='noreferrer'>
                                            <MotionDiv
                                                whileInView={{ scale: [0, 1] }}
                                                whileHover={{ scale: [1, 0.9] }}
                                                transition={{ duration: .25 }}
                                                className={`app__flex`}
                                            >
                                                <AiFillEye />
                                            </MotionDiv>
                                        </a>
                                        <a href={work.codeLink} target="_blank" rel='noreferrer'>
                                            <MotionDiv
                                                whileInView={{ scale: [0, 1] }}
                                                whileHover={{ scale: [1, 0.9] }}
                                                transition={{ duration: .25 }}
                                                className={`app__flex`}
                                            >
                                                <AiFillGithub />
                                            </MotionDiv>
                                        </a>
                                    </MotionDiv>
                                </div>
                                <div className={`${styles.app__work_content} app__flex`}>
                                    <h4 className='bold_text'>
                                        {work.title}
                                    </h4>
                                    <p className='p-text line-clamp-2' style={{ marginTop: 10, textAlign: "center" }}>
                                        {work.description}
                                    </p>

                                    <div className={`${styles.app__work_tag} app__flex`}>
                                        <p className='p-text' >
                                            {work.tags[0]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};

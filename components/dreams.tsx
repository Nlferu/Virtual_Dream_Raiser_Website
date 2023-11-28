"use client"

import React from "react"
import SectionHeading from "./section-heading"
import DreamCard from "./dream-card"
import { dreamsData } from "@/lib/data"
import { motion } from "framer-motion"

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 100,
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index,
        },
    }),
}

export default function Dreams() {
    return (
        <section id="dreams" className="scroll-mt-28 mb-28 sm:mb-40 z-30 w-full flex flex-col items-center justify-center">
            <div className="max-w-[10rem]">
                <SectionHeading>Dreams</SectionHeading>
            </div>

            <div className="max-w-[100rem] flex items-center justify-center flex-wrap w-full gap-10 list-none">
                {dreamsData.map((skill, index) => (
                    <motion.li
                        className=""
                        key={index}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{
                            once: true,
                        }}
                        custom={index}
                    >
                        <DreamCard>{skill}</DreamCard>
                    </motion.li>
                ))}
            </div>
        </section>
    )
}

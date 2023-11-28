"use client"

import React from "react"
import SectionHeading from "./section-heading"
import { skillsData } from "@/lib/data"
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
        <section className="flex flex-col items-center mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40 z-30">
            <SectionHeading>Dreams</SectionHeading>
            <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
                {skillsData.map((skill, index) => (
                    <motion.li
                        className="bg-white/10 borderBlack rounded-xl px-5 py-3"
                        key={index}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{
                            once: true,
                        }}
                        custom={index}
                    >
                        {skill}
                    </motion.li>
                ))}
            </ul>
        </section>
    )
}

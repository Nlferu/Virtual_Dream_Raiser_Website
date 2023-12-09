import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useSectionInView } from "@/lib/hooks"
import DreamCard from "./dream-card"
import SectionHeading from "./section-heading"
import contract from "@/contracts/VirtualDreamRaiser.json"

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
    const { ref } = useSectionInView("Dreams", 0.5)
    const contractAddress = contract.address
    const contractAbi = contract.abi
    const { isWeb3Enabled } = useMoralis()

    const { runContractFunction: getTotalDreams, data: dreamz } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getTotalDreams",
        params: {},
    })

    useEffect(() => {
        isWeb3Enabled && getTotalDreams()
    }, [isWeb3Enabled])

    return (
        <section ref={ref} id="dreams" className="scroll-mt-28 mb-28 sm:mb-40 z-30 w-full flex flex-col items-center justify-center">
            <div className="max-w-[10rem]">
                <SectionHeading>Dreams</SectionHeading>
            </div>

            <div className="max-w-[100rem] flex items-center justify-center flex-wrap w-full gap-10 list-none">
                {Array.from({ length: (dreamz as number) || 0 }, (_, index) => (
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
                        <React.Fragment key={index}>
                            <DreamCard dreamId={index} />
                        </React.Fragment>
                    </motion.li>
                ))}
            </div>
        </section>
    )
}

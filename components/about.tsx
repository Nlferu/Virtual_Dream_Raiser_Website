import { useSectionInView } from "@/lib/hooks"
import { motion } from "framer-motion"

export default function About() {
    const { ref } = useSectionInView("Home", 1)

    return (
        <motion.section
            ref={ref}
            id="home"
            className="mt-[17rem] z-50 scroll-mt-[100rem] flex flex-col items-center text-center leading-8 px-4 w-full"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.1,
            }}
        >
            <h1 className="max-w-[25rem] text-4xl font-bold capitalize mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                Virtual Dream Raiser
            </h1>
            <div className="text-gray-300 max-w-[45rem] mx-[1rem]">
                Fund raising platform offering a decentralized and fully automated ecosystem where dreams take flight. Whether you&apos;re a passionate
                entrepreneur with a groundbreaking project, a visionary game developer pushing boundaries, or an individual seeking support for a charitable
                cause, this platform is your launchpad.
            </div>
            <div className="text-gray-300 max-w-[41rem] mt-[1rem] mx-[1rem]">
                Our community is based on the principle of mutual trust, and{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Virtual Dream Raiser</span> has been
                designed to simplify funds gathering and encourage compliance with the principles of transparency.
            </div>

            <div className="flex justify-center mt-[2rem] w-[90%]">
                <iframe width="640" height="360" src="https://www.youtube.com/embed/hKRSpH7v4yQ" allowFullScreen></iframe>
            </div>
        </motion.section>
    )
}

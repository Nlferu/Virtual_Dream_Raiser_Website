import { useSectionInView } from "@/lib/hooks"

export default function About() {
    const { ref } = useSectionInView("Home", 1)

    return (
        <section ref={ref} id="home" className="mt-[14rem] z-50 scroll-mt-[100rem] flex flex-col items-center text-center leading-8">
            <h1 className="max-w-[25rem] text-4xl font-bold capitalize mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                Virtual Dream Raiser
            </h1>
            <div className="text-white max-w-[45rem] mx-[1rem]">
                Fund raising platform offering a decentralized and fully automated ecosystem where dreams take flight. Whether you're a passionate entrepreneur
                with a groundbreaking project, a visionary game developer pushing boundaries, or an individual seeking support for a charitable cause, this
                platform is your launchpad.
            </div>
            <div className="text-white max-w-[45rem] mx-[1rem]">
                Our community is based on the principle of mutual trust, and{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Virtual Dream Raiser</span> has been
                designed to encourage compliance with the principles of transparency.
            </div>
        </section>
    )
}

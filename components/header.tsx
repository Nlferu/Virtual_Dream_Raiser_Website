import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { links } from "@/lib/data"
import { ConnectButton } from "web3uikit"
import { useActiveSectionContext } from "@/context/active-section-context"

export default function Header() {
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext()

    return (
        <header className="z-[999] relative">
            <nav className="w-full h-[4rem] fixed top-0 shadow-lg shadow-lightPurple/50 bg-[#03001417] backdrop-blur-md z-[100]">
                <div className="w-full h-full flex items-center justify-between px-[1rem] sm:px-10">
                    <a className="flex items-center">
                        <Image src="/icon.png" alt="logo" width={50} height={50} quality="95" priority={true} />
                        <span className="text-xl font-bold ml-[0.7rem] hidden md:block text-gray-300">Virtual Dream Raiser</span>
                    </a>
                </div>

                <div className="w-full flex pr-2 xl:pr-0 justify-end xl:justify-center mt-[-3.5rem]">
                    <ul className="w-[24rem] md:w-[28rem] lg:w-[40rem] flex justify-between items-center border border-darkPurple bg-[#0300145e] px-[1.5rem] py-[0.7rem] rounded-full text-gray-200 list-none">
                        {links.map((link) => (
                            <li className="flex items-center justify-center relative px-2" key={link.hash}>
                                <Link
                                    className="flex w-full items-center justify-center hover:text-cyan-500 transition"
                                    href={link.hash}
                                    onClick={() => {
                                        setActiveSection(link.name)
                                        setTimeOfLastClick(Date.now())
                                    }}
                                >
                                    {link.name}

                                    {link.name === activeSection && (
                                        <motion.span
                                            className="bg-darkPurple rounded-full absolute inset-0 -z-10"
                                            layoutId="activeSection"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        ></motion.span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <div className="right-0 fixed top-0 my-[5rem] z-[60]">
                <ConnectButton moralisAuth={false} />
            </div>
        </header>
    )
}

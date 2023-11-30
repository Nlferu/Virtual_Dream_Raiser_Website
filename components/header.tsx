import React from "react"
import Link from "next/link"
import Image from "next/image"
import { links } from "@/lib/data"
import { ConnectButton } from "web3uikit"

/** @dev FIX Nav Bar positioning -> separate <a> for icon + name(align left) AND navbar (center)*/

export default function Header() {
    return (
        <div>
            <div className="w-full h-[4rem] fixed top-0 shadow-lg shadow-lightPurple/50 bg-[#03001417] backdrop-blur-md z-[100]">
                <div className="w-full h-full flex items-center justify-between px-[1rem] sm:px-10">
                    <a className="flex items-center">
                        <Image src="/icon.png" alt="logo" width={50} height={50} quality="95" priority={true} />
                        <span className="text-xl font-bold ml-[0.7rem] hidden md:block text-gray-300">Virtual Dream Raiser</span>
                    </a>
                </div>

                <div className="w-full flex pr-2 xl:pr-0 justify-end xl:justify-center mt-[-3.5rem]">
                    <div className="w-[24rem] md:w-[28rem] lg:w-[40rem] flex justify-between items-center border border-darkPurple bg-[#0300145e] px-[1.5rem] py-[0.7rem] rounded-full text-gray-200 list-none">
                        {links.map((link) => (
                            <li key={link.hash}>
                                <Link href={link.hash}>{link.name}</Link>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
            <div className="right-0 fixed top-0 my-[5rem] z-[60]">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}

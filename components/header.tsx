import React from "react"
import Image from "next/image"
import { ConnectButton } from "web3uikit"

/** @dev FIX Nav Bar positioning */

export default function Header() {
    return (
        <div className="w-full h-[4rem] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
            <div className="w-full h-full flex flex-row items-center justify-start m-auto px-[0.7rem]">
                <a className="h-auto w-auto flex flex-row items-center">
                    <Image src="/icon.png" alt="logo" width={50} height={50} quality="95" priority={true} />

                    <span className="font-bold ml-[0.7rem] hidden md:block text-gray-300">Virtual Dream Raiser</span>
                </a>

                <div className="w-[40rem] h-full flex flex-row items-center ml-[23rem]">
                    <div
                        className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] px-[1.5rem] py-[0.7rem]
                                   rounded-full text-gray-200"
                    >
                        <a href="#XXX" className="cursor-pointer">
                            XXX
                        </a>
                        <a href="#YYYY" className="cursor-pointer">
                            YYYY
                        </a>
                        <a href="#ZZZZZ" className="cursor-pointer">
                            ZZZZZ
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex justify-end py-[1rem]">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}

import React, { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useSectionInView } from "@/lib/hooks"
import { truncateStr, formatTimeLeftLottery } from "@/lib/utils"
import { BigNumber, ethers } from "ethers"
import { useCountdown } from "@/lib/hooks"
import { motion } from "framer-motion"
import Typed from "react-typed"
import ConnectionChecker from "./connection-checker"
import SectionHeading from "./section-heading"
import rewarder from "@/contracts/VirtualDreamRewarder.json"

export default function Lottery() {
    const { ref } = useSectionInView("Lottery", 0.9)
    const { isWeb3Enabled } = useMoralis()
    const { secondsLeft, startTimer } = useCountdown()
    const [balance, setBalance] = useState<number>(0)

    let initialBalance: BigNumber
    const contractAddress = rewarder.address
    const contractAbi = rewarder.abi

    const getBalance = async () => {
        if (typeof (window as any).ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum)

            initialBalance = await provider.getBalance(contractAddress)
            const convertedBalance = parseFloat(ethers.utils.formatEther(initialBalance))
            setBalance(convertedBalance)
        }
    }

    const {
        runContractFunction: getPlayers,
        data: players,
        error: playersError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const {
        runContractFunction: getWinner,
        data: winner,
        error: winnerError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    const {
        runContractFunction: getTimeLeft,
        data: timeLeft,
        error: timeLeftError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getTimeUntilNextDraw",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            getBalance()
            getPlayers()
            getWinner()
            getTimeLeft()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        startTimer((timeLeft as BigNumber)?.toNumber())
    }, [timeLeft])

    const recentWinner = truncateStr((winner as string) || "0x0000000000000000000000000000000000000000", 15)
    const formattedTime = formatTimeLeftLottery(secondsLeft)

    return (
        <section ref={ref} id="lottery" className="scroll-mt-28 flex flex-col justify-center items-center w-[min(100%,50rem)] z-30 px-4 sm:px-0">
            <SectionHeading>Automated Lottery</SectionHeading>
            {!isWeb3Enabled ? (
                <ConnectionChecker>Connect Your Wallet To See Stats</ConnectionChecker>
            ) : (
                <motion.div
                    className="flex flex-col text-white gap-2 text-center z-30 mb-[5rem]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <div className="font-bold text-lg text-cyan-500">Prize Pool:</div>
                    <div>{balance} ETH</div>
                    <div className="mt-3 font-bold text-lg text-cyan-500">Funders:</div>
                    <div>{(players as BigNumber)?.toNumber()}</div>
                    <div className="mt-3 font-bold text-lg text-cyan-500">Recent Winner:</div>
                    <div>{recentWinner}</div>
                    <div className="mt-3 font-bold text-lg text-cyan-500">Next Winner Picking In:</div>
                    <div>{secondsLeft > 0 ? formattedTime : <div>Waiting For Funders...</div>}</div>
                </motion.div>
            )}

            <div className="text-gray-300 text-center mt-[1rem] max-w-[90%]">
                To incentivize and reward contributors, we provide every funder with an opportunity to participate in a lottery draw for a prize!
            </div>
            <p className="text-gray-300 text-center mt-[1rem] mb-[1rem] leading-[1.6rem]">
                The lottery prize pool continuously grows, accumulating 2% from each funding transaction. This means that for every contribution made, 2% of the
                transaction amount contributes to the lottery prize pool. Every individual who funds any dream or{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Virtual Dream Raiser</span> itself
                becomes eligible to win from this lottery prize pool, offering each funder a chance to win the lottery prize!
            </p>

            <div className="absolute">
                <div className="opacity-30 z-[-10] relative flex items-center justify-center bg-cover">
                    <video className="w-auto max-h-[50rem] shadow-blurred" preload="false" playsInline loop muted autoPlay src="/wormhole.webm" />
                </div>
            </div>

            <Typed
                className="text-gray-100 text-center mt-[1rem] mb-[6rem] max-w-[90%] font-bold"
                strings={["Powered By Chainlink !"]}
                typeSpeed={120}
                backSpeed={50}
                backDelay={2000}
                loop
                // showCursor={false}
            />
        </section>
    )
}

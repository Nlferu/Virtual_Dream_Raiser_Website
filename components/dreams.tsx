"use client"

import React, { useState, useEffect } from "react"
import SectionHeading from "./section-heading"
import DreamCard from "./dream-card"
import { dreamsData } from "@/lib/data"
import { motion } from "framer-motion"
import { BigNumber, ethers } from "ethers"
import { useWeb3Contract, useMoralis } from "react-moralis"
import contract from "@/contracts/VirtualDreamRaiser.json"

type Dream = {
    creators: (string | undefined)[]
    designatedWallets: (string | undefined)[]
    id: string
    statuses: (boolean | undefined)[]
    descriptions: (string | undefined)[]
    gathereds: (number | undefined)[]
    goals: (number | undefined)[]
    expirations: (number | undefined)[]
    promoteds: (boolean | undefined)[]
}

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
    const [dreams, setDreams] = useState<number | undefined>()
    const [creators, setCreators] = useState<(string | undefined)[]>([])
    const [wallets, setWallets] = useState<(string | undefined)[]>([])
    const [statuses, setStatuses] = useState<(boolean | undefined)[]>([])
    const [descriptions, setDescriptions] = useState<(string | undefined)[]>([])
    const [gathereds, setGathereds] = useState<(number | undefined)[]>([])
    const [goals, setGoals] = useState<(number | undefined)[]>([])
    const [expirations, setExpirations] = useState<(number | undefined)[]>([])
    const [promoteds, setPromoteds] = useState<(boolean | undefined)[]>([])
    const [dreamsList, setDreamsList] = useState<Dream[]>([])
    const contractAddress = contract.address
    const contractAbi = contract.abi

    const { isWeb3Enabled, account } = useMoralis()
    // @ts-ignore
    const { runContractFunction } = useWeb3Contract()

    const getTotalDreams = async () => {
        const options = {
            abi: contractAbi,
            contractAddress: contractAddress,
            functionName: "getTotalDreams",
            params: {},
        }

        const result = await runContractFunction({
            params: options,
        })

        setDreams((result as BigNumber).toNumber())
    }

    const getCreators = async (id: number) => {
        const array: string[] = []

        for (let i = 0; i <= id; i++) {
            const options = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "getCreator",
                params: { dreamId: i },
            }

            const result = await runContractFunction({
                params: options,
            })
            array.push(result as string)
        }

        setCreators(array)
    }

    const getWallets = async (id: number) => {
        const array: string[] = []

        for (let i = 0; i <= id; i++) {
            const options = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "getWithdrawWallet",
                params: { dreamId: i },
            }

            const result = await runContractFunction({
                params: options,
            })

            array.push(result as string)
        }

        setWallets(array)
    }

    const getStatuses = async (id: number) => {
        const array: boolean[] = []

        for (let i = 0; i <= id; i++) {
            const options = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "getStatus",
                params: { dreamId: i },
            }

            const result = await runContractFunction({
                params: options,
            })
            array.push(result as boolean)
        }

        setStatuses(array)
    }

    const getPromoteds = async (id: number) => {
        const array: boolean[] = []

        for (let i = 0; i <= id; i++) {
            const options = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "getPromoted",
                params: { dreamId: i },
            }

            const result = await runContractFunction({
                params: options,
            })
            array.push(result as boolean)
        }

        setPromoteds(array)
    }

    const getDescriptions = async (id: number) => {
        const array: string[] = []

        for (let i = 0; i <= id; i++) {
            const options = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "getDescription",
                params: { dreamId: i },
            }

            const result = await runContractFunction({
                params: options,
            })
            array.push(result as string)
        }

        setDescriptions(array)
    }

    const getGathereds = async (id: number) => {
        const array: number[] = []

        for (let i = 0; i <= id; i++) {
            const options = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "getTotalGathered",
                params: { dreamId: i },
            }

            const result = await runContractFunction({
                params: options,
            })

            const value = parseFloat(ethers.utils.formatEther(result as BigNumber))
            array.push(value)
        }

        setGathereds(array)
    }

    const getGoals = async (id: number) => {
        const array: number[] = []

        for (let i = 0; i <= id; i++) {
            const options = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "getGoal",
                params: { dreamId: i },
            }

            const result = await runContractFunction({
                params: options,
            })

            const value = parseFloat(ethers.utils.formatEther(result as BigNumber))
            array.push(value)
        }

        setGoals(array)
    }

    const getExpirations = async (id: number) => {
        const array: number[] = []

        for (let i = 0; i <= id; i++) {
            const options = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "getTimeLeft",
                params: { dreamId: i },
            }

            const result = await runContractFunction({
                params: options,
            })
            array.push((result as BigNumber).toNumber())
        }

        setExpirations(array)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (isWeb3Enabled) {
                await getTotalDreams()
                console.log("Dreams: ", dreams)

                if (dreams !== undefined) {
                    const fetchedDreams: Dream[] = []
                    for (let i = 0; i < dreams; i++) {
                        await getCreators(i)
                        await getWallets(i)
                        await getStatuses(i)
                        await getDescriptions(i)
                        await getGathereds(i)
                        await getGoals(i)
                        await getExpirations(i)
                        await getPromoteds(i)

                        console.log(
                            `Creator: ${creators} \nWallet: ${wallets} \nStatus: ${statuses} \nDesc: ${descriptions} \nGatherd: ${gathereds} \nGoal: ${goals} \nTimeLeft: ${expirations} \nPromoted: ${promoteds}`
                        )

                        const currentDream: Dream = {
                            creators: creators,
                            designatedWallets: wallets,
                            id: i.toString(),
                            statuses: statuses,
                            descriptions: descriptions,
                            gathereds: gathereds,
                            goals: goals,
                            expirations: expirations,
                            promoteds: promoteds,
                        }

                        fetchedDreams.push(currentDream)
                        setDreamsList(fetchedDreams)
                    }

                    console.log("Dreams List: ", dreamsList)
                }
            }
        }

        fetchData()
    }, [isWeb3Enabled])

    return (
        <section id="dreams" className="scroll-mt-28 mb-28 sm:mb-40 z-30 w-full flex flex-col items-center justify-center">
            <div className="max-w-[10rem]">
                <SectionHeading>Dreams</SectionHeading>
            </div>

            <div className="max-w-[100rem] flex items-center justify-center flex-wrap w-full gap-10 list-none">
                {dreamsList.map((dream, index) => (
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
                            <DreamCard {...dream} dreamId={index} />
                        </React.Fragment>
                    </motion.li>
                ))}
            </div>
        </section>
    )
}

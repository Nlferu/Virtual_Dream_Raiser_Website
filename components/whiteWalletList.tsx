import React, { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { FiCopy, FiCheck } from "react-icons/fi"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { motion } from "framer-motion"
import Typed from "react-typed"
import ConnectionChecker from "./connection-checker"
import contract from "@/contracts/VirtualDreamRaiser.json"

export default function Wallets() {
    const { isWeb3Enabled } = useMoralis()
    const [whiteWallets, setWhiteWallets] = useState<string[]>([])
    const [copied, setCopied] = useState<number[]>([])

    const contractAddress = contract.address
    const contractAbi = contract.abi

    const {
        runContractFunction: getWallets,
        data: wallets,
        error: winnerError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getWhiteWalletsList",
        params: {},
    })

    const handleCopy = (index: number) => {
        if (copied.includes(index)) {
            // If already copied, remove the index from the copied array
            setCopied(copied.filter((i) => i !== index))
        } else {
            // If not copied, add the index to the copied array
            setCopied([...copied, index])

            setTimeout(() => {
                setCopied(copied.filter((i) => i !== index))
            }, 1000)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            getWallets()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if (wallets && Array.isArray(wallets)) {
            setWhiteWallets(wallets as string[])
        }
    }, [wallets])

    return (
        <section className="flex flex-col justify-center items-center w-[min(100%,45rem)] z-30 px-4 sm:px-0 text-center">
            <div className="text-3xl font-medium capitalize mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 z-30">
                Whitelisted Wallets
            </div>
            {!isWeb3Enabled ? (
                <ConnectionChecker>Connect Your Wallet To See Wallets</ConnectionChecker>
            ) : (
                <div className="flex flex-col text-white gap-1 text-xs sm:text-base mb-[2rem]">
                    {whiteWallets.map((wallet, index) => (
                        <motion.div
                            className="text-cyan-600 flex gap-3 justify-end items-center"
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            {wallet}
                            <div className="text-white transition duration-1000 hover:cursor-pointer">
                                {!copied.includes(index) ? (
                                    <CopyToClipboard text={wallet} onCopy={() => handleCopy(index)}>
                                        <FiCopy />
                                    </CopyToClipboard>
                                ) : (
                                    <CopyToClipboard text={wallet} onCopy={() => handleCopy(index)}>
                                        <FiCheck />
                                    </CopyToClipboard>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <Typed
                className="text-cyan-800 text-center"
                strings={["List of trusted wallets of charitable organizations and confirmed white hat users"]}
                typeSpeed={120}
                backSpeed={5}
                loop
                // showCursor={false}
            />
        </section>
    )
}

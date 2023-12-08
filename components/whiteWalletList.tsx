import React, { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import contract from "@/contracts/VirtualDreamRaiser.json"

export default function Wallets() {
    const { isWeb3Enabled } = useMoralis()
    const [whiteWallets, setWhiteWallets] = useState<string[]>([])

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
            <div className="flex flex-col text-white gap-1 text-xs sm:text-base mb-[2rem]">
                {whiteWallets.map((wallet, index) => (
                    <div key={index}>{wallet}</div>
                ))}
            </div>
            <p className="text-cyan-800 text-center">List of trusted wallet's of charitable organizations and confirmed white hat users</p>
        </section>
    )
}

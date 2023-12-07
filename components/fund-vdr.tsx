import React, { useState, ChangeEvent } from "react"
import { Button } from "@/components/button"
import { useSectionInView } from "@/lib/hooks"
import { ethers } from "ethers"
import { handleError, handleSuccess } from "@/lib/errorHandlers"
import { useWeb3Contract } from "react-moralis"
import SectionHeading from "./section-heading"
import contract from "@/contracts/VirtualDreamRaiser.json"

export default function FundVDR() {
    const [amount, setAmount] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    /* @ts-ignore */
    const { runContractFunction } = useWeb3Contract()
    const { ref } = useSectionInView("Fund", 1)
    const contractAddress = contract.address
    const contractAbi = contract.abi

    const handleFundVDR = async () => {
        setIsLoading(true)

        try {
            const fundVDR = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "fundVirtualDreamRaiser",
                params: {},
                msgValue: ethers.utils.parseEther(amount as string).toString(),
            }

            await runContractFunction({
                params: fundVDR,
                onError: () => handleError(),
                onSuccess: () => handleSuccess(),
            })
        } catch (error) {
            console.log("Error 404 -> just kidding: Some unexpected error occured!")
        } finally {
            setIsLoading(false)
        }

        resetForm()
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setAmount(value)
    }

    const resetForm = () => {
        setAmount("")
    }

    return (
        <section ref={ref} id="fund" className="scroll-mt-28 flex flex-col justify-center items-center w-[min(100%,45rem)] z-30 px-4 sm:px-0">
            <SectionHeading>Fund Virtual Dream Raiser</SectionHeading>
            <p className="text-white text-center mb-[1rem]">
                If you appreciate our mission and efforts, consider supporting{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Virtual Dream Raiser</span> by tossing a
                coin our way. Your support will be invaluable and greatly appreciated!
            </p>
            <input
                className="h-12 border-0 rounded-full bg-black/70 hover:bg-devil shadow-lg hover:shadow-xl hover:shadow-lightPurple/50 text-center shadow-lightPurple/50 text-gray-300
                            focus:text-gray-300 placeholder:text-gray-600 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-darkPurple transition-all duration-75 caret-darkPurple"
                type="text"
                name="fund"
                id="fund"
                placeholder="Amount (ETH)"
                value={amount}
                onChange={handleInputChange}
            ></input>
            <Button name="Fund VDR" onClick={handleFundVDR} disabled={isLoading} />
        </section>
    )
}

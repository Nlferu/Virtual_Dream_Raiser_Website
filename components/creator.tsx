import React, { useState, ChangeEvent } from "react"
import { creatorInputs } from "@/lib/data"
import { Button } from "@/components/button"
import { useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import { handleError, handleSuccess } from "@/lib/error-handlers"
import { validateString, getErrorMessage } from "@/lib/utils"
import { useSectionInView } from "@/lib/hooks"
import { motion } from "framer-motion"
import SectionHeading from "./section-heading"
import contract from "@/contracts/VirtualDreamRaiser.json"

export default function Creator() {
    const [formData, setFormData] = useState({ goal: "", expiration: "", wallet: "", description: "" })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    /* @ts-ignore */
    const { runContractFunction } = useWeb3Contract()
    const { ref } = useSectionInView("Creator", 0.75)

    const contractAddress = contract.address
    const abi = contract.abi

    const goal = formData.goal
    const expiration = formData.expiration
    const wallet = formData.wallet
    const description = formData.description

    const handleCreateDream = async () => {
        setIsLoading(true)

        try {
            if (!validateString(formData.description, 5000)) {
                handleError("Description Error: Maximum characters amount (5000) exceeded")
            } else {
                console.log(`Goal: ${goal} Exp: ${expiration} Wallet: ${wallet} Desc: ${description}`)

                // ETH Conversion To Wei
                let convGoal = ethers.utils.parseEther(goal as string)

                const createDream = {
                    abi: abi,
                    contractAddress: contractAddress,
                    functionName: "createDream",
                    params: {
                        goal: convGoal,
                        description: description,
                        expiration: expiration,
                        organizatorWallet: wallet,
                    },
                }

                await runContractFunction({
                    params: createDream,
                    onSuccess: () => handleSuccess("Dream Creation: \nDream Created Successfully!"),
                    onError: (error) => handleError(`Dream Creation Error: \n${error.message}`),
                })
            }
        } catch (error) {
            handleError(getErrorMessage(error))
        } finally {
            setIsLoading(false)
        }

        resetForm()
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const resetForm = () => {
        setFormData({
            goal: "",
            expiration: "",
            wallet: "",
            description: "",
        })
    }

    return (
        <motion.section
            ref={ref}
            id="creator"
            className="scroll-mt-28 flex flex-col justify-center items-center w-[min(100%,38rem)] z-30"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.1,
            }}
        >
            <SectionHeading>Create Dream</SectionHeading>

            <form className="flex flex-col">
                <div className="flex flex-col gap-6 w-auto sm:w-[16rem] self-center">
                    {creatorInputs.map((input) => (
                        <input
                            className="h-12 px-4 border-0 rounded-full bg-black/70 hover:bg-devil shadow-lg hover:shadow-xl hover:shadow-lightPurple/50 text-center shadow-lightPurple/50 text-gray-300
                            focus:text-gray-300 placeholder:text-gray-600 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-darkPurple transition-all duration-75 caret-darkPurple"
                            key={input.name}
                            type={input.type}
                            name={input.name}
                            id={input.name}
                            placeholder={input.placeholder}
                            value={formData[input.name]}
                            onChange={handleInputChange}
                            required
                        ></input>
                    ))}
                </div>
                <div className="flex flex-col w-[20rem] sm:w-[30rem] md:w-[40rem] self-center mt-[2rem] px-3">
                    <textarea
                        className="h-52 p-4 px-3 rounded-lg border-0 bg-black/70 hover:bg-devil shadow-lg shadow-lightPurple/50 hover:shadow-xl hover:shadow-lightPurple/50 text-gray-300
                        focus:text-gray-300 placeholder:text-gray-600 placeholder:items-center focus:outline focus:outline-2 focus:outline-offset-0
                        focus:outline-darkPurple transition-all duration-75 caret-darkPurple"
                        name="description"
                        id="description"
                        maxLength={5000}
                        placeholder="Description..."
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <Button name="Create Dream" onClick={handleCreateDream} disabled={isLoading} />
            </form>
        </motion.section>
    )
}

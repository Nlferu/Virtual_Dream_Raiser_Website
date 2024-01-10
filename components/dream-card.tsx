import React, { useState, useEffect, ChangeEvent } from "react"
import { CardButton, WithdrawCardButton, DisabledButton } from "./button"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { BigNumber, ethers } from "ethers"
import { truncateStr, formatTimeLeft, getErrorMessage } from "@/lib/utils"
import { handleError, handleSuccess } from "@/lib/error-handlers"
import { BsCheckCircleFill } from "react-icons/bs"
import { FaTimesCircle } from "react-icons/fa"
import { useCountdown } from "@/lib/hooks"
import contract from "@/contracts/VirtualDreamRaiser.json"

type DreamCardProps = {
    dreamId: number
}

export default function DreamCard({ dreamId }: DreamCardProps) {
    const [amount, setAmount] = useState<string>()
    const [isLoadingFund, setIsLoadingFund] = useState<boolean>(false)
    const [isLoadingWithdraw, setIsLoadingWithdraw] = useState<boolean>(false)
    const { isWeb3Enabled, account } = useMoralis()
    /* @ts-ignore */
    const { runContractFunction } = useWeb3Contract()
    const { secondsLeft, startTimer } = useCountdown()
    const contractAddress = contract.address
    const contractAbi = contract.abi

    const {
        runContractFunction: getCreator,
        data: creator,
        error: creatorError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getCreator",
        params: { dreamId: dreamId },
    })

    const {
        runContractFunction: getWallet,
        data: walletz,
        error: walletError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getWithdrawWallet",
        params: { dreamId: dreamId },
    })

    const {
        runContractFunction: getStatus,
        data: status,
        error: statusError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getStatus",
        params: { dreamId: dreamId },
    })

    const {
        runContractFunction: getDescription,
        data: description,
        error: descriptionError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getDescription",
        params: { dreamId: dreamId },
    })

    const {
        runContractFunction: getGathered,
        data: bigGathered,
        error: gatheredError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getTotalGathered",
        params: { dreamId: dreamId },
    })

    const {
        runContractFunction: getGoal,
        data: bigGoal,
        error: goalError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getGoal",
        params: { dreamId: dreamId },
    })

    const {
        runContractFunction: getTimeLeft,
        data: expiration,
        error: expirationError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getTimeLeft",
        params: { dreamId: dreamId },
    })

    const {
        runContractFunction: getPromoted,
        data: promoted,
        error: promotedError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getPromoted",
        params: { dreamId: dreamId },
    })

    const {
        runContractFunction: getDreamBalance,
        data: dreamBalance,
        error: dreamBalanceError,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "getDreamBalance",
        params: { dreamId: dreamId },
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            getCreator()
            getWallet()
            getStatus()
            getDescription()
            getGathered()
            getGoal()
            getTimeLeft()
            getPromoted()
            getDreamBalance()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        startTimer((expiration as BigNumber)?.toNumber())
    }, [expiration])

    const creatorWallet = truncateStr((creator as string) || "0x0000000000000000000000000000000000000000", 15)
    const wallet = truncateStr((walletz as string) || "0x0000000000000000000000000000000000000000", 15)
    const formattedTime = formatTimeLeft(secondsLeft)
    const gathered = parseFloat(ethers.utils.formatEther((bigGathered as BigNumber) || 0))
    const goal = parseFloat(ethers.utils.formatEther((bigGoal as BigNumber) || 0))
    const progress = (gathered / goal) * 100 || 0
    const dreamBal = parseFloat(ethers.utils.formatEther((dreamBalance as BigNumber) || 0))

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setAmount(value)
    }

    const resetForm = () => {
        setAmount("")
    }

    const handleFundDream = async () => {
        setIsLoadingFund(true)

        try {
            const fundDream = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "fundDream",
                params: { dreamId: dreamId },
                msgValue: ethers.utils.parseEther(amount as string).toString(),
            }

            await runContractFunction({
                params: fundDream,
                onError: (error) => handleError(`Dream Funding Error: \n${error.message}`),
                onSuccess: () => handleSuccess(`Dream Funding Success: \nDream Id ${dreamId} Funded Successfully!`),
            })
        } catch (error) {
            handleError(getErrorMessage(error))
        } finally {
            setIsLoadingFund(false)
        }

        resetForm()
    }

    const handleWithdrawDream = async () => {
        setIsLoadingWithdraw(true)

        try {
            const withdrawDream = {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "realizeDream",
                params: { dreamId: dreamId },
            }

            await runContractFunction({
                params: withdrawDream,
                onError: (error) => handleError(`Dream Funds Withdrawal Error: \n${error.message}`),
                onSuccess: () => handleSuccess(`Dream Funds Withdrawal: \nDream Funds Withdrew Successfully!`),
            })
        } catch (error) {
            handleError(getErrorMessage(error))
        } finally {
            setIsLoadingWithdraw(false)
        }

        resetForm()
    }

    return (
        <div className="bg-lightPurple/10 flex flex-col gap-2 items-center justify-center h-[37rem] w-[20rem] sm:w-[21rem] border-[1px] border-lightPurple p-3 rounded-lg shadow-md text-gray-300">
            <h2 className="text-lg font-bold mb-2 flex text-center justify-center items-center text-violet-500/90">Dream ID: {dreamId}</h2>
            <div>
                <strong className="text-cyan-700">Creator:</strong> {creatorWallet}
            </div>
            <div>
                <strong className="text-cyan-700">Designated Wallet:</strong> {wallet}
            </div>

            <div className="flex gap-2">
                <strong className="text-cyan-700">Verified:</strong>{" "}
                {(promoted as boolean) ? (
                    <div className="text-green-600 mt-1">
                        <BsCheckCircleFill />
                    </div>
                ) : (
                    <div className="text-orange-600 mt-1">
                        <FaTimesCircle />
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <strong className="text-cyan-700">Status:</strong>{" "}
                {(status as boolean) ? <div className="text-green-600/90">Active</div> : <div className="text-orange-500/90">Expired</div>}
            </div>

            <div>
                <strong className="flex text-center items-center justify-center text-cyan-700">Description:</strong>{" "}
                <div className="flex flex-wrap text-center min-h-[10rem]">{description as string}</div>
            </div>

            <div>
                Raised <strong className="text-cyan-300">{gathered}</strong> <strong className="text-cyan-700">ETH</strong> out of{" "}
                <strong className="text-cyan-300">{goal} </strong> <strong className="text-cyan-700">ETH</strong>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                {gathered > goal ? (
                    <div className="bg-lightPurple text-xs font-medium text-cyan-700 text-center p-0.5 leading-none rounded-full" style={{ width: `${100}%` }}>
                        {`${Math.round(progress)}%`}
                    </div>
                ) : (
                    <div
                        className="bg-lightPurple text-xs font-medium text-cyan-700 text-center p-0.5 leading-none rounded-full"
                        style={{ width: `${progress}%` }}
                    >
                        {`${Math.round(progress)}%`}
                    </div>
                )}
            </div>

            <div>
                {(expiration as BigNumber)?.toNumber() > 0 ? (
                    <div>
                        <strong className="text-cyan-700">Time Left:</strong> {formattedTime}{" "}
                    </div>
                ) : (
                    <div>
                        Time Left: <span className="text-orange-500/90">Expired</span>
                    </div>
                )}
            </div>

            <div className="my-[0.25rem]">
                <input
                    className="h-10 border-0 rounded-full bg-black/70 hover:bg-devil shadow-lg hover:shadow-xl hover:shadow-lightPurple/50 text-center shadow-lightPurple/50 text-gray-300
                            focus:text-gray-300 placeholder:text-gray-600 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-darkPurple transition-all duration-75 caret-darkPurple"
                    type="text"
                    name="fund"
                    placeholder="Amount (ETH)"
                    value={amount}
                    onChange={handleInputChange}
                ></input>
            </div>

            {isWeb3Enabled && account == (creator as string)?.toLowerCase() ? (
                <div className="flex gap-8">
                    {status ? (
                        <div>
                            <CardButton name="Fund" onClick={handleFundDream} disabled={isLoadingFund} />
                        </div>
                    ) : (
                        <div>
                            <DisabledButton name="Fund" />
                        </div>
                    )}

                    <div>
                        {dreamBal > 0 ? (
                            <WithdrawCardButton name="Withdraw" onClick={handleWithdrawDream} disabled={isLoadingWithdraw} />
                        ) : (
                            <DisabledButton name="Withdraw" />
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    {status ? (
                        <div>
                            <CardButton name="Fund" onClick={handleFundDream} disabled={isLoadingFund} />
                        </div>
                    ) : (
                        <div>
                            <DisabledButton name="Fund" />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

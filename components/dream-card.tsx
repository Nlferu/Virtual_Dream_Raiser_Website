import React, { useState, ChangeEvent } from "react"
import { CardButton, WithdrawCardButton, DisabledButton } from "./button"
import { useWeb3Contract, useMoralis } from "react-moralis"

type DreamCardProps = {
    creators: (string | undefined)[]
    designatedWallets: (string | undefined)[]
    id: string
    statuses: (boolean | undefined)[]
    descriptions: (string | undefined)[]
    gathereds: (number | undefined)[]
    goals: (number | undefined)[]
    expirations: (number | undefined)[]
    promoteds: (boolean | undefined)[]
    dreamId: number
}

const truncateStr = (fullStr: string, strLen: number) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = "..."

    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2)

    return fullStr.substring(0, frontChars) + separator + fullStr.substring(fullStr.length - backChars)
}

export default function DreamCard({
    creators,
    designatedWallets,
    id,
    statuses,
    descriptions,
    gathereds,
    goals,
    expirations,
    promoteds,
    dreamId,
}: DreamCardProps) {
    const [amount, setAmount] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isWeb3Enabled, account } = useMoralis()
    let progress = 0

    if (
        creators[dreamId] === undefined ||
        designatedWallets[dreamId] === undefined ||
        statuses[dreamId] === undefined ||
        descriptions[dreamId] === undefined ||
        gathereds[dreamId] === undefined ||
        goals[dreamId] === undefined ||
        expirations[dreamId] === undefined ||
        promoteds[dreamId] === undefined
    ) {
        creators[dreamId] = "0x0000...000000"
        designatedWallets[dreamId] = "0x0000...000000"
        statuses[dreamId] = false
        descriptions[dreamId] = ""
        gathereds[dreamId] = 0
        goals[dreamId] = 1
        expirations[dreamId] = 0
        promoteds[dreamId] = false
    } else {
        if (dreamId !== undefined && goals[dreamId] !== 0) {
            progress = ((gathereds[dreamId] as number) / goals[dreamId]!) * 100
        }
    }

    const creatorWallet = truncateStr(creators[dreamId] || "", 15)
    const wallet = truncateStr(designatedWallets[dreamId] || "", 15)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setAmount(value)
    }

    const resetForm = () => {
        setAmount("")
    }

    const handleFundDream = async () => {
        setIsLoading(true)

        try {
            console.log("Funded")
            console.log(account)
            console.log(creators[dreamId])
            console.log(amount)
        } catch (error) {
            console.log("Error 404 -> just kidding: Some unexpected error occured!")
        } finally {
            setIsLoading(false)
        }

        resetForm()
    }

    return (
        <div className="bg-lightPurple/10 flex flex-col gap-2 items-center justify-center h-[35rem] w-[20rem] border-[1px] border-lightPurple p-3 rounded-lg shadow-md text-darkPurple">
            <h2 className="text-lg font-bold mb-2 flex text-center justify-center items-center text-violet-500/90">Dream ID: {id}</h2>
            <div>
                <strong className="text-cyan-500">Creator:</strong> {creatorWallet}
            </div>
            <div>
                <strong className="text-cyan-500">Designated Wallet:</strong> {wallet}
            </div>

            <div>
                <strong className="text-cyan-500">Status:</strong> {statuses[dreamId] ? <>true</> : <>false</>}
            </div>

            <div>
                <strong className="flex text-center items-center justify-center text-cyan-500">Description:</strong>{" "}
                <div className="flex flex-wrap text-center min-h-[10rem]">{descriptions[dreamId]}</div>
            </div>

            <div>
                Raised <strong className="text-cyan-500">{gathereds[dreamId]} ETH</strong> out of{" "}
                <strong className="text-cyan-500">{goals[dreamId]} ETH</strong>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                {gathereds[dreamId]! > goals[dreamId]! ? (
                    <div className="bg-lightPurple text-xs font-medium text-cyan-500 text-center p-0.5 leading-none rounded-full" style={{ width: `${100}%` }}>
                        {`${Math.round(progress)}%`}
                    </div>
                ) : (
                    <div
                        className="bg-lightPurple text-xs font-medium text-cyan-500 text-center p-0.5 leading-none rounded-full"
                        style={{ width: `${progress}%` }}
                    >
                        {`${Math.round(progress)}%`}
                    </div>
                )}
            </div>

            <div>
                <strong className="text-cyan-500">Time Left:</strong> {expirations[dreamId]} days left
            </div>

            <div className="my-[0.25rem]">
                <input
                    className="h-10 border-0 rounded-full bg-black/70 hover:bg-devil shadow-lg hover:shadow-xl hover:shadow-lightPurple/50 text-center shadow-lightPurple/50 text-gray-300
                            focus:text-gray-300 placeholder:text-gray-600 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-darkPurple transition-all duration-75 caret-darkPurple"
                    type="text"
                    name="fund"
                    id="fund"
                    placeholder="Amount (ETH)"
                    value={amount}
                    onChange={handleInputChange}
                ></input>
            </div>

            {isWeb3Enabled && account == creators[dreamId]?.toLowerCase() ? (
                <div className="flex gap-8">
                    {statuses[dreamId] ? (
                        <div>
                            <CardButton name="Fund" onClick={handleFundDream} disabled={isLoading} />
                        </div>
                    ) : (
                        <div>
                            <DisabledButton name="Fund" />
                        </div>
                    )}

                    <div>
                        <WithdrawCardButton name="Withdraw" onClick={handleFundDream} disabled={isLoading} />
                    </div>
                </div>
            ) : (
                <div>
                    {statuses[dreamId] ? (
                        <div>
                            <CardButton name="Fund" onClick={handleFundDream} disabled={isLoading} />
                        </div>
                    ) : (
                        <div>
                            <DisabledButton name="Fund" />
                        </div>
                    )}
                </div>
            )}

            <div>
                <strong>Promoted:</strong> {promoteds[dreamId] ? <>true</> : <>false</>}
            </div>
        </div>
    )
}

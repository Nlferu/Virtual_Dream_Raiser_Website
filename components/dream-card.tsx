import React, { useState } from "react"
import { CardButton, WithdrawCardButton, DisabledButton } from "./button"
import { useWeb3Contract, useMoralis } from "react-moralis"

/**@dev Card Data
 * creator
 * designated wallet
 * total gathered / goal
 * id
 * status
 * description
 * time left to expiration
 * promoted ?
 */

type DreamCardProps = {
    creator: string
    designatedWallet: string
    totalGathered: number
    goal: number
    id: string
    status: boolean
    description: string
    timeLeftToExpiration: string
    promoted: boolean
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

export default function DreamCard({ creator, designatedWallet, totalGathered, goal, id, status, description, timeLeftToExpiration, promoted }: DreamCardProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isWeb3Enabled, account } = useMoralis()

    const progress = (totalGathered / goal) * 100
    const creatorWallet = truncateStr(creator || "", 15)

    const handleFundDream = async () => {
        setIsLoading(true)

        try {
            console.log("Funded")
            console.log(account)
            console.log(creator)
        } catch (error) {
            console.log("Error 404 -> just kidding: Some unexpected error occured!")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-lightPurple/10 flex flex-col gap-2 items-center justify-center h-[32rem] w-[20rem] border-[1px] border-lightPurple p-3 rounded-lg shadow-md text-darkPurple">
            <h2 className="text-lg font-bold mb-2 flex text-center justify-center items-center text-violet-500/90">Dream ID: {id}</h2>
            <div>
                <strong className="text-cyan-500">Creator:</strong> {creatorWallet}
            </div>
            <div>
                <strong className="text-cyan-500">Designated Wallet:</strong> {designatedWallet}
            </div>

            <div>
                <strong className="text-cyan-500">Status:</strong> {status ? <>true</> : <>false</>}
            </div>

            <div>
                <strong className="flex text-center items-center justify-center text-cyan-500">Description:</strong>{" "}
                <div className="flex flex-wrap text-center min-h-[10rem]">{description}</div>
            </div>

            <div>
                Raised <strong className="text-cyan-500">{totalGathered} ETH</strong> out of <strong className="text-cyan-500">{goal} ETH</strong>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                {totalGathered > goal ? (
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
                <strong className="text-cyan-500">Time Left:</strong> {timeLeftToExpiration} days left
            </div>

            {isWeb3Enabled && account == creator.toLowerCase() ? (
                <div className="flex gap-8">
                    {status ? (
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
                    {status ? (
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
                <strong>Promoted:</strong> {promoted ? "Yes" : "No"}
            </div>
        </div>
    )
}

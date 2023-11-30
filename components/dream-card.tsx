import React from "react"

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
    status: string
    description: string
    timeLeftToExpiration: string
    promoted: boolean
}

export default function DreamCard({ creator, designatedWallet, totalGathered, goal, id, status, description, timeLeftToExpiration, promoted }: DreamCardProps) {
    let progress = (totalGathered / goal) * 100

    return (
        <div className="bg-lightPurple/10 flex flex-col gap-2 items-center justify-center h-[30rem] w-[20rem] border-[1px] border-lightPurple p-3 rounded-lg shadow-md text-darkPurple">
            <h2 className="text-lg font-bold mb-2 flex text-center justify-center items-center text-violet-500/90">Dream ID: {id}</h2>
            <div>
                <strong className="text-cyan-500">Creator:</strong> {creator}
            </div>
            <div>
                <strong className="text-cyan-500">Designated Wallet:</strong> {designatedWallet}
            </div>

            <div>
                <strong className="text-cyan-500">Status:</strong> {status}
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

            <div>
                <strong>Promoted:</strong> {promoted ? "Yes" : "No"}
            </div>
        </div>
    )
}

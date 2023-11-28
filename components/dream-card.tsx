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
    return (
        <div className="flex flex-col h-[20rem] w-[15rem] border-[1px] border-lightPurple p-3 rounded-lg shadow-md text-darkPurple">
            <div>
                <h2 className="text-lg font-bold mb-2">Dream Details</h2>
                <div>
                    <strong>Creator:</strong> {creator}
                </div>
                <div>
                    <strong>Designated Wallet:</strong> {designatedWallet}
                </div>
                <div>
                    <strong>Total Gathered:</strong> {totalGathered} ETH
                </div>
                <div>
                    <strong>Goal:</strong> {goal} ETH
                </div>
                <div>
                    <strong>ID:</strong> {id}
                </div>
                <div>
                    <strong>Status:</strong> {status}
                </div>
                <div>
                    <strong>Description:</strong> {description}
                </div>
                <div>
                    <strong>Time Left to Expiration:</strong> {timeLeftToExpiration}
                </div>
                <div>
                    <strong>Promoted:</strong> {promoted ? "Yes" : "No"}
                </div>
            </div>
        </div>
    )
}

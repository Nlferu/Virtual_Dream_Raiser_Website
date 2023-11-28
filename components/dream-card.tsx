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
    children: React.ReactNode
}

export default function DreamCard({ children }: DreamCardProps) {
    return <div className="flex h-[20rem] w-[15rem] border-[1px] border-lightPurple gap-3">{children}</div>
}

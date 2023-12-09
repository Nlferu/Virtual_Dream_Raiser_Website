import React from "react"

type ConnectionCheckerProps = {
    children: React.ReactNode
}

export default function ConnectionChecker({ children }: ConnectionCheckerProps) {
    return (
        <div className="flex flex-col text-center items-center justify-center my-[3rem]">
            <p className="bg-gradient-to-r from-orange-600 via-cyan-700 to-yellow-600 inline-block text-transparent bg-clip-text text-2xl font-bold h-[5rem]">
                {children}
            </p>
        </div>
    )
}

import React from "react"

type SectionHeadingProps = {
    children: React.ReactNode
}

export default function SectionHeading({ children }: SectionHeadingProps) {
    return (
        <h2 className="text-4xl font-medium capitalize mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 z-30">
            {children}
        </h2>
    )
}

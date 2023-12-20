import React from "react"

export default function BlackHole() {
    return (
        <div className="absolute top-[-24.6rem] flex flex-col h-full w-full">
            <video autoPlay muted loop className="rotate-180 h-full w-full left-0 z-[1] object-cover ">
                <source src="/blackhole.webm" type="video/webm" />
            </video>
        </div>
    )
}

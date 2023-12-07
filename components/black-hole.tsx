import React from "react"

export default function BlackHole() {
    return (
        <div className="flex flex-col">
            <video autoPlay muted loop className="rotate-180 absolute top-[-27.1rem] h-[108%] w-full left-0 z-[1] object-cover shadow-blur">
                <source src="/blackhole.webm" type="video/webm" />
            </video>
        </div>
    )
}

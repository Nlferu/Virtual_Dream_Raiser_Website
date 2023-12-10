import React from "react"

export default function BlackHole() {
    return (
        <div className="absolute top-[-29.5rem]">
            <div className="z-[1] relative flex items-center justify-center">
                <video className="max-w-[119.5rem] max-h-[80rem] rotate-180 shadow-blur" preload="false" playsInline loop muted autoPlay src="/blackhole.webm">
                    <source src="/blackhole.webm" type="video/webm" />
                </video>
            </div>
        </div>
    )
}

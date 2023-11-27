import React from "react"

const BlackHole = () => {
    return (
        <div className="">
            <video autoPlay muted loop className="rotate-180 absolute top-[-25rem] h-full w-full left-0 z-[1] object-cover">
                <source src="/blackhole.webm" type="video/webm" />
            </video>
        </div>
    )
}

export default BlackHole

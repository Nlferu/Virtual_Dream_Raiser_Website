interface ButtonProps {
    name: string
    onClick: () => void
    disabled?: boolean
}

interface DisabledButtonProps {
    name: string
}

export function Button({ name, onClick, disabled }: ButtonProps) {
    return (
        <button
            className="text-purple-200 flex m-auto mt-[1.5rem] justify-center items-center overflow-hidden w-[8.4rem] h-[3.7rem] bg-black/70 rounded-full
                hover:scale-[1.03] active:scale-[1.01]"
            onClick={onClick}
            disabled={disabled}
        >
            {disabled ? <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-lightPurple"></div> : <>{name}</>}
        </button>
    )
}

export function TestButton({ name, onClick, disabled }: ButtonProps) {
    return (
        <button
            className="group relative text-white flex m-auto mt-[1.5rem] justify-center items-center overflow-hidden w-[8.4rem] h-[3.9rem] bg-black rounded-full
                after:content-[''] after:absolute after:w-[12rem] after:h-[10rem] after:bg-linear-gradient after:animate-fullSpin
                focus:scale-105 hover:scale-105 hover:bg-opacity-100 active:scale-[1.01] duration-custom ease-customBezier"
            onClick={onClick}
            disabled={disabled}
        >
            <span
                className="absolute flex font-bold justify-center items-center inset-[0.2rem] bg-black rounded-full z-[1]
                group-hover:bg-black group-hover:scale-[1.03] duration-custom ease-customBezier
                group-active-scale[1.05] group-hover:text-white"
            >
                {disabled ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-b-[3px] border-purple-600"></div>
                ) : (
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">{name}</div>
                )}
            </span>
        </button>
    )
}

export function DisabledButton({ name }: DisabledButtonProps) {
    return (
        <button
            className="text-purple-200 flex m-auto mt-[1.5rem] justify-center items-center overflow-hidden w-[8.4rem] h-[3.9rem] bg-black rounded-full
            hover:scale-[1.03] active:scale-[1.01]"
        >
            {name}
        </button>
    )
}

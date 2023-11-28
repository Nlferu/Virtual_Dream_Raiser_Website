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

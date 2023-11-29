import React from "react"

export default function SubmitButton() {
    return (
        <button
            className="group mt-[1.5rem] flex font-semibold items-center self-center justify-center w-[7rem] gap-2 py-[0.7rem] sm:py-[0.9rem]
                     text-white borderBlack borderDevil bg-black bg-opacity-90
                     rounded-full focus:scale-110 hover:scale-110 hover:bg-opacity-100
                     active:scale-105 duration-custom ease-customBezier hover:translate-y-[-4px] disabled:scale-100 disabled:bg-opacity-50
                     shadow-lg shadow-lightPurple/50 hover:shadow-xl hover:shadow-lightPurple/50 hover:bg-devil"
            type="submit"
        >
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center">Submit</div>
        </button>
    )
}

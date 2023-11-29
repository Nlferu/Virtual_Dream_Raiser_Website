import SectionHeading from "./section-heading"
import { creatorInputs } from "@/lib/data"
import { Button } from "@/components/button"

export default function Creator() {
    const handleCreateDream = async () => {}

    return (
        <section id="creator" className="scroll-mt-28 flex flex-col justify-center items-center w-[min(100%,38rem)] z-30">
            <SectionHeading>Create Dream</SectionHeading>

            <form className="flex flex-col">
                <div className="flex flex-col gap-6 w-auto sm:w-[16rem] self-center">
                    {creatorInputs.map((input) => (
                        <input
                            className="h-12 px-4 border-0 rounded-full bg-black/70 hover:bg-devil shadow-lg text-center shadow-lightPurple/50 text-gray-300
                            focus:text-gray-300 placeholder:text-gray-600 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-darkPurple transition-all duration-75 caret-darkPurple"
                            key={input.name}
                            type={input.type}
                            name={input.name}
                            id={input.name}
                            placeholder={input.placeholder}
                        ></input>
                    ))}
                </div>
                <div className="flex flex-col w-[20rem] sm:w-[30rem] md:w-[40rem] self-center mt-[2rem] px-3">
                    <textarea
                        className="h-52 p-4 px-3 rounded-lg border-0 bg-black/70 hover:bg-devil shadow-lg shadow-lightPurple/50 text-gray-300
                        focus:text-gray-300 placeholder:text-gray-600 placeholder:items-center focus:outline focus:outline-2 focus:outline-offset-0
                        focus:outline-darkPurple transition-all duration-75 caret-darkPurple"
                        name="message"
                        required
                        maxLength={5000}
                        placeholder="Description..."
                    />

                    <Button name="Create Dream" onClick={handleCreateDream} />
                </div>
            </form>
        </section>
    )
}

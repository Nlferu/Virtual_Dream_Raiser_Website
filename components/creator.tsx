import React, { useState, ChangeEvent } from "react"
import SectionHeading from "./section-heading"
import toast from "react-hot-toast"
import { creatorInputs } from "@/lib/data"
import { createDream } from "@/actions/createDream"
import SubmitButton from "./submit-button"

export default function Creator() {
    const [formData, setFormData] = useState({
        goal: "",
        expiration: "",
        wallet: "",
        description: "",
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formDataToSend = new FormData()
        formDataToSend.append("goal", formData.goal)
        formDataToSend.append("expiration", formData.expiration)
        formDataToSend.append("wallet", formData.wallet)
        formDataToSend.append("description", formData.description)

        const { data, error } = await createDream(formDataToSend)

        if (error) {
            toast.error(error, {
                style: {
                    border: "1px solid #713200",
                    background: "rgba(37, 32, 35, 0.4)",
                    padding: "15px",
                    color: "rgba(203, 207, 204, 1)",
                },
                iconTheme: {
                    primary: "#713200",
                    secondary: "black",
                },
            })
            return
        }

        toast.success("Action Performed Successfully", {
            style: {
                border: "1px solid rgba(67, 52, 28, 0.8)",
                background: "rgba(37, 32, 35, 0.4)",
                padding: "15px",
                color: "rgba(203, 207, 204, 1)",
            },
            iconTheme: {
                primary: "rgba(49, 169, 73, 1)",
                secondary: "black",
            },
        })

        resetForm()
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const resetForm = () => {
        setFormData({
            goal: "",
            expiration: "",
            wallet: "",
            description: "",
        })
    }

    return (
        <section id="creator" className="scroll-mt-28 flex flex-col justify-center items-center w-[min(100%,38rem)] z-30">
            <SectionHeading>Create Dream</SectionHeading>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 w-auto sm:w-[16rem] self-center">
                    {creatorInputs.map((input) => (
                        <input
                            className="h-12 px-4 border-0 rounded-full bg-black/70 hover:bg-devil shadow-lg hover:shadow-xl hover:shadow-lightPurple/50 text-center shadow-lightPurple/50 text-gray-300
                            focus:text-gray-300 placeholder:text-gray-600 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-darkPurple transition-all duration-75 caret-darkPurple"
                            key={input.name}
                            type={input.type}
                            name={input.name}
                            id={input.name}
                            placeholder={input.placeholder}
                            value={formData[input.name]}
                            onChange={handleInputChange}
                        ></input>
                    ))}
                </div>
                <div className="flex flex-col w-[20rem] sm:w-[30rem] md:w-[40rem] self-center mt-[2rem] px-3">
                    <textarea
                        className="h-52 p-4 px-3 rounded-lg border-0 bg-black/70 hover:bg-devil shadow-lg shadow-lightPurple/50 hover:shadow-xl hover:shadow-lightPurple/50 text-gray-300
                        focus:text-gray-300 placeholder:text-gray-600 placeholder:items-center focus:outline focus:outline-2 focus:outline-offset-0
                        focus:outline-darkPurple transition-all duration-75 caret-darkPurple"
                        name="description"
                        id="description"
                        required
                        maxLength={5000}
                        placeholder="Description..."
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <SubmitButton />
            </form>
        </section>
    )
}

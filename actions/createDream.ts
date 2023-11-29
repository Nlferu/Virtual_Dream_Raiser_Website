import { validateString, getErrorMessage } from "@/lib/utils"

export const createDream = async (formData: FormData) => {
    let data = ""
    const goal = formData.get("goal")
    const expiration = formData.get("expiration")
    const wallet = formData.get("wallet")
    const description = formData.get("description")

    if (!validateString(goal, 100)) {
        return {
            error: "Invalid sender email",
        }
    }

    if (!validateString(description, 5000)) {
        return {
            error: "Invalid message",
        }
    }

    try {
        console.log("FORMS DATA: ", goal)
        console.log("FORMS DATA: ", expiration)
        console.log("FORMS DATA: ", wallet)
        console.log("FORMS DATA: ", description)
        data = "success"
    } catch (error) {
        return {
            error: getErrorMessage(error),
        }
    }

    return { data }
}

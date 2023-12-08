/** @dev To be corrected for all values */

export const validateString = (value: unknown, maxLength: number): value is string => {
    if (!value || typeof value !== "string" || value.length > maxLength) {
        return false
    }

    return true
}

export const getErrorMessage = (error: unknown): string => {
    let message: string

    if (error instanceof Error) {
        message = error.message
    } else if (error && typeof error === "object" && "message" in error) {
        message = String(error.message)
    } else if (typeof error === "string") {
        message = error
    } else {
        message = "Aww snap something went wrong..."
    }

    return message
}

export const truncateStr = (fullStr: string, strLen: number) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = "..."

    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2)

    return fullStr.substring(0, frontChars) + separator + fullStr.substring(fullStr.length - backChars)
}

export const formatTimeLeft = (seconds: number): string => {
    const days = Math.floor(seconds / (3600 * 24))
    const hours = Math.floor((seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const formattedTime = `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`

    return formattedTime
}

export const formatTimeLeftLottery = (seconds: number): string => {
    const hours = Math.floor((seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const formattedTime = `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(remainingSeconds).padStart(2, "0")}`

    return formattedTime
}

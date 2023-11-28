export const links = [
    {
        name: "Home",
        hash: "#home",
    },
    {
        name: "Creator",
        hash: "#creator",
    },
    {
        name: "Dreams",
        hash: "#dreams",
    },
    {
        name: "Fund",
        hash: "#fund",
    },
    {
        name: "Lottery",
        hash: "#lottery",
    },
] as const

export const creatorInputs = [
    { type: "text", name: "goal", placeholder: "Goal (ETH)" },
    { type: "text", name: "expiration", placeholder: "Expiration (Days)" },
    { type: "text", name: "wallet", placeholder: "Wallet For Withdrawals" },
] as const

export const dreamsData = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"] as const

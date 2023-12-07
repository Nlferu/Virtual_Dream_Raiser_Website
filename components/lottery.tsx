import { useSectionInView } from "@/lib/hooks"
import { truncateStr } from "@/lib/utils"
import SectionHeading from "./section-heading"
import contract from "@/contracts/VirtualDreamRewarder.json"

export default function Lottery() {
    const { ref } = useSectionInView("Lottery", 1)

    const recentWinner = truncateStr(("0x50e2a33B9E04e78bF1F1d1F94b0be95Be63C23e7" as string) || "0x0000000000000000000000000000000000000000", 15)

    return (
        <section ref={ref} id="lottery" className="scroll-mt-28 flex flex-col justify-center items-center w-[min(100%,50rem)] z-30 px-4 sm:px-0">
            <SectionHeading>Lottery</SectionHeading>
            <div className="flex flex-col text-white gap-2 text-center">
                <div>Prize Pool:</div>
                <div>1.33 ETH</div>
                <div className="mt-3">Funders:</div>
                <div>138</div>
                <div className="mt-3">Recent Winner:</div>
                <div>{recentWinner}</div>
                <div className="mt-3">Next Winner Picking In:</div>
                <div>04:15:33</div>
            </div>

            <p className="text-white text-center mt-[2rem]">
                To incentivize and reward contributors, we provide every funder with an opportunity to participate in a lottery draw for a prize. The lottery
                prize pool continuously grows, accumulating 2% from each funding transaction. This means that for every contribution made, 2% of the transaction
                amount contributes to the lottery prize pool. Every individual who funds any dream or{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Virtual Dream Raiser</span> itself
                becomes eligible to win from this lottery prize pool, offering each funder a chance to win the lottery prize!
            </p>
        </section>
    )
}

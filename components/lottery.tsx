import { useSectionInView } from "@/lib/hooks"
import SectionHeading from "./section-heading"

export default function Lottery() {
    const { ref } = useSectionInView("Lottery", 1)

    return (
        <section ref={ref} id="lottery" className="scroll-mt-28 flex flex-col justify-center items-center w-[min(100%,50rem)] z-30 px-4 sm:px-0">
            <SectionHeading>Lottery</SectionHeading>
            <p className="text-white text-center">
                To incentivize and reward contributors, we provide every funder with an opportunity to participate in a lottery draw for a prize. The lottery
                prize pool continuously grows, accumulating 2% from each funding transaction. This means that for every contribution made, 2% of the transaction
                amount contributes to the lottery prize pool. Every individual who funds any dream or Virtual Dream Raiser itself becomes eligible to win from
                this lottery prize pool, offering each funder a chance to win the lottery prize!
            </p>
        </section>
    )
}

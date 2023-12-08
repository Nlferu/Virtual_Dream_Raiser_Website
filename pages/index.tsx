import BlackHole from "@/components/black-hole"
import About from "@/components/about"
import Creator from "@/components/creator"
import Dreams from "@/components/dreams"
import Wallets from "@/components/whiteWalletList"
import FundVDR from "@/components/fund-vdr"
import Lottery from "@/components/lottery"

export default function Index() {
    return (
        <main className="h-full w-full">
            <div className="flex flex-col justify-center items-center gap-20 z-50">
                <BlackHole />
                <About />
                <Creator />
                <Dreams />
                <Wallets />
                <FundVDR />
                <Lottery />
            </div>
        </main>
    )
}

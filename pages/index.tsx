import BlackHole from "@/components/black-hole"
import Encryption from "@/components/encryption"
import Dreams from "@/components/dreams"
import Info from "@/components/info"
import Creator from "@/components/creator"

export default function Index() {
    return (
        <main className="h-full w-full">
            <div className="flex flex-col justify-center items-center gap-20 z-50">
                <BlackHole />
                <Info />
                <Creator />
                <Dreams />
            </div>
        </main>
    )
}

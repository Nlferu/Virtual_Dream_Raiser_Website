import BlackHole from "@/components/black-hole"
import Encryption from "@/components/encryption"
import Dreams from "@/components/dreams"
import About from "@/components/about"
import Creator from "@/components/creator"

export default function Index() {
    return (
        <main className="h-full w-full">
            <div className="flex flex-col justify-center items-center gap-20 z-50">
                <BlackHole />
                <About />
                <Creator />
                <Dreams />
            </div>
        </main>
    )
}

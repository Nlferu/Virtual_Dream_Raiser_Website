import BlackHole from "@/components/blackHole"
import Encryption from "@/components/encryption"
import Skills from "@/components/skills"
import Info from "@/components/info"
import Creator from "@/components/creator"

export default function Index() {
    return (
        <main className="h-full w-full">
            <div className="flex flex-col justify-center items-center gap-20">
                <BlackHole />
                <Info />
                <Creator />
                <Skills />
            </div>
        </main>
    )
}

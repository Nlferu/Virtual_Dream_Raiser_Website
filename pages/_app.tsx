import type { AppProps } from "next/app"
import { MoralisProvider } from "react-moralis"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import Head from "next/head"
import StarsCanvas from "@/components/starBackground"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${inter.className} bg-[#030014] min-h-[100vh]`}>
            <Head>
                <title>Virtual Dream Raiser</title>
                <meta name="description" content="Virtual Dream Raiser" />
                <link rel="icon" href="/icon.png" />
            </Head>

            <MoralisProvider initializeOnMount={false}>
                <Header />
                <Component {...pageProps} />
                <Footer />

                <Toaster position="bottom-right" />
            </MoralisProvider>
        </div>
    )
}

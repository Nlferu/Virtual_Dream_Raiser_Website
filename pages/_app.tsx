import type { AppProps } from "next/app"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import { Inter } from "next/font/google"
import StarsCanvas from "@/components/starBackground"
import Header from "@/components/header"
import Head from "next/head"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden min-h-[100vh]`}>
            <Head>
                <title>Virtual Dream Raiser</title>
                <meta name="description" content="Virtual Dream Raiser" />
                <link rel="icon" href="/icon.png" />
            </Head>

            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <StarsCanvas />
                    <Header />
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

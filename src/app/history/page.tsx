import { getServerAuthSession } from "@/server/auth";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from 'next/navigation';
import { Header } from "../_components/header";
import { SearchHistory } from "../_components/search-history";


export default async function History() {
    noStore();
    const session = await getServerAuthSession();
    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/history')
    } else {
        return (
            <div>
                <Header session={session}/>
                <main
                    className="overflow-hidden flex min-h-screen flex-col items-center text-white">
                    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                        <h1 className="z-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                            History
                        </h1>
                    </div>
                    <div style={{
                        width: "100%",
                        maxWidth: "800px",
                        paddingBottom: "50px",
                        paddingLeft: "50px",
                        paddingRight: "50px"
                    }}>
                        <SearchHistory/>
                    </div>
                </main>
            </div>
        )
    }
}
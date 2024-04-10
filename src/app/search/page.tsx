import {getServerAuthSession} from "@/server/auth";
import {unstable_noStore as noStore} from "next/cache";
import {redirect} from 'next/navigation';
import {Header} from "../_components/header";
import {SearchBox} from "../_components/new-search";
import {useSearchParams} from "next/navigation";

export default async function Search() {
    noStore();
    const session = await getServerAuthSession();

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/search')
    }

    return (
        <div>
            <Header/>
            <main
                className="overflow-hidden flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="z-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                        <span className="text-[hsl(280,100%,70%)]">pSearch</span>
                    </h1>
                    <SearchBox/>
                </div>
            </main>
        </div>
    );
}
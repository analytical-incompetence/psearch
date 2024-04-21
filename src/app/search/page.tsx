import {getServerAuthSession} from "@/server/auth";
import {unstable_noStore as noStore} from "next/cache";
import {redirect} from 'next/navigation';
import {Header} from "../_components/header";
import {SearchBox} from "../_components/new-search";

export default async function Search() {
    noStore();
    const session = await getServerAuthSession();

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/search')
    }

    return (
        <div>
            <Header session={session} allow_login={true}/>
            <main
                className="overflow-hidden flex min-h-screen flex-col items-center justify-center  text-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16" style={{
                    width: "100%",
                    maxWidth: "800px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}>
                    <SearchBox/>
                </div>
            </main>
        </div>
    );
}
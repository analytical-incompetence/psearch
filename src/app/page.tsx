import {unstable_noStore as noStore} from "next/cache";
import Link from "next/link";

import {CreatePost} from "@/app/_components/create-post";
import {getServerAuthSession} from "@/server/auth";
import {api} from "@/trpc/server";

import {Header} from "@/app/_components/header";

export default async function Home() {
    noStore();
    const hello = await api.post.hello.query({text: "from AI"});
    const session = await getServerAuthSession();

    return (
        <div>
            <Header/>
            <main
                className="overflow-hidden flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="z-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                        <span className="text-[hsl(280,100%,70%)]">pSearch</span>
                    </h1>
                    <div className="z-20 flex flex-col items-center gap-2">
                        <p className="text-2xl text-white">
                            {hello ? hello.greeting : "Loading tRPC query..."}
                        </p>

                        <div className="z-20 flex flex-col items-center justify-center gap-4">
                            <p className="text-center text-2xl text-white">
                                {session && <span>Logged in as {session.user?.name}</span>}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

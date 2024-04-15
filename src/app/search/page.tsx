import { getServerAuthSession } from "@/server/auth";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from 'next/navigation';
import { Header } from "../_components/header";
import { SearchBox } from "../_components/new-search";

export default async function Search() {
    noStore();
    const session = await getServerAuthSession();

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/search')
    }

    return (
        <div>
            <Header session={session}/>
            <main
                className="overflow-hidden flex min-h-screen flex-col items-center justify-center  text-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16" style={{
                    width: "100%",
                    maxWidth: "800px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}>
                        {/* <Card isBlurred isHoverable={true} className="space-y-5 p-4"
                      radius="lg" shadow={"sm"} style={{
                    width: "100%"
                        }}>
                        <CardHeader className="pb-0 pt-2 px-4 flex flex-col justify-between items-center gap-3">
                            <h1 className="z-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                                <span className="text-[hsl(280,100%,70%)]">pSearch</span>
                            </h1>
                            
                        </CardHeader>
                        </Card> */}
                        <SearchBox/>
                </div>
            </main>
        </div>
    );
}
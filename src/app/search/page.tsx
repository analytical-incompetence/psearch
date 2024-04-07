import { getServerAuthSession } from "@/server/auth";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { redirect } from 'next/navigation';
import { Header } from "../_components/header";


export default async function Search() {
  noStore();
  const session = await getServerAuthSession();
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/search')
  }
  else{
    return (
      <div>
        <Header/>
        <main className="overflow-hidden flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="z-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="text-[hsl(280,100%,70%)]">Psearch Search Page</span>
            </h1>
            <div className="z-20 flex flex-col items-center gap-2">

              <div className="z-20 flex flex-col items-center justify-center gap-4">
                <p className="text-center text-2xl text-white">
                  {session && <span>Logged in as {session.user?.name}</span>}
                </p>
                <Link
                  href={session ? "/api/auth/signout?callbackUrl=/" : "/api/auth/signin?callbackUrl=/search"}
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  {session ? "Sign out" : "Sign in"}
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
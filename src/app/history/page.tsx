import { getServerAuthSession } from "@/server/auth";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from 'next/navigation';
import { Header } from "../_components/header";

export default async function History() {
    noStore();
    const session = await getServerAuthSession();
    if (!session) {
      redirect('/api/auth/signin?callbackUrl=/history')
    }
    else{
        return (
            <div>
                <Header/>
                <div>
                    History Page
                </div>
            </div>
        )
    }
}
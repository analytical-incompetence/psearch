"use client";


export default function Home() {

    return (
        <div>
            <main
                className={"overflow-hidden flex min-h-screen flex-col items-center justify-center text-white"}
            >
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="z-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                        <span className="text-[hsl(280,100%,70%)]">pSearch</span>
                    </h1>
                </div>
            </main>
        </div>
    );
}

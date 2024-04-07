"use client";

import {useRouter} from "next/navigation";
import {api} from "@/trpc/react";
import {useEffect, useState} from "react";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

export function SearchBox() {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [enabled, setEnabled] = useState(false);
    const searchResults = api.post.getSearchResults.useQuery({query}, {
        enabled, onSuccess: () => {
            setEnabled(false);
        }
    });

    // Reset `enabled` to false after a search is complete
    useEffect(() => {
        setEnabled(false);
    }, [searchResults]);

    const submitQuery = () => {
        setEnabled(true);
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submitQuery();
                }}
                className="flex flex-col gap-2"
            >
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Title"*/}
                {/*    value={prompt}*/}
                {/*    onChange={(e) => setPrompt(e.target.value)}*/}
                {/*    className="w-full rounded-full px-4 py-2 text-black"*/}
                {/*/>*/}

                <Input
                    id="search-query"
                    placeholder="Search Query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <Button type="submit">Search</Button>
            </form>

            <br></br>

            {searchResults.data && (
                <div className={"flex flex-col gap-4"}>
                    {
                        searchResults.data.web?.results?.map(
                            (result, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <a href={result.url}>{result.title}</a>
                                    <p>{result.description}</p>
                                </div>
                            )
                        )
                    }
                </div>
            )}
        </div>
    );
}
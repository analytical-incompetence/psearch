"use client"

import {api} from "@/trpc/react";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useEffect, useState} from "react";

export default function TestPage() {
    const [query, setQuery] = useState("");
    const [enabled, setEnabled] = useState(false);
    const searchResults = api.post.getSearchResults.useQuery({query}, {
        enabled, onSuccess: () => {
            setEnabled(false);
        }
    });

    useEffect(() => {
        setEnabled(false);
    }, [searchResults])

    const buttonPress = () => {
        setEnabled(true);
    };

    return (
        <div>
            <div className="z-20 flex flex-col items-center justify-center gap-4">
                <p className="text-center text-2xl text-white">
                    Test Page
                </p>

                <p className="text-center text-2xl text-white">
                    Search Query
                </p>
                <div className="flex flex-row items-center gap-4">
                    <Input
                        id="search-query"
                        placeholder="Search Query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Button onClick={buttonPress}>Search</Button>

                    {searchResults.data && (
                        <ul>
                            {searchResults.data.web?.results?.map(
                                (result, index) => (
                                    <li key={index}>
                                        <a href={result.url}>{result.title}</a>
                                        <p>{result.description}</p>
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                </div>
            </div>

            <div id={"search-results"} className="flex flex-col items-center gap-4"/>
        </div>
    )
}

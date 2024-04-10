"use client";

import {useRouter} from "next/navigation";
import {api} from "@/trpc/react";
import {useEffect, useState} from "react";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {type Result} from "@/utils/searchTypes";

import {Card, CardHeader, CardBody, Image, Skeleton} from "@nextui-org/react";

import {IsSecure} from "@/app/_components/secure";
import {undefined} from "zod";

function Result(result: Result) {
    return (
        <div className="flex flex-col gap-3" style={{
            width: "100%",
            maxWidth: "800px",
            margin: "auto"
        }}>
            <Card isBlurred className="space-y-5 p-4" radius="lg" shadow={"sm"}>
                <CardHeader className="pb-0 pt-2 px-4 flex flex-row justify-between items-center gap-3">
                    <div className="flex flex-row gap-3 items-center">
                        <Image
                            src={result.profile.img}
                            alt={result.profile.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                            style={{
                                maxWidth: "40px",
                            }}
                        />
                        <div className="flex-col gap-2 items-start">
                            <a href={result.url} target="_blank" rel="noopener noreferrer">
                                <p className="text-lg font-semibold">{result.title}</p>
                            </a>
                            <div className="flex flex-row gap-1 text-small text-default-500">
                                <div>{result.meta_url.hostname}</div>
                                <div>{result.meta_url.path.trim()}</div>
                            </div>
                        </div>
                    </div>

                    <IsSecure secure={result.meta_url.scheme === "https"} width={15}/>
                </CardHeader>

                <CardBody className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <div dangerouslySetInnerHTML={{__html: result.description}}/>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export function SearchBox() {
    const [query, setQuery] = useState("");
    const [enabled, setEnabled] = useState(false);
    const searchResults = api.post.getSearchResults.useQuery({query}, {enabled});

    const [savedResults, setSavedResults] = useState<Result[]>([]);

    const pushQuery = api.post.pushQuery.useMutation();

    useEffect(() => {
        setEnabled(false);

        setTimeout(() => {
            setSavedResults(searchResults.data?.web.results ?? savedResults);
        }, 1);
    }, [searchResults?.data?.web.results, savedResults]);

    const submitQuery = () => {
        setEnabled(true);

        // Push the query to the database
        pushQuery.mutate({query});
    };

    return (
        <div style={{
            maxWidth: "800px",
            margin: "auto",
            width: "100%",
        }}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submitQuery();
                }}
                className="flex flex-col gap-2"
            >
                <div className={"flex flex-row gap-2 flex-item"}>
                    <Input
                        id="search-query"
                        placeholder="Search Query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Button type="submit" className={"flex-item"}>Search</Button>
                </div>
            </form>

            <br></br>

            {savedResults && (
                <div className={"flex flex-col gap-4"}>
                    {
                        savedResults.map(
                            (result, index) => (
                                <Result key={index} {...result} />
                            )
                        )
                    }
                </div>
            )}
        </div>
    );
}
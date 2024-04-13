import { api } from "@/trpc/server";
import { type History } from "@/utils/searchTypes";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";


function Result({
                    data = {
                        query: "",
                        createdAt: new Date(),
                        userId: "",
                        id: ""
                    } as History
                }) {
    return (
        <div className="flex flex-col gap-3" style={{
            width: "100%",
            maxWidth: "800px",
        }}>
            <a href={`/search?query=${encodeURI(data.query)}`}>
                <Card isBlurred isHoverable={true} isPressable={true} className="space-y-5 p-4"
                      radius="lg" shadow={"sm"} style={{
                    width: "100%"
                }}>
                    <CardHeader className="pb-0 pt-2 px-4 flex flex-row justify-between items-center gap-3">
                        <div className="flex-col gap-2 items-start">
                            {/*<a href={`/search?query=${encodeURI(data.query)}`} target="_blank"*/}
                            {/*   rel="noopener noreferrer">*/}
                            <p className="text-lg font-semibold">{data.query}</p>
                            {/*</a>*/}
                            <div className="flex flex-row gap-1 text-small text-default-500">
                                <div>{data.createdAt.toLocaleDateString()}</div>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </a>
        </div>
    )
}

export async function SearchHistory() {
    const historyData = await api.post.getQueries.query();
    historyData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (historyData.length === 0) {
        return (
            <div className="flex flex-col gap-3" style={{
                width: "100%",
                maxWidth: "800px",
                margin: "auto"
            }}>
                <Card isBlurred className="space-y-5 p-4" radius="lg" shadow={"sm"}>
                    <CardBody className="flex flex-col gap-3 items-center">
                        <p className="text-lg font-semibold">No Previous Searches</p>
                        <Button
                            href="/search"
                            as={Link}
                            color="secondary"
                            >
                            Search
                        </Button>
                    </CardBody>
                </Card>
            </div>
        )
    } else {
        return (
            <div className={"flex flex-col gap-4"} style={{
                width: "100%",
                maxWidth: "800px",
                margin: "auto"
            }}>
                {
                    historyData.map(
                        (result) => (
                            <Result key={result.id} data={result}/>
                        )
                    )
                }
            </div>
        )
    }
}

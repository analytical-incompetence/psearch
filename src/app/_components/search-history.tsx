import {api} from "@/trpc/server";
import {Card, CardBody, CardHeader} from "@nextui-org/react";

function Result(data: object) {
    // console.log(data.query, data.date, "Rendering Card")
    return (
        <div className="flex flex-col gap-3" style={{
            width: "100%",
            maxWidth: "800px",
            margin: "auto"
        }}>
            <Card isBlurred className="space-y-5 p-4" radius="lg" shadow={"sm"}>
                <CardHeader className="pb-0 pt-2 px-4 flex flex-row justify-between items-center gap-3">
                    <div className="flex flex-row gap-3 items-center">
                        <div className="flex-col gap-2 items-start">
                            <a href={encodeURI(`/search?query=${data.query}`)} target="_blank"
                               rel="noopener noreferrer">
                                <p className="text-lg font-semibold">{data.query}</p>
                            </a>
                            <div className="flex flex-row gap-1 text-small text-default-500">
                                <div>{data.date.toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}


export async function SearchHistory() {

    const historyData = await api.post.getQueries.query();

    // console.log(historyData.data)
    // console.log(historyData)
    if (historyData.length === 0) {
        return (
            <div className="flex flex-col gap-3" style={{
                width: "100%",
                maxWidth: "800px",
                margin: "auto"
            }}>
                <Card isBlurred className="space-y-5 p-4" radius="lg" shadow={"sm"}>
                    <CardHeader className="pb-0 pt-2 px-4 flex flex-row justify-between items-center gap-3">
                        <div className="flex flex-row gap-3 items-center">
                            <div className="flex-col gap-2 items-start">
                                <p className="text-lg font-semibold">No Previous Searches</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <p>please make a search to view it in history</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    } else {
        console.log(historyData[0])
        return (
            <div>
                {historyData && (
                    <div className={"flex flex-col gap-4"}>
                        {
                            historyData.map(
                                (result) => (
                                    <Result key={result.id} query={result.query} date={result.createdAt}/>
                                )
                            )
                        }
                    </div>
                )}
            </div>
        )
    }
}

// const [previousSearches, setPreviousSearches] = useState<Result[]>([])

// useEffect(() => {
//     setTimeout(() => {
//         // if (historyData.data !== undefined) {
//         //     setPreviousSearches(historyData.data)
//         //     console.log(historyData.data)
//         // }
//         setPreviousSearches(historyData.data)
//         console.log(historyData.data)
//     }, 10);
// }, []);
// useEffect(() => {
//     const fetchData = async () => {
//         const result = await api.post.getQueries.useQuery();
//         setPreviousSearches(result.data);
//       };

//       fetchData();
// }, [])
// const test = async () => {
//     const historyData = await api.post.getQueries.useQuery();
//     setPreviousSearches(await historyData.data)
// }
// console.log(previousSearches)
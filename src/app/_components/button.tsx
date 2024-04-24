"use client";
import { Button } from "@nextui-org/react";
import { api } from "@/trpc/react"

export function DeleteButton({ id=0 }) {
    const deleteQueries = api.post.deleteQueries.useMutation()

    return (
        <Button color="danger" onPress={async () => {
            deleteQueries.mutate({id: id})
            window.location.reload()
        }}>
            Delete Search
        </Button>
    )
}


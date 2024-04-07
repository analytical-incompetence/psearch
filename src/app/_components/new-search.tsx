"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

export function SearchBox() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const newSearch = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setPrompt("");
    },
  });

  return (
    <div>
        <form
        onSubmit={(e) => {
            e.preventDefault();
            newSearch.mutate({ name });
        }}
        className="flex flex-col gap-2"
        >
        <input
            type="text"
            placeholder="Title"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
            disabled={newSearch.isLoading}
        >
            {newSearch.isLoading ? "Submitting..." : "Submit"}
        </button>
        </form>
        <div>This is currently setup to create a new post (ik silly)</div>
    </div>
  );
}
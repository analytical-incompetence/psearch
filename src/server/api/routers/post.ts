import {z} from "zod";

import {OpenAI} from "openai"

import {createTRPCRouter, protectedProcedure, publicProcedure,} from "@/server/api/trpc";

import {env} from "@/env";
import {type History, parseQueryResult, type ResponseObject} from "@/utils/searchTypes";
import {type PrismaPromise} from "@prisma/client";

export const postRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({text: z.string()}))
        .query(({input}) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    create: protectedProcedure
        .input(z.object({name: z.string().min(1)}))
        .mutation(async ({ctx, input}) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return ctx.db.post.create({
                data: {
                    name: input.name,
                    createdBy: {connect: {id: ctx.session.user.id}},
                },
            });
        }),

    getLatest: protectedProcedure.query(({ctx}) => {
        return ctx.db.post.findFirst({
            orderBy: {createdAt: "desc"},
            where: {createdBy: {id: ctx.session.user.id}},
        });
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),

    getSearchResults: protectedProcedure
        .input(z.object({
            query: z.string().min(1),
            // query: z.function().args().returns(z.string())
        }))
        .query(async ({input}) => {

            const openai = new OpenAI({
                apiKey: env.OPENAI_API_SECRET
            })

            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-4-turbo-preview",
                messages: [{
                    "role": "system", "content": `
                You are an assistant that generates opposite search queries. You will be provided a search query
                as raw text, and should output another, opposite search query. You may assume that the user is
                based in the United Kingdom for any location-based queries.

                Below are some examples:
                Input: "GitHub"
                Output: "GitLab"
                
                Input: "London"
                Output: "New York"
                
                Input: "How long was Queen Elizabeth II's reign?"
                Output: "How long was King Henry VIII's reign?"
                
                Input: "YouTube"
                Output: "Vimeo"
                
                Input: "Where is Mars?"
                Output: "Where is Pluto?"
                
                Input: "Local News"
                Output: "Latest news in India"
                
                Input: "Bob the Builder"
                Output: "Wreck it Ralph"

                IMPORTANT: Do not use these examples exactly. There should be some variation to your responses.
                
                Your output should be of the form:

                {
                    "oppositeQuery": "..."
                }
                `
                }, {"role": "user", "content": input.query}],
            });

            if (chatCompletion.choices[0]?.message.content) {
                const aiResponse = JSON.parse(chatCompletion.choices[0]?.message.content) as ResponseObject;
                const queryURI = encodeURI(aiResponse.oppositeQuery);
                const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${queryURI}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Accept-Encoding': 'gzip',
                        'X-Subscription-Token': env.BRAVE_SEARCH_API_SECRET,
                    }
                });

                return parseQueryResult(await response.text());
            }
        }),

    pushQuery: protectedProcedure
        .input(z.object({query: z.string().min(1)}))
        .mutation(async ({ctx, input}) => {
            return ctx.db.query.create({
                data: {
                    query: input.query,
                    userId: ctx.session.user.id,
                },
            });
        }),

    getQueries: protectedProcedure.query(async ({ctx}) => {
        return ctx.db.query.findMany({
            where: {userId: ctx.session.user.id},
        }) as unknown as PrismaPromise<History[]>;
    })
});

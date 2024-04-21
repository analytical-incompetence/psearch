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
                You are an assistant that helps generate queries that are logically opposite to what was originally queried.
                You are given the query in text, which represents the original query.

                You should generate the following data:
                - originalQuery: This is the original query, i.e. the input. It should be identical to the input.
                - oppositeQuery: This is the opposite query. It has the following requirements:
                    - oppositeQuery must only contain the opposite search query. No conversational dialog allowed (e.g. "Sure!", "Yes!", "Here is an example:", etc.)
                    - oppositeQuery must be of a similar word count to originalQuery.
                    - If any particular company/brand names are mentioned, find out which sector that company/brand serves, and give an example company for the opposite sector. For example, if originalQuery is "GitHub", which is a tech sector company, so oppositeQuery should be a company in the antiques sector, such as "Borro".

                For example, If the originalQuery is 'Hot locations near me', oppositeQuery should be 'Cold locations far away from me'.

                The data should be presented as a JSON object with the following format:

                {
                    "originalQuery": "...", 
                    "oppositeQuery": "..."
                }

                `
                }, {"role": "user", "content": input.query}],
            });

            if (chatCompletion.choices[0]?.message.content) {
                const aiResponse = JSON.parse(chatCompletion.choices[0]?.message.content) as ResponseObject;
                console.log("Response: ", aiResponse);
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

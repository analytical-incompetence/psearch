import {z} from "zod";

import {OpenAI} from "openai"

import {createTRPCRouter, protectedProcedure, publicProcedure,} from "@/server/api/trpc";

import {env} from "@/env";
import {type History, parseQueryResult} from "@/utils/searchTypes";
import {PrismaPromise} from "@prisma/client";

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
            console.log("SEARCH: " + input.query)

            const openai = new OpenAI({
                apiKey: env.OPENAI_API_SECRET
            })

            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-4-turbo-preview",
                messages: [{"role": "system", "content": `
                You will be given text. Find the opposite text to the prompt.

                For example, If the input is 'Hot locations near me', response should be 'Cold locations far away from me'
                `},{ "role": "user", "content": input.query}],
            });
            console.log(chatCompletion.choices[0]?.message.content);

            const queryURI = encodeURI(chatCompletion.choices[0]?.message.content);
            const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${queryURI}`, {
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip',
                    'X-Subscription-Token': env.BRAVE_SEARCH_API_SECRET,
                }
            });

            return parseQueryResult(await response.text());
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

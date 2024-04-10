import {z} from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

import {env} from "@/env";
import parseQueryResult from "@/utils/searchTypes";

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
            const queryURI = encodeURI(input.query);
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
        .input(z.object({name: z.string().min(1)}))
        .mutation(async ({ctx, input}) => {
            return ctx.db.post.create({
                data: {
                    name: input.name,
                    createdBy: {connect: {id: ctx.session.user.id}},
                },
            });
        }),
});

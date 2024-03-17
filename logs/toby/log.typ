#import "@preview/charged-ieee:0.1.0": ieee

#show: ieee.with(
  title: [Programing Black Learning Log],
  authors: (
    (
      name: "Toby Davis",
      location: [Durham University],
      email: "toby.davis@durham.ac.uk"
    ),
  ),
  // bibliography: bibliography("refs.bib"),
)

PSearch is a fully secure full stack web application with a modern, responsive UI. It is written in typescript using #link("https://nextjs.org/", [NextJS]), #link("https://nextui.org/", [NextUI]), #link("https://ui.aceternity.com/", [Aceternity.ui]), #link("https://next-auth.js.org/", [NextAuth]), #link("https://www.prisma.io/", [Prisma]) and #link("https://www.postgresql.org/", [PostgreSQL]). We're also using #link("https://tailwindcss.com/", [TailwindCSS]) to get fine-grained control over our components. 

= 1st - 10th March 2024

I spent some time playing around with NextAuth, setting up a single-sign-on application in NextJS. I was able to get SSO working with multiple account types, but it only operated server-side.

To get a full-stack example working, I did some research and found #link("https://create.t3.gg/", [T3]), which creates a full stack project template using the technologies listed above (if you configure it to use those).

With a full-stack template working, I was able to get Google and Discord SSO working. For our project, we wanted to use Strava to login. Unfortunately, Strava's authentication provider gives an `athlete` field in the `Account` table. I had to learn about Prisma and its schema language to allow the database to optionally store an `athlete` (since the other providers don't give this).

To make the UI appealing, I figured out how to integrate NextUI and Aceternity.ui into the project. This involved setting up some custom providers, refactoring the directory structure and playing with the TailwindCSS configuration.


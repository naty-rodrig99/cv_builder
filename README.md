> This Project is part of the DH2643 Advanced Interaction Programming course at KTH university.

# 📑 CV Builder

An application that helps you build CVs _fast!_


## How do I run this?

1. Clone the repo.
2. Open a terminal and `cd` into the freshly cloned repo.
3. Run `npm install` (or `npm i` if you're cool) to install all dependencies.
4. Run `npm run db:push` to set up the database.
5. Run `npm run dev` to start the development server.

## Help, `npm: command not found`!

If you haven't installed Node yet please do so using a "Node Version Manager". It will help you a lot.
For Linux, macOS and WSL there is [nvm](https://github.com/nvm-sh/nvm). If you don't want to use WSL in Windows you can use any of the [alternatives](https://github.com/nvm-sh/nvm?tab=readme-ov-file#important-notes) like [nvm-windows](https://github.com/coreybutler/nvm-windows).


## Resources

This project has been bootstrapped using "T3 Stack" although I only kept the Drizzle and Tailwind configs. From their documentation: 

> This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
> 
> We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.
>
> If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.
> - [Next.js](https://nextjs.org)
> - [Drizzle](https://orm.drizzle.team)
> - [Tailwind CSS](https://tailwindcss.com)

Additionally, this project also uses [Lucia](https://lucia-auth.com/guides/email-and-password/basics) for authentication and session management.

More from their docs for later:

> ### How do I deploy this?
>
> Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

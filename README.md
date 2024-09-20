> This Project is part of the DH2643 Advanced Interaction Programming course at KTH university.

# 📑 CV Builder

An application that helps you build CVs _fast!_


## How do I run this?

1. Clone the repo.
2. Open a terminal and `cd` into the freshly cloned repo.
3. Copy the `.env.example` file into a `.env` file in the project root (e.g.: run `cp .env.example .env`).
4. Run `npm install` (or `npm i` if you're cool) to install all dependencies.
5. Run `npm run db:push` to set up the database.
6. Run `npm run dev` to start the development server.

## Help, `npm: command not found`!

If you haven't installed Node yet please do so using a "Node Version Manager". It will help you a lot.
For Linux, macOS and WSL there is [nvm](https://github.com/nvm-sh/nvm). If you don't want to use WSL in Windows you can use any of the [alternatives](https://github.com/nvm-sh/nvm?tab=readme-ov-file#important-notes) like [nvm-windows](https://github.com/coreybutler/nvm-windows).


## Development

### Tools
Please make sure you have installed **and enabled** the code formatter Prettier. Your IDE will likely already have it installed by default or will provide some plugin for it. I also recommend turning on "Format on save".
Additionally, you should enable ESLint, which will try to find potential bugs in your code. Remember though that it is only a tool and if you find it to be wrong or annoying, feel free to disable specific rules in the ESLint config.

### Git
We use Git for version control and there are no restrictions on who can push what to where. If in doubt you can always create a new branch, push it, open a PR and then ask someone to look over your code again. We'll try to keep the `main` branch stable-ish but there are no guarantees for the `dev` branch.

### Database
If you make changes to the database schema, please refer to the Drizzle docs on how to create migrations, etc. If you have the feeling that your database is broken you can always just delete the `db.sqlite` and run `npm run db:push` again.


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

Additionally, this project also uses
- [Lucia](https://lucia-auth.com/guides/email-and-password/basics) for authentication and session management.
- [SQLite](https://www.sqlite.org/datatype3.html) as the database.

Since Nextjs' app directory relies heavily on react server components I also highly recommend giving the [respective React docs](https://react.dev/reference/rsc/server-components) a read, if you haven't already.


## Components

I've gone ahead and already set up [shad/cn components](https://ui.shadcn.com/). They are probably the biggest reason to at the very least support Tailwind right now haha. To add new components please follow the documentation on the specific components page (e.g. [Dialog](https://ui.shadcn.com/docs/components/dialog)).

---

### More from the T3 docs for later:

> ### How do I deploy this?
>
> Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

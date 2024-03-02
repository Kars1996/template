## Now stable! 💖

Kars Template v1.2 (Shoutout Nitlix for the help/inspiration 💛)

This is a [Next.js](https://nextjs.org/) template created for super-powering Kars Apps quickly. It includes:

-   Inter - A google font.
-   Client theme provider, first rendered by the server (kars-themes)
-   The theme provider includes Locomotive Scroll, AOS built specifically for Loco. (locomotive-aos)
-   metaGen() - A function that generates meta tags for the page. (kars-metagen)
-   Quickstart global.scss and animations.scss
-   SASS already installed.
-   Tailwind ready to fly.
-   4 Fonts to start with: Neue Montreal, Neutral Grotesk, Inter and Strretch Sans.
-   Prisma ready to launch! (Just create the .env vars)
-   Prebuilt I18N support (With @vercel/edge, via headers and context (kars-i18n))

## Quickstarting using create-kapp

```bash
npm i create-kapp@latest -g
```

then run the create-kapp command to initialise this template.

```bash
create-kapp
```

You'll be promoted with this:

```bash
? Setup the project in...? »
# Use "." or "./" for the local folder.
# Use a foldername to setup the project in that folder. (It will be created if it doesn't exist)
```

## Cloning

To initialise this template, choose one of the following options:

### Option 1: Folder already exists

```bash
gh repo clone kars1996/Template .
```

### Option 2: Folder does not exist

```bash
gh repo clone kars1996/Template <folder-name>
# the folder name is optional
```

### Option 3: Forking

```bash
gh repo fork kars1996/Template
```

## Getting Started

Firstly install the dependencies:

```bash
npm i
# or
yarn
# or
pnpm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

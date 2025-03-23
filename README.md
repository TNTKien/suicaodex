> This repo may be deprecated and no longer maintained in the future, pls see [better-suicaodex](https://github.com/TNTKien/better-suicaodex) instead.

# A Website using [MangaDex API](https://api.mangadex.org/docs/).

Please note that all data belongs to MangaDex, this project is for entertainment purposes only.

I know my code sucks, but it works btw.

Feel free to blame me as much as you want, you can find me on [Facebook](https://www.facebook.com/suicaodex), [create an issue](https://github.com/TNTKien/suicaodex/issues/new) or [start a discussion](https://github.com/TNTKien/suicaodex/discussions)
## How to Use

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `bun`:

```bash
bun install
```

### Environment Variables

This project uses [AuthJS](https://authjs.dev/) with Discord & Google Provider, Prisma and MySQL for authentication and some features, please follow the instructions on the their websites to setup environment variables.

(It still can run without envs i said above, remove anything related and here we go)

### CORS

MangaDex API requires CORS, you can built your own proxy using [suicaodex-api](https://github.com/TNTKien/suicaodex-api). Please do not use my proxy, it only works on SuicaoDex.

SuicaoDex also has a built-in proxy, but this could cause the website to overload (due to my pasta code). For more information, see `/lib/axios.ts` and `/config/site.ts`. You might need to adjust some image URLs if you decide to use this.

### Run the development server

```bash
bun dev
```

### Deployments

~~This project is setup to deploy on [Cloudflare Pages](https://pages.cloudflare.com/). Remember to change Compatibility flags to `nodejs_compat` in both development and production environments in order to make it work, you can find this in Cloudflare page's Settings section.~~ Edge runtime liemhaihondaitao.

Since this commit, SuicaoDex will not work on Cloudflare Pages. I'm not sure if it can be deployed on Vercel or other platforms, try it yourself `¯\_(ツ)_/¯`. Btw, it may work fine locally.

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).

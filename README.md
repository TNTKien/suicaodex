# A Website using [MangaDex API](https://api.mangadex.org/docs/).

Please note that all data belongs to MangaDex, this project is for entertainment purposes only.

I know my code sucks, but it works btw.

Feel free to blame me as much as you want, you can find me on [Facebook](https://www.facebook.com/suicaodex) or create an issue [here](https://github.com/TNTKien/suicaodex/issues/new).

## How to Use

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `bun`:

```bash
bun install
```

### AuthJS

This project uses [AuthJS](https://authjs.dev/) with Discord Provider for authentication, please follow the instructions on the website to setup environment variables.

### Run the development server

```bash
bun dev
```

### Deployments

This project is setup to deploy on [Cloudflare Pages](https://pages.cloudflare.com/). Remember to change Compatibility flags to `nodejs_compat` in both development and production environments in order to make it work, you can find this in Cloudflare page's Settings section.

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).

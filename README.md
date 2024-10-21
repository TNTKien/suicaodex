# A Manga Website using [MangaDex API](https://api.mangadex.org/docs/).
Please note that all data belongs to MangaDex, this project is for entertainment purposes only.

## How to Use

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `bun`:

```bash
bun install
```

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

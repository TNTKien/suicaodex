export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Trang chủ - SuicaoDex",
  description: "SuicaoDex - Trang web truyện tranh đầu hàng VN",
  keywords:
    "mato seihei no slave, suicaodex, manga, truyện tranh, đọc truyện, suicao, sủi cảo, đọc truyện online, ma đô",
  links: {
    github: "https://github.com/TNTKien/mato-seihei-reader",
    discord: "https://discord.gg/dongmoe",
    facebook: "https://www.facebook.com/suicaodex",
  },
  mato: {
    id: "e1e38166-20e4-4468-9370-187f985c550e",
  },
  mangadexAPI: {
    webURL: "https://mangadex.org",
    baseURL: "https://api.mangadex.org",
    coverURL: "https://uploads.mangadex.org/covers",
    imgURL: "https://uploads.mangadex.org",
    proxyUrl: "https://cors.suicaodex.com/?url=",
    ogURL: "https://og.mangadex.org/og-image/manga",
  },
  domains: {
    suicaodex: "https://suicaodex.com",
  },
};

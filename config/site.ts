export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Mato Seihei no Slave | Sủi Cảo",
  description: "Trang đọc truyện Mato Seihei no Slave",
  links: {
    github: "https://github.com/TNTKien/mato-seihei-reader",
    discord: "https://discord.gg/dongmoe",
    facebook: "https://www.facebook.com/m1zuchi",
  },
  mato: {
    id: "e1e38166-20e4-4468-9370-187f985c550e",
  },
  mangadexAPI: {
    baseURL: "https://api.mangadex.org",
    coverURL: "https://uploads.mangadex.org/covers",
    proxyUrl: "https://cors.iamneyk.workers.dev/?url=",
  },
};

import logger from "./logger.util";

var shortUrl = require("node-url-shortener");

export const getShortenedUrl = async (url: string) => {
  return new Promise((resolve, reject) => {
    shortUrl.short(url, (err: string, shortenedUrl: string) => {
      if (err) logger.error("shortener failed-", String(err));
      resolve(shortenedUrl);
      return shortenedUrl || "";
    });
  });
};

export const getShortId = () => {
  const random_string =
    Math.random().toString(32).substring(2, 5) +
    Math.random().toString(32).substring(2, 5);
  return random_string;
};

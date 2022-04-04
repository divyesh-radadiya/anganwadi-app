import * as Localization from "expo-localization";
import { get, set } from "./IonicStorage";

const STORE_LANGUAGE_KEY = "settings.lang";

export const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      //get stored language from Async storage
      await get(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language);
        } else {
          //if language was not stored yet, use device's locale
          return callback(Localization.locale);
        }
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await set(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};

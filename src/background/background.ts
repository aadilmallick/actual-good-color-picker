import { Runtime } from "../chrome-api/runtime";
import { appStorage } from "./controllers/storage";

Runtime.onInstall({
  onAll: async () => {
    console.log("Extension loaded");
    await appStorage.setup();
    console.log(await appStorage.getAll());
  },
});
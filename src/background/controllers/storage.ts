import { LocalStorage, SyncStorage } from "../../chrome-api/storage";

export const appStorage = new LocalStorage({
  savedColors: [] as string[],
});
export const appSettingsStorage = new SyncStorage({});

// define static methods here
export class StorageHandler {
  static async saveColorToStorage(color: string) {
    const savedColors = await appStorage.get("savedColors");
    if (savedColors.some((c) => c === color)) {
      return;
    }
    await appStorage.set("savedColors", [...savedColors, color]);
  }

  static async deleteColor(color: string) {
    const savedColors = await appStorage.get("savedColors");
    const newColors = savedColors.filter((c) => c !== color);
    await appStorage.set("savedColors", newColors);
  }
}

export default class EyedropperManager {
  private abortController = new AbortController();
  private cb!: (event: KeyboardEvent) => void;

  async getColor(): Promise<string | null> {
    this.cb = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        this.abortController.abort();
      }
    };
    if (window.EyeDropper) {
      const eyeDropper = new window.EyeDropper();
      window.addEventListener("keydown", this.cb);
      try {
        const result = await eyeDropper.open({
          signal: this.abortController.signal,
        });
        window.removeEventListener("keydown", this.cb);
        return result.sRGBHex;
      } catch (e) {
        window.removeEventListener("keydown", this.cb);
        if (e instanceof DOMException) {
          console.log(e);
          console.warn("eyedropper error", e.message, e.code);
        }
        return null;
      }
    } else {
      return null;
    }
  }

  static hasAPI() {
    return Boolean(window.EyeDropper);
  }
}

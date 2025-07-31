export class StyleChanger {
  static currentDevice;

  static loadStyles(href) {
    let link = document.getElementById("dynamic-styles");
    if (!link) {
      link = document.createElement("link");
      link.id = "dynamic-styles";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = href;
  }

  static getCurrentDevice() {
    const width = window.innerWidth;

    if (width >= 1024) return "desktop";
    if (width >= 768) return "tablet";
    return "mobile";
  }

  static async updateView() {
    const device = this.getCurrentDevice();
    if (device === this.currentDevice) return;

    try {
      const device = this.getCurrentDevice();
      if (device === this.currentDevice) return;

      const isDev = location.hostname === "localhost";
      const basePath = isDev ? "/src/styles/" : "/styles/";
      const ext = isDev ? ".scss" : ".css";

      this.loadStyles(basePath + device + ext);
      this.currentDevice = device;
    } catch (err) {
      console.error("Failed to load styles:", err);
    }
  }
}

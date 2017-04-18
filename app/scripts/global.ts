import { Messages } from "./messages";
import { Base } from "./base";

/**
 * Global script responsable with handling settings etc.
 */
export class Global extends Base {
  private cachedAdditionalDomains = [];

  constructor() {
    super(safari.application, safari.application.activeBrowserWindow.activeTab.page);

    super.addEventListener("command", () => super.dispatchMessage(Messages.ENTER_PIP_MODE), false);
  }

  public retrieveSettings(): void {
    if (!this.cachedAdditionalDomains) {
      const additionalDomains = safari.extension.settings.getItem("plexDomains") || "";

      this.cachedAdditionalDomains = additionalDomains
        .replace(/(\s)/g, "") /** Remmove spaces */
        .replace(/^\|+/, "") /** Trim left pipe */
        .replace(/\|+$/, "") /** Trim right pipe */
        .split("|") /** Split the domains */
        .filter((additionalDomain) => {
          const test1 = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(additionalDomain);
          const test2 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(additionalDomain);

          return test1 || test2;
        })
        .join("|");
    }

    super.dispatchMessage(Messages.RETRIEVE_SETTINGS_RESPONSE, this.cachedAdditionalDomains);
  }
}

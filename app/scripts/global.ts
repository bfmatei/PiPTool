import { Messages } from "./messages";
import { Base } from "./base";

/**
 * Global script responsable with handling settings etc.
 */
export class Global extends Base {
  constructor() {
    super(safari.application, safari.application.activeBrowserWindow.activeTab.page);

    super.addEventListener("command", () => super.dispatchMessage(Messages.ENTER_PIP_MODE), false);
  }

  private parseDomains(domains: string): string {
    if (null !== domains) {
      domains = domains
        .replace(/(\s)/g, "") /** Remmove spaces */
        .replace(/^\|+/, "") /** Trim left pipe */
        .replace(/\|+$/, ""); /** Trim right pipe */
    }

    return domains;
  }

  public retrieveSettings(): void {
    const enableContextMenu = safari.extension.settings.getItem("enableContextMenu");
    const plex = safari.extension.settings.getItem("plexDomains") || null;
    const emby = safari.extension.settings.getItem("embyDomains") || null;

    if (enableContextMenu) {
      safari.application.addEventListener("contextmenu", (event: SafariExtensionContextMenuEvent) => {
        this.contextMenuHandler(event);
      }, false);
    }

    super.dispatchMessage(Messages.RETRIEVE_SETTINGS_RESPONSE, JSON.stringify({
      enableContextMenu,
      domains: {
        plex: this.parseDomains(plex),
        emby: this.parseDomains(emby)
      }
    }));
  }

  /** Handler for right click event */
  private contextMenuHandler(event: SafariExtensionContextMenuEvent): void {
    event.contextMenu.appendContextMenuItem("enterPipMode", "Enter PiP Mode", "toggleTargetMode");
  }
}

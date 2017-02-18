export default class PipToolGlobal {
  constructor() {
    this.cachedAdditionalDomains = null;
    this.parseDomainRegex1 = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
    this.parseDomainRegex2 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

    /** Register the menu button command */
    safari.application.addEventListener('command', PipToolGlobal.toggleTargetMode.bind(this), false);

    safari.application.addEventListener('message', PipToolGlobal.handleSafariEventListener.bind(this), false);
  }

  /**
   * Handler for the menu button
   */
  static toggleTargetMode() {
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('enterPipMode');
  }

  /**
   * Parse Safari events and call internal methods
   * @param {Safari~Event} event - Event to parse
   */
  handleSafariEventListener(event) {
    if ('function' === typeof this[event.name]) {
      this[event.name].bind(this)(event.message);
    }
  }

  /**
   * Retrieve settings from Safari
   */
  static retrieveSettings() {
    if (!this.cachedAdditionalDomains) {
      let additionalDomains = safari.extension.settings.getItem('plexDomains') || '';

      additionalDomains = additionalDomains
        .replace(/(\s)/g, '') /** Remmove spaces */
        .replace(/^\|+/, '') /** Trim left pipe */
        .replace(/\|+$/, '') /** Trim right pipe */
        .split('|') /** Split the domains */
        .filter((additionalDomain) => {
          const test1 = this.parseDomainRegex1.test(additionalDomain);
          const test2 = this.parseDomainRegex2.test(additionalDomain);

          return test1 || test2;
        })
        .join('|');

      this.cachedAdditionalDomains = additionalDomains;
    }

    /** Send back the additional domains */
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('retrieveSettingsResponse', this.cachedAdditionalDomains);
  }
}

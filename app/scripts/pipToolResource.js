export default class PipToolResource {
  constructor(config) {
    this.config = config;
  }

  get name() {
    return this.config.name;
  }

  addDomains(additionalDomains) {
    if (additionalDomains) {
      this.config.domains += additionalDomains;
    }
  }
}

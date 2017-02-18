import PipToolResource from './pipToolResource.js';

export default class PipToolResources {
  constructor() {
    this.resources = [];
  }

  add(resourceConfig, additionalDomains) {
    const resource = new PipToolResource(resourceConfig);

    resource.addDomains(additionalDomains);

    this.resources.push(resource);
  }
}

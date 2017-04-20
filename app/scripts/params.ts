import { IParams } from "./params.interface";
import { IResource } from "./resource.interface";
import { Plex } from "./resources/plex";
import { YouTube } from "./resources/youtube";
import { Twitch } from "./resources/twitch";
import { Netflix } from "./resources/netflix";
import { Emby } from "./resources/emby";

export class Params {
  private config: IParams = {
    baseURI: safari.extension.baseURI,
    buttonTitle: "",
    buttonClass: "",
    resources: []
  };

  public get baseURI(): string {
    return this.config.baseURI;
  }

  public get buttonTitle(): string {
    return this.config.buttonTitle;
  }

  public get buttonClass(): string {
    return this.config.buttonClass;
  }

  public get resources(): IResource[] {
    return this.config.resources.slice();
  }

  public hasResource(name: string): boolean {
    return null !== this.getResourceByName(name);
  }

  public getResourceByName(name: string): IResource {
    return this.config.resources.filter((resource) => resource.resourceName === name)[0] || null;
  }

  public getResourceByHostname(hostname: string): IResource {
    return this.config.resources.filter((resource) => (new RegExp(resource.domains)).test(hostname))[0] || null;
  }

  public addDomainsToResource(name: string, domains: string): void {
    const resource = this.getResourceByName(name);

    if (resource && domains) {
      resource.domains += `|${domains}`;
    }
  }

  constructor(defaultConfig: IParams = null) {
    this.loadConfig(defaultConfig);

    this.config.buttonTitle = "PiPTool";
    this.config.buttonClass = "pip-button";
    this.config.resources = [
      Plex,
      Emby,
      YouTube,
      Netflix,
      Twitch
    ];
  }

  public loadConfig(config: IParams) {
    if (config) {
      this.config = config;
    }
  }
}

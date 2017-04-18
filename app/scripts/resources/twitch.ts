import { InsertTypes } from "../insertTypes.enum";

export const Twitch = {
  resourceName: "twitch",
  domains: "twitch.tv|www.twitch.tv",
  elementType: "button",
  videoSelector: "video",
  buttonClassList: "twitch-pip",
  videoParentSelector: ".player",
  controlsWrapperSelector: ".player-buttons-right",
  insertType: InsertTypes.BEFORE,
  insertTarget: ".player-button--fullscreen"
}

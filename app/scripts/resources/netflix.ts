import { InsertTypes } from "../insertTypes.enum";

export const Netflix = {
  resourceName: "netflix",
  domains: "netflix.com|www.netflix.com",
  elementType: "div",
  videoSelector: "video",
  buttonClassList: "netflix-pip",
  videoParentSelector: "#netflix-player",
  controlsWrapperSelector: ".player-status",
  insertType: InsertTypes.APPEND
}

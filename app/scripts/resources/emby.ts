import { InsertTypes } from "../insertTypes.enum";

export const Emby = {
  resourceName: "emby",
  domains: "google.ro",
  elementType: "button",
  videoSelector: "video.htmlvideoplayer",
  buttonClassList: "emby-pip",
  videoParentSelector: ".libraryDocument",
  controlsWrapperSelector: "#videoOsdPage .osdControls .buttons",
  insertType: InsertTypes.BEFORE,
  insertTarget: ".btnFullscreen"
}

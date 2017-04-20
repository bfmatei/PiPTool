import { InsertTypes } from "../insertTypes.enum";

export const Plex = {
  resourceName: "plex",
  domains: "plex.tv|www.plex.tv|app.plex.tv",
  elementType: "button",
  videoSelector: "video.html-video",
  buttonClassList: "btn-link",
  videoParentSelector: ".video-container",
  controlsWrapperSelector: ".video-controls-overlay-bottom .video-controls-right",
  insertType: InsertTypes.APPEND
}

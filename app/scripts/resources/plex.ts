import { InsertTypes } from "../insertTypes.enum";

export const Plex = {
  resourceName: "plex",
  domains: "plex.tv|www.plex.tv|app_old.plex.tv",
  elementType: "button",
  videoSelector: "video.html-video",
  buttonClassList: "btn-link pip-button",
  videoParentSelector: ".video-container",
  controlsWrapperSelector: ".video-controls-overlay-bottom .video-controls-right",
  insertType: InsertTypes.APPEND
}

import { InsertTypes } from "../insertTypes.enum";

export const YouTube = {
  resourceName: "youtube",
  domains: "youtube.com|www.youtube.com|youtu.be|www.youtu.be",
  elementType: "button",
  videoSelector: "video.html5-main-video",
  buttonClassList: "ytp-button pip-button",
  videoParentSelector: ".html5-video-player",
  controlsWrapperSelector: ".ytp-right-controls",
  insertType: InsertTypes.BEFORE,
  insertTarget: ".ytp-fullscreen-button"
}

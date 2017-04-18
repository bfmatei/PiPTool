export interface IHTMLVideoElement extends HTMLVideoElement {
  webkitPresentationMode: string;
  webkitSetPresentationMode(presentationMode: string);
}

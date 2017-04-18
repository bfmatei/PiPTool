import { Entry } from "./scripts/entry";

if (0 !== window.location.hostname.length) {
  new Entry(window, document); // tslint:disable-line
}

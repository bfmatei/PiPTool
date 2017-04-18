import { Base } from "./base";
import { Messages } from "./messages";
import { Params } from "./params";
import { IResource } from "./resource.interface";
import { IHTMLVideoElement } from "./htmlVideoElement.interface";
import { InsertTypes } from "./insertTypes.enum";

/**
 * Content script responsable with button insert etc.
 */
export class Entry extends Base {
  /** Params */
  private params = new Params();

  /** Current loaded resource */
  private currentResource: IResource = null;

  /** Observer for the DOM mutations */
  private observer: MutationObserver = null;

  /** Flag for target mode */
  private targetModeActive = false;

  /** Last targeted element in target mode */
  private lastTargetedElement = null;

  constructor(private window: Window, private document: Document) {
    super(safari.self, (safari.self as any).tab);

    /** Call for settings */
    super.dispatchMessage(Messages.RETRIEVE_SETTINGS);
  }

  public retrieveSettingsResponse(safariSettings: any): void {
    /** Add the extra Plex domains */
    this.params.addDomainsToResource("plex", safariSettings);

    /** Search to see if we have any resource available for current hostname */
    this.currentResource = this.params.getResourceByHostname(this.window.location.hostname);

    if (null !== this.currentResource) {
      this.findVideos();
      this.createObserver();
    }
  }

  /** Search for video */
  private findVideos(): void {
    const selector = `${this.currentResource.videoParentSelector}:not([data-pip-added="true"])`;
    const videoWrappers = this.document.querySelectorAll(selector);

    for (let index = 0; index < videoWrappers.length; index++) {
      this.insertPipButton(videoWrappers.item(index));
    }
  }

  /** Initialize the observer to get DOM mutations */
  private createObserver(): void {
    this.observer = new MutationObserver(() => this.findVideos());

    if (this.document.body) {
      this.observer.observe(this.document.body, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
      });
    }
  }

  /** Create the inner image present inside the PiP button */
  private createImage(): HTMLImageElement {
    const pipImage = this.document.createElement("img");

    pipImage.src = `${this.params.baseURI}images/${this.currentResource.resourceName}-icon.svg`;
    pipImage.setAttribute("height", "100%");

    return pipImage;
  }

  /** Create the PiP button */
  private createButton(video: IHTMLVideoElement): Element {
    const pipImage = this.createImage();
    const pipButton = this.document.createElement(this.currentResource.elementType);

    pipButton.classList.add("pip-button");

    this.currentResource.buttonClassList.split(" ")
      .forEach((buttonClass) => pipButton.classList.add(buttonClass));

    pipButton.title = this.params.buttonTitle;

    pipButton.appendChild(pipImage);

    pipButton.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();

      this.togglePipMode(video);

      if (this.targetModeActive) {
        this.toggleTargetMode();
      }
    });

    return pipButton;
  }

  /** Insert the PiP button in page */
  private insertPipButton(videoWrapper: Element): void {
    const video = <IHTMLVideoElement> videoWrapper.querySelector(this.currentResource.videoSelector);
    const button = this.createButton(video);
    const controlsWrapper = videoWrapper.querySelector(this.currentResource.controlsWrapperSelector);

    if (controlsWrapper && 0 === controlsWrapper.querySelectorAll(this.params.buttonClass).length) {
      switch (this.currentResource.insertType) {
        case InsertTypes.APPEND:
          controlsWrapper.appendChild(button);
          break;

        case InsertTypes.BEFORE:
          controlsWrapper.insertBefore(button, controlsWrapper.querySelector(this.currentResource.insertTarget));
          break;

        case InsertTypes.PREPEND:
          controlsWrapper.insertBefore(button, controlsWrapper.firstChild);
          break;

        default:
          console.log("Insert type is not supported");
      }

      if (0 < videoWrapper.querySelectorAll(".pip-button").length) {
        console.dir(videoWrapper);
        videoWrapper.setAttribute("data-pip-added", "true");
      }
    }
  }

  private togglePipMode(video: IHTMLVideoElement): void {
    if ("inline" === video.webkitPresentationMode) {
      video.webkitSetPresentationMode("picture-in-picture");
    } else {
      video.webkitSetPresentationMode("inline");
    }
  }

  /** Toggle the target mode */
  private toggleTargetMode(): void {
    if (!this.targetModeActive) {
      this.document.addEventListener("click", this.bindedTargetModeClickHandler);
      this.document.addEventListener("mousemove", this.bindedTargetModeMouseMoveEvent);
      this.document.addEventListener("keydown", this.bindedTargetModeKeydownEvent);
    } else {
      this.document.removeEventListener("click", this.bindedTargetModeClickHandler);
      this.document.removeEventListener("mousemove", this.bindedTargetModeMouseMoveEvent);
      this.document.removeEventListener("keydown", this.bindedTargetModeKeydownEvent);

      const elements = this.document.querySelectorAll(".pip-hover-mode, .deactivate-pointer-events");

      for (let index = 0; index < elements.length; index++) {
        elements.item(index).classList.remove("pip-hover-mode");
        elements.item(index).classList.remove("deactivate-pointer-events");
      }
    }

    this.targetModeActive = !this.targetModeActive;
  }

  /** Wrapper to change the context of targetModeClickHandler */
  private bindedTargetModeClickHandler = (event: MouseEvent) => {
    this.targetModeClickHandler(event);
  }

  /** Handler for mouse click event when target mode is active */
  private targetModeClickHandler(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target as Element;

    if ("video" === element.tagName.toLowerCase()) {
      const video = element as IHTMLVideoElement;

      if ("inline" === video.webkitPresentationMode) {
        video.webkitSetPresentationMode("picture-in-picture");
      } else {
        video.webkitSetPresentationMode("inline");
      }

      this.toggleTargetMode();
    } else {
      element.classList.add("deactivate-pointer-events");
    }
  }

  /** Wrapper to change the context of targetModeMouseMoveEvent */
  private bindedTargetModeMouseMoveEvent = (event: MouseEvent) => {
    this.targetModeMouseMoveEvent(event);
  }

  /** Handler for mouse move event when target mode is active */
  private targetModeMouseMoveEvent(event: MouseEvent): void {
    if (this.lastTargetedElement !== event.target) {
      if (this.lastTargetedElement) {
        this.lastTargetedElement.classList.remove("pip-hover-mode");
      }

      const element = event.target as Element;

      if (!element.classList.contains("pip-hover-mode")) {
        element.classList.add("pip-hover-mode");
      }

      this.lastTargetedElement = event.target;
    }
  }

  /** Wrapper to change the context of targetModeKeydownEvent */
  private bindedTargetModeKeydownEvent = (event: KeyboardEvent) => {
    this.targetModeKeydownEvent(event);
  }

  /** Handler for keydown event when target mode is active */
  private targetModeKeydownEvent(event: KeyboardEvent): void {
    if (27 === event.keyCode) {
      this.toggleTargetMode();
    }
  };

  public enterPipMode(): void {
    this.toggleTargetMode()
  }
}

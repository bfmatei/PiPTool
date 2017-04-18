import { Messages } from "./messages";

/**
 * Base class to wrap the dispatchers and event handling
 */
export class Base {
  constructor(public eventListenerTarget: any = null, public messageDispatcherTarget: any = null) {
    /** Listen for messages and send them to handleEvent */
    this.addEventListener("message", (event: SafariExtensionMessageEvent) => this.handleEvent(event), false);
  }

  /**
   * Adds an event listener on the eventListenerTarget
   * @param name - Name of the event
   * @param listener - Callback
   * @param useCapture
   */
  public addEventListener(name: string, listener: SafariEventListener, useCapture: boolean): void {
    this.eventListenerTarget.addEventListener(name, listener, useCapture);
  }

  /**
   * Dispatch a message between global and content scripts
   * @param name - Name of the message to be dispatched
   * @param message - Content of the message to be dispatched
   */
  public dispatchMessage(name: string, message?: any): void {
    this.messageDispatcherTarget.dispatchMessage(name, message);
  }

  /**
   * Execute actions for received event
   * @param event - received event
   */
  public handleEvent(event: SafariExtensionMessageEvent): void {
    switch (event.name) {
      case Messages.ENTER_PIP_MODE:
        this.enterPipMode();
        break;

      case Messages.RETRIEVE_SETTINGS:
        this.retrieveSettings();
        break;

      case Messages.RETRIEVE_SETTINGS_RESPONSE:
        this.retrieveSettingsResponse(event.message);
        break;

      default:
        console.log(`Unrecognized event received: ${event.name}`);
    }
  }

  /** ENTER_PIP_MODE message action placeholder */
  public enterPipMode(): void {
    console.log("Enter PiP mode placeholder");
  }

  /** RETRIEVE_SETTINGS message action placeholder */
  public retrieveSettings(): void {
    console.log("Retrieve settings placeholder");
  }

  /** RETRIEVE_SETTINGS_RESPONSE message action placeholder */
  public retrieveSettingsResponse(message: any): void {
    console.log("Retrieve settings response placeholder. Message: ", message);
  }
}

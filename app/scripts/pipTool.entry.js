import PipToolResources from './pipToolResources';

/**
 * @typedef {Object} Safari~Event
 * @property {String} name - Event name
 * @property {String} message - Event data
 */

export default class PipToolEntry {
  /**
   * Instantiate PiPTool
   * @param {PipToolEntry~Params} params - Parameters to be used by PiPTool
   */
  constructor(params) {
    console.log(params);
    this.params = params;

    /** Add listener for Safari events */
    safari.self.addEventListener('message', this.handleSafariEventListener);

    /** Ask for user settings */
    safari.self.tab.dispatchMessage('retrieveSettings');
  }

  /**
   * Parse Safari events and call internal methods
   * @param {Safari~Event} event - Event to parse
   */
  handleSafariEventListener(event) {
    if ('function' === typeof this[event.name]) {
      this[event.name](event.message);
    }
  }

  /**
   * Callback for retrieve settings event
   * @param {Array} safariSettings - Received user settings
   */
  retrieveSettingsResponse(safariSettings) {
    this.setup(safariSettings);
  }

  /**
   * Setup PiPTool
   * @param {Array} safariSettings - Received user settings
   */
  setup(safariSettings) {
    /** Set config object */
    this.config = {
      baseURI: safari.extension.baseURI,
      title: this.params.name,
      buttonClass: this.params.buttonClass
    };

    /** Set target mode */
    this.targetMode = {
      active: false,
      lastTargetedElement: null
    };

    /** Set resources */
    this.resources = new PipToolResources();

    /** Merge resources with user config */
    this.params.resources.forEach((resource) => this.resources.add(resource, safariSettings[`${resource.name}Domains`]));

    /** Start the observer */
    this.createObserver();
  }

  findVideos() {
    const videoWrappers = document.querySelectorAll(`${this.config.videoParentClass}:not([data-pip-added="true"])`);

    videoWrappers.forEach((videoWrapper) => this.insertPipButton(videoWrapper));
  }

  /**
   * Create the observer
   */
  createObserver() {
    const observer = new MutationObserver(this.findVideos);

    /* Start the observer */
    observer.observe(document.body, {
      childList: true
    });
  }

  /**
   * Add button to current video
   * @param {HTMLElement} videoWrapper - Current video wrapper
   */
  insertPipButton(videoWrapper) {
    const {
      config
    } = this;

    const video = videoWrapper.querySelector(this.config.videoSelector);

    const pipImage = document.createElement('img');

    pipImage.src = `${this.config.baseURI}images/${this.config.name}-icon.svg`;
    pipImage.setAttribute('height', '100%');

    const pipButton = document.createElement(this.config.elementType);

    pipButton.classList = config.buttonClassList;
    pipButton.title = config.title;
    pipButton.appendChild(pipImage);
    pipButton.addEventListener('click', (event) => this.buttonClick(event, video));

    const controlsWrapper = videoWrapper.querySelector(config.controlsWrapperClass);

    if (controlsWrapper && 0 === controlsWrapper.querySelectorAll(config.buttonClass).length) {
      controlsWrapper.appendChild(pipButton);
    }

    videoWrapper.dataset.pipAdded = true;
  }

  buttonClick(event, video) {
    event.preventDefault();

    this.togglePipMode(video);

    this.toggleTargetMode();
  }

  static togglePipMode(video) {
    if ('inline' === video.webkitPresentationMode) {
      video.webkitSetPresentationMode('picture-in-picture');
    } else {
      video.webkitSetPresentationMode('inline');
    }
  }

  toggleTargetMode() {
    this.targetMode.active = !this.targetMode.active;
  }
}

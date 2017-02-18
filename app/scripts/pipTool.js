import params from '../app.resources';
import PipToolResources from './pipToolResources';

export default class PipTool {
  constructor() {
    safari.self.addEventListener('message', this.handleSafariEventListener);

    safari.self.tab.dispatchMessage('retrieveSettings');
  }

  handleSafariEventListener(event) {
    if ('function' === typeof this[event.name]) {
      this[event.name](event.message);
    }
  }

  retrieveSettingsResponse(safariSettings) {
    this.setup(safariSettings);
  }

  setup(safariSettings) {
    this.config = {
    };
    this.config.baseURI = safari.extension.baseURI;
    this.config.title = params.name;
    this.config.buttonClass = params.buttonClass;

    this.targetMode = false;
    this.lastTargetedElement = null;

    this.resources = new PipToolResources();

    params.resources.forEach((resource) => this.resources.add(resource, safariSettings[`${resource.name}Domains`]));

    this.createObserver();
  }

  createObserver() {
    const observer = new MutationObserver(this.findVideos);

    observer.observe(document.body, {
      childList: true
    });
  }

  findVideos() {
    const videoWrappers = document.querySelectorAll('this.config.videoParentClass:not([data-pip-added="true"])');

    videoWrappers.forEach((videoWrapper) => this.insertPipButton(videoWrapper));
  }

  insertPipButton(videoWrapper) {
    const {
      config
    } = this.config;

    const video = videoWrapper.querySelector(config.videoSelector);

    const pipImage = document.createElement('img');

    pipImage.src = `${config.baseURI}images/${config.name}-icon.svg`;
    pipImage.setAttribute('height', '100%');

    const pipButton = document.createElement(config.elementType);

    pipButton.classList = config.buttonClassList;
    pipButton.title = config.title;
    pipButton.appendChild(pipImage);
    pipButton.addEventListener('click', (event) => this.buttonClick(event, video));

    const controlsWrapper = videoWrapper.querySelector(config.controlsWrapperClass);

    if (controlsWrapper && 0 === controlsWrapper.querySelectorAll(config.buttonClass).length) { // eslint-disable-line
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
        // noinspection JSUnresolvedVariable
    if ('inline' === video.webkitPresentationMode) {
            // noinspection JSUnresolvedFunction
      video.webkitSetPresentationMode('picture-in-picture');
    }
    else {
            // noinspection JSUnresolvedFunction
      video.webkitSetPresentationMode('inline');
    }
  }

  toggleTargetMode() {
    this.targetMode = !this.targetMode;
  }
}

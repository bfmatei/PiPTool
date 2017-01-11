'use strict';

import params from '../params.json';

class PipToolResource {
    constructor(config) {
        this.config = config;
    }

    get name() {
        return this.config.name;
    }

    addDomains(additionalDomains) {
        if (additionalDomains) {
            this.config.domains += additionalDomains;
        }
    }
}

class PipToolResources {
    constructor() {
        this.resources = [];
    }

    add(resourceConfig, additionalDomains) {
        let resource = new PipToolResource(resourceConfig);

        resource.addDomains(additionalDomains);

        this.resources.push(resource);
    }
}

export default class PipTool {
    constructor() {
        // noinspection JSUnresolvedVariable, JSUnresolvedFunction
        safari.self.addEventListener('message', this.handleSafariEventListener);

        // noinspection JSUnresolvedVariable, JSUnresolvedFunction
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
        this.config = {};
        this.config.baseURI = safari.extension.baseURI;
        this.config.title = params.name;
        this.config.buttonClass = params.buttonClass;

        this.targetMode = false;
        this.lastTargetedElement = null;

        this.resources = new PipToolResources();

        params.resources.forEach(resource => this.resources.add(resource, safariSettings[resource.name + 'Domains']));

        this.createObserver();
    }

    createObserver() {
        let observer = new MutationObserver(this.findVideos);

        observer.observe(document.body, {
            childList: true
        });
    }

    findVideos() {
        let videoWrappers = document.querySelectorAll(`this.config.videoParentClass:not([data-pip-added="true"])`);

        videoWrappers.forEach(videoWrapper => this.insertPipButton(videoWrapper));
    }

    insertPipButton(videoWrapper) {
        let config = this.config;

        let video = videoWrapper.querySelector(config.videoSelector);

        let pipImage = document.createElement('img');
        pipImage.src = `${config.baseURI}images/${config.name}-icon.svg`;
        pipImage.setAttribute('height', '100%');

        let pipButton = document.createElement(config.elementType);
        pipButton.classList = config.buttonClassList;
        pipButton.title = config.title;
        pipButton.appendChild(pipImage);
        pipButton.addEventListener('click', event => this.buttonClick(event, video));

        let controlsWrapper = videoWrapper.querySelector(config.controlsWrapperClass);

        if (controlsWrapper && 0 === controlsWrapper.querySelectorAll(config.buttonClass).length) {
            controlsWrapper.appendChild(pipButton);
        }

        videoWrapper.dataset.pipAdded = true;
    }

    buttonClick(event, video) {
        event.preventDefault();

        this.togglePipMode(video);

        this.toggleTargetMode();

        // togglePipSearchMode();
    }

    togglePipMode(video) {
        // noinspection JSUnresolvedVariable
        if ('inline' === video.webkitPresentationMode) {
            // noinspection JSUnresolvedFunction
            video.webkitSetPresentationMode('picture-in-picture');
        } else {
            // noinspection JSUnresolvedFunction
            video.webkitSetPresentationMode('inline');
        }
    }

    toggleTargetMode() {
        this.targetMode = !this.targetMode;
    }
}

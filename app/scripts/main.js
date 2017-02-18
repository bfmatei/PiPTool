(function (safari) {
    'use strict';

    var inPipSearchMode,
        lastHoveredElement,
        pipClickEvent,
        pipMouseMoveEvent,
        pipKeydownEvent,
        togglePipSearchMode,
        resources,
        currentResource,
        addPipButtons,
        findVideos,
        observer,
        observerTrigger,
        netflixAppendEvent,
        initPipTool;

    /**
     * Click event to toggle a video's PiP mode
     * @param {MouseEvent} event - Event received
     */
    pipClickEvent = function (event) {
        var element;

        event.preventDefault();
        event.stopPropagation();

        /** @type {Node} */
        element = event.target;

        // noinspection JSUnresolvedVariable
        if (element.webkitSetPresentationMode) {
            // noinspection JSUnresolvedVariable
            if ('inline' === element.webkitPresentationMode) {
                // noinspection JSUnresolvedFunction
                element.webkitSetPresentationMode('picture-in-picture');
            } else {
                // noinspection JSUnresolvedFunction
                element.webkitSetPresentationMode('inline');
            }

            togglePipSearchMode();
        } else {
            element.classList.add('deactivate-pointer-events');
        }
    };

    /**
     * Hover event to turn the red border on/off
     * @param {MouseEvent} event - Event received
     */
    pipMouseMoveEvent = function (event) {
        if (lastHoveredElement !== event.target) {
            if (lastHoveredElement) {
                lastHoveredElement.classList.remove('pip-hover-mode');
            }

            if (!event.target.classList.contains('pip-hover-mode')) {
                event.target.classList.add('pip-hover-mode');
            }

            lastHoveredElement = event.target;
        }
    };

    /**
     * Listener for the Esc key to turn PiPTool off
     * @param {KeyboardEvent} event - Event received
     */
    pipKeydownEvent = function (event) {
        if (27 === event.keyCode) {
            togglePipSearchMode();
        }
    };

    /** Method to toggle the hover function of PiPTool */
    togglePipSearchMode = function () {
        if (!inPipSearchMode) {
            document.addEventListener('click', pipClickEvent);
            document.addEventListener('mousemove', pipMouseMoveEvent);
            document.addEventListener('keydown', pipKeydownEvent);
        } else {
            document.removeEventListener('click', pipClickEvent);
            document.removeEventListener('mousemove', pipMouseMoveEvent);
            document.removeEventListener('keydown', pipKeydownEvent);

            document.querySelectorAll('.pip-hover-mode, .deactivate-pointer-events').forEach(function (element) {
                element.classList.remove('pip-hover-mode');
                element.classList.remove('deactivate-pointer-events');
            });
        }

        inPipSearchMode = !inPipSearchMode;
    };

    /**
     * Add the PiP event and button to a given video
     * @param {Object} videoWrapper - Video element to process
     */
    addPipButtons = function (videoWrapper) {
        var pipButton,
            pipImage,
            video,
            controlsWrapper;

        /** @type {Object} The video to be switched */
        video = videoWrapper.querySelector(currentResource.videoSelector);

        /** @type {Node} The PiP button */
        pipButton = document.createElement(currentResource.elementType);
        // noinspection JSAnnotator,JSValidateTypes
        pipButton.classList = currentResource.buttonClassList;
        pipButton.title = 'PiP Mode';

        /** @type {Node} The icon shown in the PiP button */
        pipImage = document.createElement('img');
        // noinspection JSUnresolvedVariable
        pipImage.src = safari.extension.baseURI + 'images/' + currentResource.name + '-icon.svg';
        pipImage.setAttribute('height', '100%');

        pipButton.appendChild(pipImage);

        pipButton.addEventListener('click', function (event) {
            event.preventDefault();

            /** Swap the PiP mode */
            // noinspection JSUnresolvedVariable
            if ('inline' === video.webkitPresentationMode) {
                // noinspection JSUnresolvedFunction
                video.webkitSetPresentationMode('picture-in-picture');
            } else {
                // noinspection JSUnresolvedFunction
                video.webkitSetPresentationMode('inline');
            }

            inPipSearchMode = true;

            togglePipSearchMode();
        });

        if (currentResource.customAppendEvent) {
            currentResource.customAppendEvent(pipButton);
        } else {
            controlsWrapper = videoWrapper.querySelector(currentResource.controlsWrapperClass);

            if (controlsWrapper && 0 === controlsWrapper.querySelectorAll('.pip-button').length) {
                controlsWrapper.appendChild(pipButton);
            }
        }
    };

    /** Find the videos according to the current resource options */
    // findVideos = function () {
    //     var videoWrappers,
    //         videoWrapperIterator;
    //
    //     /** Fetch all the video elements */
    //     videoWrappers = document.querySelectorAll(currentResource.videoParentClass);
    //
    //     for (videoWrapperIterator = 0; videoWrapperIterator < videoWrappers.length; videoWrapperIterator++) {
    //         addPipButtons(videoWrappers[videoWrapperIterator]);
    //     }
    // };

    /**
     * Method used to listen and trigger the event of finding the videos
     * @param {Array} mutations - Changes observed
     */
    // observer = function (mutations) {
    //     mutations.forEach(function (mutation) {
    //         var addedNodesIterator;
    //
    //         for (addedNodesIterator = 0; addedNodesIterator < mutation.addedNodes.length; addedNodesIterator++) {
    //             if (mutation.addedNodes[addedNodesIterator].classList && mutation.addedNodes[addedNodesIterator].classList.contains(currentResource.customClasses.observer)) {
    //                 findVideos();
    //             }
    //         }
    //     });
    // };

    /** Create the observer */
    // observerTrigger = function () {
    //     var observerInstance;
    //
    //     /** @type {MutationObserver} Initialize an observer */
    //     observerInstance = new MutationObserver(observer);
    //
    //     /** Set the observer */
    //     observerInstance.observe(document.querySelector(currentResource.customClasses.container), {
    //         childList: true
    //     });
    // };

    /**
     * Custom append event specifically for Netflix
     * @param {Node} pipButton - PiP button built previously
     */
    netflixAppendEvent = function (pipButton) {
        if (0 === document.body.querySelectorAll('.pip-button').length) {
            document.querySelector(currentResource.customClasses.buttonDestination).appendChild(pipButton);
        }
    };

    /** Method to trigger the PiP button display */
    initPipTool = function () {
        var additionalDomains;

        inPipSearchMode = false;
        lastHoveredElement = null;
        additionalDomains = null;
        currentResource = null;

        // noinspection JSUnresolvedVariable
        /**
         * Register the listener for the menu button click
         * @param {Object} message - Message received from global instance
         */
        safari.self.addEventListener('message', function (message) {
            if ('retrieveSettingsResponse' === message.name) {
                additionalDomains = message.message;

                /** @type {Array} An array with every platform and the custom options for them */
                resources = [
                    {
                        name: 'dailymotion',
                        testPattern: /(dailymotion\.com|www\.dailymotion\.com)/,
                        customAppendEvent: null,
                        elementType: 'button',
                        videoSelector: 'video#dmp_Video',
                        buttonClassList: 'dmp_ControlBarButton pip-button',
                        videoParentClass: '.dmp_Player',
                        controlsWrapperClass: '.dmp_ControlBar',
                        customClasses: null
                    },
                    {
                        name: 'plex',
                        testPattern: new RegExp('(plex.tv|www.plex.tv|app.plex.tv' + (additionalDomains ? '|' + additionalDomains : '') + ')'),
                        customAppendEvent: null,
                        elementType: 'button',
                        videoSelector: 'video.html-video',
                        buttonClassList: 'btn-link pip-button',
                        videoParentClass: '.video-container',
                        controlsWrapperClass: '.video-controls-overlay-bottom .video-controls-right',
                        customClasses: {
                            container: '#plex',
                            observer: 'video-player'
                        }
                    },
                    {
                        name: 'youtube',
                        testPattern: /(youtube\.com|www\.youtube\.com|youtu\.be|www\.youtu\.be)/,
                        customAppendEvent: null,
                        elementType: 'button',
                        videoSelector: 'video.html5-main-video',
                        buttonClassList: 'ytp-button pip-button',
                        videoParentClass: '.html5-video-player',
                        controlsWrapperClass: '.ytp-right-controls',
                        customClasses: null
                    },
                    {
                        name: 'netflix',
                        testPattern: /(netflix\.com|www\.netflix\.com)/,
                        customAppendEvent: netflixAppendEvent,
                        elementType: 'span',
                        videoSelector: 'video',
                        buttonClassList: 'netflix-pip',
                        videoParentClass: '.player-video-wrapper',
                        customClasses: {
                            container: '#appMountPoint',
                            observer: 'player-menu',
                            buttonDestination: '.player-status'
                        }
                    }
                ];

                resources.forEach(function (resource) {
                    if (resource.testPattern.test(location.hostname)) {
                        currentResource = resource;

                        /** Add the event for normal pages */
                        window.addEventListener('load', findVideos, true);

                        document.addEventListener('DOMContentLoaded', function () {
                            var observerInstance;

                            /** @type {MutationObserver} Initialize an observer */
                            observerInstance = new MutationObserver(findVideos);

                            /** Set the observer */
                            observerInstance.observe(document.querySelector('body'), {
                                childList: true
                            });
                        }, true);
                    }
                });
            } else if ('enterPipMode' === message.name) {
                togglePipSearchMode();
            }
        }, false);

        // noinspection JSUnresolvedVariable, JSUnresolvedFunction
        safari.self.tab.dispatchMessage('retrieveSettings');
    };

    if (safari) {
        initPipTool();
    }
})();

(function () {
    'use strict';

    var resources,
        currentResource,
        addPipButtons,
        findVideos,
        initPiPTool;

    /** @type {Array} An array with every platform and the custom options for them */
    resources = [
        {
            name: 'dailymotion',
            testPattern: /(dailymotion\.com|www\.dailymotion\.com)/,
            customLoadEvent: null,
            elementType: 'button',
            videoSelector: 'video#dmp_Video',
            buttonClassList: 'dmp_ControlBarButton pip-button',
            videoParentClass: '.dmp_Player',
            controlsWrapperClass: '.dmp_ControlBar'
        },
        {
            name: 'youtube',
            testPattern: /(youtube\.com|www\.youtube\.com|youtu\.be|www\.youtu\.be)/,
            customLoadEvent: {
                name: 'spfdone',
                loaded: false
            },
            elementType: 'button',
            videoSelector: 'video.html5-main-video',
            buttonClassList: 'ytp-button pip-button',
            videoParentClass: '.html5-video-player',
            controlsWrapperClass: '.ytp-right-controls'
        }
    ];

    /** @type {Object} An object keeping the current platform options */
    currentResource = null;

    /**
     * Add the PiP event and button to a given video
     * @param {Object} videoWrapper Video element to process
     */
    addPipButtons = function (videoWrapper) {
        var pipButton,
            pipImage,
            video,
            controlsWrapper;

        /** @type {Object} The video to be switched */
        video = videoWrapper.querySelector(currentResource.videoSelector);

        /** @type {Object} The PiP button */
        pipButton = document.createElement(currentResource.elementType);
        pipButton.classList = currentResource.buttonClassList;
        pipButton.title = 'PiP Mode';

        /** @type {Object} The icon shown in the PiP button */
        pipImage = document.createElement('img');
        pipImage.src = safari.extension.baseURI + 'images/' + currentResource.name + '-icon.svg';

        pipButton.appendChild(pipImage);

        pipButton.addEventListener('click', function (event) {
            event.preventDefault();

            /** Swap the PiP mode */
            if ('inline' === video.webkitPresentationMode) {
                video.webkitSetPresentationMode('picture-in-picture');
            } else {
                video.webkitSetPresentationMode('inline');
            }
        });

        controlsWrapper = videoWrapper.querySelector(currentResource.controlsWrapperClass);

        if (controlsWrapper && 0 === controlsWrapper.querySelectorAll('.pip-button').length) {
            controlsWrapper.appendChild(pipButton);
        }
    };

    /** Find the videos according to the current resource options */
    findVideos = function () {
        var videoWrappers,
            videoWrapperIterator;

        /** Fetch all the video elements */
        videoWrappers = document.querySelectorAll(currentResource.videoParentClass);

        for (videoWrapperIterator = 0; videoWrapperIterator < videoWrappers.length; videoWrapperIterator++) {
            addPipButtons(videoWrappers[videoWrapperIterator]);
        }
    };

    /** Method to trigger the PiP button display */
    initPiPTool = function () {
        resources.forEach(function (resource) {
            if (location.hostname.match(resource.name)) {
                currentResource = resource;

                window.addEventListener('DOMContentLoaded', findVideos, true);

                if (null !== currentResource.customLoadEvent && false === currentResource.customLoadEvent.loaded) {
                    window.addEventListener(currentResource.customLoadEvent.name, findVideos);

                    currentResource.customLoadEvent.loaded = true;
                }
            }
        });
    };

    initPiPTool();
}());



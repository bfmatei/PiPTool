(function () {
    'use strict';

    var resources,
        currentResource,
        addPipButtons,
        findVideos,
        plexObserver,
        plexObserverTrigger,
        netflixObserver,
        netflixObserverTrigger,
        initPiPTool;

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

        if (currentResource.name == 'netflix' && document.body.querySelectorAll('.pip-button').length < 1) {
	        document.body.appendChild(pipButton);
        } else if (controlsWrapper && 0 === controlsWrapper.querySelectorAll('.pip-button').length) {
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

    /** The method used to listen and trigger the event of finding the videos */
    netflixObserver = function (mutations) {
        mutations.forEach(function (mutation) {
            var addedNodesIterator;

            for (addedNodesIterator = 0; addedNodesIterator < mutation.addedNodes.length; addedNodesIterator++) {
                if (mutation.addedNodes[addedNodesIterator].classList && mutation.addedNodes[addedNodesIterator].classList.contains(currentResource.customClasses.videoClassObserver)) {
                    findVideos();
                }
            }
        });
    };

    /** The trigger of the Plex Observer */
    netflixObserverTrigger = function () {
        var observer;

        /** @type {MutationObserver} Initialize an observer */
        observer = new MutationObserver(netflixObserver);

        /** Set the observer */
        observer.observe(document.querySelector(currentResource.customClasses.netflixContainer), {
			childList: true, 
		    subtree:true
        });
    };

    /** The method used to listen and trigger the event of finding the videos */
    plexObserver = function (mutations) {
        mutations.forEach(function (mutation) {
            var addedNodesIterator;

            for (addedNodesIterator = 0; addedNodesIterator < mutation.addedNodes.length; addedNodesIterator++) {
                if (mutation.addedNodes[addedNodesIterator].classList && mutation.addedNodes[addedNodesIterator].classList.contains(currentResource.customClasses.videoClassObserver)) {
                    findVideos();
                }
            }
        });
    };

    /** The trigger of the Plex Observer */
    plexObserverTrigger = function () {
        var observer;

        /** @type {MutationObserver} Initialize an observer */
        observer = new MutationObserver(plexObserver);

        /** Set the observer */
        observer.observe(document.querySelector(currentResource.customClasses.plexContainer), {
            childList: true
        });
    };

    /** Method to trigger the PiP button display */
    initPiPTool = function () {
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
                controlsWrapperClass: '.dmp_ControlBar',
                customClasses: null
            },
            {
                name: 'plex',
                testPattern: /(plex\.tv|www\.plex\.tv|app\.plex\.tv)/,
                customLoadEvent: {
                    name: 'DOMContentLoaded',
                    method: plexObserverTrigger,
                    loaded: false
                },
                elementType: 'button',
                videoSelector: 'video.html-video',
                buttonClassList: 'btn-link pip-button',
                videoParentClass: '.video-container',
                controlsWrapperClass: '.video-controls-overlay-bottom .video-controls-right',
                customClasses: {
                    plexContainer: '#plex',
                    videoClassObserver: 'video-player'
                }
            },
            {
                name: 'youtube',
                testPattern: /(youtube\.com|www\.youtube\.com|youtu\.be|www\.youtu\.be)/,
                customLoadEvent: {
                    name: 'spfdone',
                    method: findVideos,
                    loaded: false
                },
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

                customLoadEvent: {
                    name: 'load',
                    method: netflixObserverTrigger,
                    loaded: false
                },

                elementType: 'div',
                videoSelector: 'video',
                buttonClassList: 'netflix-pip',
                videoParentClass: '.player-video-wrapper',
                customClasses: {
                    netflixContainer: '#appMountPoint',
                    videoClassObserver: 'player-menu'
                }
            }
        ];
        

        /** @type {Object} An object keeping the current platform options */
        currentResource = null;

        resources.forEach(function (resource) {
            if (location.hostname.match(resource.name)) {
                currentResource = resource;

                /** Add the event for normal pages */
                window.addEventListener('load', findVideos, true);

                /** Try to see if we have any custom handlers for this page (for instance DailyMotion). Usually these are used with SPAs (single page applications) like YouTube or Plex */
                if (null !== currentResource.customLoadEvent && false === currentResource.customLoadEvent.loaded) {
                    window.addEventListener(currentResource.customLoadEvent.name, currentResource.customLoadEvent.method, true);

                    currentResource.customLoadEvent.loaded = true;
                }
            }
        });
    };

    initPiPTool();
}());



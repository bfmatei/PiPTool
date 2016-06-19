window.onload = function () {
    'use strict';

    var resources,
        resourceIterator,
        videos,
        addPipButton,
        videoIterator;

    /** @type {Object} [description] */
    resources = {
        dailymotion: {
            elementType: 'button',
            videoSelector: 'video#dmp_Video',
            buttonClassList: 'dmp_ControlBarButton pip-button',
            videoParentClass: '.dmp_Player',
            controlsWrapperClass: '.dmp_ControlBar'
        },

        youtube: {
            elementType: 'button',
            videoSelector: 'video.video-stream.html5-main-video',
            buttonClassList: 'ytp-button pip-button',
            videoParentClass: '.html5-video-player',
            controlsWrapperClass: '.ytp-right-controls'
        }
    };

    /**
     * Add the PiP event and button to a given video
     * @param {Object} video Video element to process
     */
    addPipButton = function (video, target) {
        var pipButton;

        /** @type {Object} The PiP button */
        pipButton = document.createElement(resources[target].elementType);
        pipButton.classList = resources[target].buttonClassList;
        pipButton.title = 'PiP Mode';
        pipButton.innerHTML = '<img src="' + safari.extension.baseURI + 'images/' + target + '-icon.svg"/>';

        pipButton.addEventListener('click', function (event) {
            event.preventDefault();

            /** Swap the PiP mode */
            if ('inline' === video.webkitPresentationMode) {
                video.webkitSetPresentationMode('picture-in-picture');
            } else {
                video.webkitSetPresentationMode('inline');
            }
        });

        /** Append the button to the controls */
        video.closest(resources[target].videoParentClass).querySelector(resources[target].controlsWrapperClass).appendChild(pipButton);
    };

    for (resourceIterator in resources) {
        if (resources.hasOwnProperty(resourceIterator) && -1 < document.domain.indexOf(resourceIterator)) {
            /** Fetch all the video elements */
            videos = document.querySelectorAll(resources[resourceIterator].videoSelector);

            for (videoIterator = 0; videoIterator < videos.length; videoIterator++) {
                addPipButton(videos[videoIterator], resourceIterator);
            }
        }
    }
};

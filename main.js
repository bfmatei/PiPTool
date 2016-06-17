window.onload = function () {
    'use strict';

    var videos,
        addPipButton,
        videoIterator;

    /** Fetch all the video elements */
    videos = document.querySelectorAll('video.video-stream.html5-main-video');

    /**
     * Add the PiP event and button to a given video
     * @param {object} video Video element to process
     */
    addPipButton = function (video) {
        var pipButton,
            clickListener;

        /** @type {object} The PiP button */
        pipButton = document.createElement('button');
        pipButton.classList = 'ytp-button';
        pipButton.title = 'PiP Control';
        pipButton.innerHTML = '<svg fill="#FFFFFF" height="100%" viewBox="0 0 24 24" width="100%" style="transform:scale(0.7)" xmlns="http://www.w3.org/2000/svg"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

        clickListener = function (event) {
            event.preventDefault();

            /** Swap the PiP mode */
            if ('inline' === video.webkitPresentationMode) {
                video.webkitSetPresentationMode('picture-in-picture');
            } else {
                video.webkitSetPresentationMode('inline');
            }
        };

        pipButton.addEventListener('click', clickListener);

        /** Append the button to the controls */
        video.closest('.html5-video-player').querySelector('.ytp-right-controls').appendChild(pipButton);
    };

    if (0 < videos.length && videos[0].webkitSupportsPresentationMode && 'function' === typeof videos[0].webkitSetPresentationMode) {
        for (videoIterator = 0; videoIterator < videos.length; videoIterator++) {
            addPipButton(videos[videoIterator]);
        }
    }
};

(function () {
    'use strict';

    var togglePipMode;

    /** Handler for the menu button */
    togglePipMode = function () {
        // noinspection JSUnresolvedVariable, JSUnresolvedFunction
        safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('enterPipMode');
    };

    // noinspection JSUnresolvedVariable
    /** Register the menu button command */
    safari.application.addEventListener('command', togglePipMode, false);
}());

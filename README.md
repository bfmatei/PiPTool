# PiPTool
PiPTool is a Safari 10 extension built to add the Picture-in-Picture functionality to the video players that do not have it implemented.

For example, YouTube or DailyMotion don't have the default HTML5 video player, so Safari cannot add the PiP button. This is where PiP Tool comes in place.

Additionally, the extension comes with a menu button. Just click it and then select any video from the page.

## Installation
1. Download the extension from here: [https://bfmatei.github.io/extensions/PiPTool.safariextz](https://bfmatei.github.io/extensions/PiPTool.safariextz)
2. Open the downloaded file
3. Click trust
4. Enjoy!

## Development
1. Prerequisites: [Node.js](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org), [webpack](https://webpack.github.io) and [TSLint](https://palantir.github.io/tslint/).
2. Clone the repo
3. Use "npm install" to install the needed packages
4. If you want to develop, use "grunt live" to build and then listen for changes in the project files
5. If you want to build the extension, use "grunt build"

Note: you need to use Safari to build the ".safariextz" file. The build command above just generates the files for Safari.

## Improvements
- Add resources dynamic from a public list like content blockers do
- Add a configuration page for easier configuration

## Changelog
### Version 2.0.0
- The whole extension was reimplemented from scratch in TypeScript
- Much easier way to add a new resource
- The mechanism behind can now detect way more websites. Just ask for something and i will add support for it.
- The new mechanism allows button placement in specific place easier now.
- New image for toolbar. Thanks to [David Hariri](https://github.com/davidhariri)
- Added support for Twitch.tv and Amazon Videos
- Button placed before fullscreen button for YouTube and Twitch
- Fix support for Safari Technology Preview
- Removed support for DailyMotion (they offer native button now)

### Version 1.8.2
- Fix Search mode

### Version 1.8.1
- Changed versioning type
- Improved Plex native support
- Added settings for additional Plex domains. The settings are accessible via Extensions panel in Safari preferences. You can add 1 domain like this: "test.com" or multiple domains "test1.com|test2.com|test3.com". IPs are supported too.
- Improved picker mode by adding a red border to the current hovered element
- Improved menu icon

### Version 1.8
- Added menu button to trigger the PiP mode manually for a picked video. Just click the PiPTool button then navigate with the mouse above page elements. If the selected element is a video, then it will trigger the PiP mode.
- Reorganized the project a little

### Version 1.7
- Added initial Plex support
- Added Netflix support (many thanks to [Joe Kuhns](https://github.com/JoeKuhns) for his hard work)
- Fixed issue with YouTube not working on embedded videos
- Improved the performance by triggering the plugin only on the supported websites (thanks, again, to [Joe Kuhns](https://github.com/JoeKuhns))
- Created a more programatic way to handle the project (instructions coming soon)
- more to come

### Version 1.6
- Fixed PiP button not displaying when navigating to a movie from YouTube homepage
- Added the possibility to bind custom event to trigger the PiP button loading
- Possible fix for the [https://github.com/bfmatei/PiPTool.safariextension/issues/3](YouTube playlists issues)

### Version 1.5
- Add the possibility to auto-update the extension

### Version 1.4
- Add functionality for DailyMotion. More to come soon
- Optimize the code

### Version 1.3
- Make it work with all the YouTube videos in a page (for multiple embedded videos on same page)

### Version 1.2
- Simplify the code by removing unnecessary attribute

### Version 1.1
- Changed icon with the one offered in [Material Design Icons](https://design.google.com/icons/#ic_picture_in_picture)

### Version 1.0
- Initial release

## Known Bugs
- When leaving picture-in-picture mode the video stops

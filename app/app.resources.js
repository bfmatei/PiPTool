export default {
  buttonClass: '.pip-button',
  resources: [
    {
      name: 'dailymotion',
      domains: 'dailymotion.com|www.dailymotion.com',
      elementType: 'button',
      videoSelector: 'video#dmp_Video',
      buttonClassList: 'dmp_ControlBarButton pip-button',
      videoParentClass: '.dmp_Player',
      controlsWrapperClass: '.dmp_ControlBar'
    },
    {
      name: 'plex',
      domains: 'plex.tv|www.plex.tv|app.plex.tv',
      elementType: 'button',
      videoSelector: 'video.html-video',
      buttonClassList: 'btn-link pip-button',
      videoParentClass: '.video-container',
      controlsWrapperClass: '.video-controls-overlay-bottom .video-controls-right'
    },
    {
      name: 'youtube',
      domains: 'youtube.com|www.youtube.com|youtu.be|www.youtu.be',
      elementType: 'button',
      videoSelector: 'video.html5-main-video',
      buttonClassList: 'ytp-button pip-button',
      videoParentClass: '.html5-video-player',
      controlsWrapperClass: '.ytp-right-controls'
    },
    {
      name: 'netflix',
      domains: 'netflix.com|www.netflix.com',
      elementType: 'span',
      videoSelector: 'video',
      buttonClassList: 'netflix-pip',
      videoParentClass: '.player-video-wrapper',
      controlsWrapperClass: ''
    }
  ]
};

browser.runtime.onMessage.addListener((request) => {
    const player = document.getElementById('movie_player');
    if (!player || !player.wrappedJSObject) return;

    const ytApi = player.wrappedJSObject;
    const currentVol = ytApi.getVolume();

    switch (request.action) {
        case 'toggle_play':
            ytApi.getPlayerState() === 1 ? ytApi.pauseVideo() : ytApi.playVideo();
            break;

        case 'vol_up':
            ytApi.unMute();
            ytApi.setVolume(Math.min(currentVol + 10, 100));
            break;

        case 'vol_down':
            ytApi.unMute();
            ytApi.setVolume(Math.max(currentVol - 10, 0));
            break;

        case 'forward':
            ytApi.seekTo(ytApi.getCurrentTime() + 10, true);
            break;

        case 'backward':
            ytApi.seekTo(Math.max(ytApi.getCurrentTime() - 10, 0), true);
            break;
    }
});
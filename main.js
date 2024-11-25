const CONFIG = {
    selectors: {
        video: 'video',
        speedButton: '#efyt-speed',
        videoTitle: '#title.ytd-watch-metadata',
        gamingLink: '#always-shown a#endpoint-link[href*=gaming]',
        scrollContainer: '#shelf-container > #scroll-container > #items'
    },
    musicPatterns: /music|song|official|mv|lyric/i,
    eventTypes: {
        normal: 'contextmenu',
        speedup: 'click'
    }
};

// Function to check if is a music video
function isMusicVideo() {
    const pageTitle = document.title.toLowerCase();
    const videoTitle = document.querySelector(CONFIG.selectors.videoTitle)?.textContent.toLowerCase();
    const isGamingVideo = document.querySelector(CONFIG.selectors.gamingLink);
    // Container in the bottom of video description listing the songs played in the video
    const scrollContainer = document.querySelector(CONFIG.selectors.scrollContainer);

    return (
        CONFIG.musicPatterns.test(pageTitle) ||
        CONFIG.musicPatterns.test(videoTitle) ||
        (!isGamingVideo && scrollContainer?.childElementCount === 1)
    );
}

// Function to create the mouse click event
function triggerSpeedChange(type) {
    const event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window
    });

    return event;
}

// Function to change the video speed
function changeVideoSpeed() {
    const videoPlayer = document.querySelector(CONFIG.selectors.video);
    const speedButton = document.querySelector(CONFIG.selectors.speedButton);

    if (!videoPlayer || !speedButton) {
        console.debug('Player or extension button not found');
        return;
    }

    const musicVideo = isMusicVideo();
    console.info(`Video status - Is a song: ${musicVideo}`);

    const eventType = musicVideo ? CONFIG.eventTypes.normal : CONFIG.eventTypes.speedup;
    const event = triggerSpeedChange(eventType);

    speedButton.dispatchEvent(event);
}

// Function to find the elements and start the event listener
function initialize() {
    const videoPlayer = document.querySelector(CONFIG.selectors.video);
    const speedButton = document.querySelector(CONFIG.selectors.speedButton);

    if (!videoPlayer || !speedButton)  {
        console.debug('Player or extension button not found, trying again in 1 second');
        setTimeout(initialize, 1000);
        return;
    }

    console.info('Player found, setting up events');
    document.addEventListener('yt-page-data-updated', changeVideoSpeed);
    changeVideoSpeed();
}

initialize();

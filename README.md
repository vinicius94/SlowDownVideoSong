# SlowDownVideoSong
A JavaScript-based extension script that automatically adjusts video playback speed on YouTube based on content type. It uses the [Enhancer for YouTube™](https://www.mrfdev.com/enhancer-for-youtube) extension to control video speed.
## Features
- Automatically detects music videos based on:
  - Video title
  - Page title
  - Gaming category
  - Music credits in video description
- Sets normal speed (1x) for music videos
- Increases speed (2x) for non-music content
- Works with video navigation and page updates
- Integrates with [Enhancer for YouTube™](https://www.mrfdev.com/enhancer-for-youtube) extension
## Prerequisites
- [Enhancer for YouTube™](https://www.mrfdev.com/enhancer-for-youtube) browser extension must be installed
- Modern web browser (Chrome, Firefox, Edge, etc.)
## Installation
1. Install [Enhancer for YouTube™](https://www.mrfdev.com/enhancer-for-youtube) extension
2. Add this script to [Enhancer for YouTube™](https://www.mrfdev.com/enhancer-for-youtube) options
   - Click on Custom Script menu
   - Copy and paste the provided code
   - Save and enable the script, clicking on "Automatically execute the script when YouTube is loaded in a tab"
## How It Works
The script:
1. Monitors YouTube page navigation
2. Detects if current video is music-related using multiple criteria
3. Triggers appropriate mouse events on Enhancer for YouTube's speed button:
   - Right-click for normal speed (music videos)
   - Left-click for increased speed (non-music content)
### Music Detection Logic
A video is considered music if any of these conditions are met:
- Title contains keywords: "music", "song", "official", "mv", "lyric"
- Video is not in gaming category and has a music credit in description
- Page title contains music-related keywords
## Configuration
The script uses a centralized configuration object:
```javascript
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
```
You can modify:
- DOM selectors
- Music detection patterns
- Event types for speed control
## Debug Information
The script logs helpful debug information to the console:
- Player and button detection status
- Music video detection results
- Initialization status

## Troubleshooting

Common issues and solutions:

1. **Speed not changing automatically**
   - Verify Enhancer for YouTube™ is enabled
   - Check if custom scripts are enabled in Enhancer settings
   - Ensure script is set to auto-execute

2. **Script not detecting music videos**
   - Check console for debug messages
   - Verify video title is visible
   - Make sure page has fully loaded

## Contributing
Feel free to submit issues and enhancement requests!

## License

Copyright 2024

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

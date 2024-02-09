const apiKey = 'AIzaSyDZScTnbmg-ECzI3HztUFGSOGur8Di_xmU';
const channelId = 'UCYn6UEtQ771a_OWSiNBoG8w'; 

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&eventType=live`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            const playerContainer = document.getElementById('liveStreamContainer');
            playerContainer.innerHTML = `
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            `;
        } else {
            // If no live streams are found, retrieve the latest video from the channel
            fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&eventType=completed`)
            .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.items && data.items.length > 0) {
                        const videoId = data.items[0].id.videoId;
                        const playerContainer = document.getElementById('liveStreamContainer');
                        playerContainer.innerHTML = `
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                        `;
                    } else {
                        console.log('No videos found on the channel.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching videos:', error);
                });
        }
    })
    .catch(error => {
        console.error('Error fetching live streams:', error);
    });
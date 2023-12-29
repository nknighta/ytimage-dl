const THUMB_TYPES = [
    /** w1280 */
    'maxresdefault.jpg',
    /** w640 */
    'sddefault.jpg',
    /** w480 */
    'hqdefault.jpg',
    /** w320 */
    'mqdefault.jpg',
    /** w120 */
    'default.jpg',
];

function extractVideoId(url) {
    // for normal url
    const pattern = /watch\?v=([a-zA-Z0-9_-]+)/;
    const match = url.match(pattern);
    // for short url
    const patterns = "https://youtu.be/([a-zA-Z0-9_-]+)";
    const matchs = url.match(patterns);
    // for only id
    const patternid = "https://www.youtube.com/shorts/([a-zA-Z0-9_-]+)";
    const matchid = url.match(patternid);
    // for shorts video url

    const pattern_live = "https://www.youtube.com/live/([a-zA-Z0-9_-]+)";
    const match_live = url.match(pattern_live);

    const patternshort = "shorts/([a-zA-Z0-9_-]+)";
    const matchshort = url.match(patternshort);
    if (match && match[1]) {
        return match[1];
    } else if (matchs && matchs[1]) {
        return matchs[1];
    } else if (matchid && matchid[1]) {
        return matchid[1];
    } else if (matchshort && matchshort[1]) {
        return matchshort[1];
    } else if (match_live && match_live[1]) {
        return match_live[1];
    }
    return "error";
}


function displayImage() {
    const getYtThumbnail = async (videoId) => {
        // load image
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = (e) => resolve(img);
                img.src = src;
            });
        };

        if (videoId === 'error') {
            alert('URLが正しくありません。');
            const imageContainer = document.getElementById('imageContainer');
            imageContainer.innerHTML = ''; // 既存の画像をクリア
        }

        for (let i = 0; i < THUMB_TYPES.length; i++) {
            const fileName = `https://i.ytimg.com/vi/${videoId}/${THUMB_TYPES[i]}`;

            const res = await loadImage(fileName);

            if (
                !THUMB_TYPES[i + 1]
                || (res).width > 120
            ) {
                return fileName;
            }
        }
    };

    (async () => {
        // get vide id
        var imageUrl = document.getElementById('imageUrl').value;
        const videoId = extractVideoId(imageUrl);

        const highQuality = await getYtThumbnail(videoId);
        document.getElementById('prev').src = highQuality;

        const imageContainer = document.getElementById('imageContainer');

        const img = document.createElement('div');
        //img.innerHTML = "https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";
        img.innerHTML = `<a href="${highQuality}">thumbnail image</a>`;
        imageContainer.appendChild(img);
    })();
}

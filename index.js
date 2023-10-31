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
    }
    return null;
}

function displayImage() {
    const getYtThumbnail = async (videoId) => {
        // 画像をロードする処理
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = (e) => resolve(img);
                img.src = src;
            });
        };

        for (let i = 0; i < THUMB_TYPES.length; i++) {
            const fileName = `https://img.youtube.com/vi/${videoId}/${THUMB_TYPES[i]}`;

            const res = await loadImage(fileName);

            // ダミー画像じゃなかったら（横幅が121px以上だったら）
            // もしくは、これ以上小さい解像度が無かった場合は、このURLで決定
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
        document.getElementById('highQuality').src = highQuality;

        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = ''; // 既存の画像をクリア

        const img = document.createElement('div');
        //img.innerHTML = "https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";
        img.innerHTML = `<a href="${highQuality}">thumbnail image</a>`;
        imageContainer.appendChild(img);
        console.log(highQuality);
    })();
}

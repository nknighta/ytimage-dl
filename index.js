function extractVideoId(url) {
    const pattern = /watch\?v=([a-zA-Z0-9_-]+)/;
    const match = url.match(pattern);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}

//console.log(videoId);

function displayImage() {
    var imageUrl = document.getElementById('imageUrl').value;
    const videoId = extractVideoId(imageUrl);
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // 既存の画像をクリア
    try {

        const img = document.createElement('img');
        img.src = "https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";
        img.alt = '画像';
        imageContainer.appendChild(img);
        img.style.width = '100%';
    } catch (e) {
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = ''; // 既存の画像をクリア

        const img = document.createElement('h2');
        img.textContent = 'URLが正しくありません';
    }
}
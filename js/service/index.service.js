'use strict'

const STORAGE_KEY_YT_DATA = 'yTDB'
const STORAGE_KEY_WIKI_DATA = 'wikiDB'

var gYT
var gWiki
const YT_KEY = 'AIzaSyDTiLagRkwHbsq3-gzGf0QmJihP9R-6DDg'

function getYTDataByValue(value = 'beatles') {
    return getYTData(value)
        .then(response => { return response.data.items })
        .then(response => saveToStorage(STORAGE_KEY_YT_DATA, response))
        .catch(() => console.error('Youtube API is not responding'))
}

function getWikiDataByValue(value = 'beatles') {
    return getWikiData(value)
        .then(response => { return response.data.query.search })
        .then(response => saveToStorage(STORAGE_KEY_WIKI_DATA, response))
        .catch(() => console.error('Wikipedia API is not responding'))
}

function getYTData(value) {
    console.log(`value:`, value)

    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`)
}

function getWikiData(value) {
    console.log(`value:`, value)

    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${value}&format=json`)
}

function getYTThumbanails(videos) {

    videos.forEach(video => {
        return axios.get(video.snippet.thumbnails.default.url)
    });
}

function saveYTToStorage(response) {
    return saveYTToStorage(STORAGE_KEY_YT_DATA, response.data.items)
}

function loadYTFromStorage() {
    return loadFromStorage(STORAGE_KEY_YT_DATA)
}

function loadWikiFromStorage() {
    return loadFromStorage(STORAGE_KEY_WIKI_DATA)
}
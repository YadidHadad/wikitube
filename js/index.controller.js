'use strict'

function onInit() {
    if (!loadYTFromStorage()) {
        getYTDataByValue()
            .then(() => renderYTLibrary())
            .catch(() => console.error('YouTube API is not responding'))
    } else {
        renderYTLibrary()
    }
    if (!loadWikiFromStorage()) {
        getWikiDataByValue()
            .then(() => renderWiki())
            .catch(() => console.error('Wikipedia API is not responding'))
    } else {
        renderWiki()
    }
}

function onSearch(ev) {
    ev.preventDefault()
    const searchValue = document.querySelector('.input.search').value
    console.log(`searchValue:`, searchValue)
    getYTDataByValue(searchValue)
        .then(() => renderYTLibrary())
        .catch(() => console.error('YouTube API is not responding'))
    getWikiDataByValue(searchValue)
        .then(() => renderWiki())
        .catch(() => console.error('Wikipedia API is not responding'))
}

function renderWiki() {
    document.querySelector('.wikipedia').innerHTML = ''

    loadWikiFromStorage().forEach(wikiValue => {
        document.querySelector('.wikipedia').innerHTML += `
            <div class="wiki-value">
                <a href="https://en.wikipedia.org/wiki/${wikiValue.title}" target="_blank" class="wikiTitle">${wikiValue.title}</a>
                <div class="wikiSnippet">${wikiValue.snippet}</div>
            </div>`
    });
}

function renderYTLibrary() {
    document.querySelector('.videos-library').innerHTML = ''
    const yTData = loadYTFromStorage()

    yTData.forEach(YTValue => {
        document.querySelector('.videos-library').innerHTML += `
            <div class="yt-option flex align-center" onclick="changePlayerSrc('https://youtube.com/embed/${YTValue.id.videoId}', this)">
                <div style="background-image: url(${YTValue.snippet.thumbnails.default.url})" alt="" class="img-yt-option"></div>
                <a >${YTValue.snippet.title}</a>
            </div>`
    });

    const src = `https://youtube.com/embed/${yTData[0].id.videoId}`
    changePlayerSrc(src)
    document.querySelector('.yt-option:first-child').classList.add('yt-option-active')

}

function changePlayerSrc(src, element = null) {
    document.querySelector('.video-player').src = src

    if (element) {
        const elements = document.querySelectorAll('.yt-option')
        console.log(`elements:`, elements)
        elements.forEach(element => {
            element.classList.remove('yt-option-active')
        })
        element.classList.add('yt-option-active')
    }
}
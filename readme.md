
# Portify

## Introduction

Like music? Like supporting the artists who make it? Then this app is for you! 

This app makes it easier for the music you discover on Spotify to become yours forever by providing you with links to buy it on Beatport and Bandcamp 🥰

[![Begin build status](https://buildstatus.begin.app/pie-lb1/status.svg)](https://begin.com)

### Project setup

```
npm install
npx arc env
```

### Start the local dev server

```
npm run dev
```

Navigate to [localhost:3333](http://localhost:3333)

## TO DO:
- [x] Link to album page from tracks
- [ ] Remove `/track/:id` endpoint
- [ ] Load tracks + audio for albums
- [ ] Mobile refinements (e.g. truncate long playlist titles in mobile headers)
- [ ] Scroll-to-load on paged content
- [ ] `use:onload` for fading in lazy-loaded images
- [ ] Investigate `content-visibility`
        - https://infrequently.org/2020/12/resize-resilient-deferred-rendering/
        - https://web.dev/content-visibility/
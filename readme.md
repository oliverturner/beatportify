
# Portify

## Introduction

Like music? Like supporting the artists who make it? If you said "hell yeah", then this app is for you! 

**Portify** 
- Helps the music you discover on Spotify to become yours to keep by providing you with links to buy it on Beatport and Bandcamp 🥰
- Shows you a track's musical key so you can see how DJ mixes are structured

[![Begin build status](https://buildstatus.begin.app/pie-lb1/status.svg)](https://begin.com)

### Project setup

```sh
npm install
npx arc env
```

### Start the local dev server

```sh
npm run dev
```

Navigate to [localhost:3333](http://localhost:3333)

## TO DO:

### UX
- [x] Link to album page from tracks
- [ ] Load tracks + audio for albums
- [ ] Truncate long titles in mobile headers
- [ ] Offer compact views of items
- [ ] Make page limits configurable
- [ ] Make tracks sortable via derived store
- [ ] Scroll-to-load on paged content
- [ ] Album: Use CSS counter to display track numbers against names

### Tech debt
- [ ] Remove `/track/:id` endpoint
- [ ] Relax `processTrack` requirements: Pick<{...required}>

### DX        
- [ ] Switch to Snowpack
- [ ] Use query params to drive paging

### Perfomance:
- [ ] Create a `use:onload` action for fading in lazy-loaded images
- [ ] Investigate `content-visibility`
        - https://infrequently.org/2020/12/resize-resilient-deferred-rendering/
        - https://web.dev/content-visibility/
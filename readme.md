
# Portify

## Introduction

Like music? Like supporting the artists who make it? If you said "hell yeah", then this app is for you! 

**Portify** 

- 🥰 Helps the music you discover on Spotify become yours to keep by providing you with links to buy it on Beatport and Bandcamp
- 🎧 Shows you a track's musical key so you can see how DJ mixes are structured

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
- [x] Load tracks + audio for albums
- [x] Fix missing playlists at boot
- [ ] Underline artist links
- [x] Truncate long titles in mobile headers
- [ ] TrackList: Offer compact views of items
- [ ] TrackList: Make sortable via derived store
- [ ] Paging: Make page limits configurable
- [ ] Paging: Scroll-to-load on paged content
- [ ] Album: Use CSS counter to display track numbers against names AND/OR create `albumIndex`?
- [ ] Album: Don't repeat cover image per track

#### Stretch
- [ ] Use Spotify Connect to highlight playing track

### Tech debt
- [ ] Remove `/track/:id` endpoint
- [ ] Relax `processTrack` requirements: Pick<{...required}>

### DX        
- [ ] Work out how to attach a debugger
- [ ] Switch to Snowpack
- [ ] Use query params to drive paging

### Perf:
- [ ] Create a `use:onload` action for fading in lazy-loaded images
- [ ] Investigate `content-visibility`
        - https://infrequently.org/2020/12/resize-resilient-deferred-rendering/
        - https://web.dev/content-visibility/

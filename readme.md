
# Portify

## Introduction

Like music? Like supporting the artists who make it? If you said "hell yeah", then this app is for you! 

**Portify** makes it easier for the music you discover on Spotify to become yours to keep by providing you with links to buy it on Beatport and Bandcamp 🥰

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
- [x] Link to album page from tracks
- [ ] Load tracks + audio for albums
- [ ] Remove `/track/:id` endpoint
- [ ] Mobile refinements
        - Truncate long titles in mobile headers
- [ ] Switch to Snowpack
- [ ] Use query params to drive paging
- [ ] Offer compact views of items
- [ ] Make page limits configurable
- [ ] Scroll-to-load on paged content
- [ ] Create a `use:onload` action for fading in lazy-loaded images
- [ ] Investigate `content-visibility`
        - https://infrequently.org/2020/12/resize-resilient-deferred-rendering/
        - https://web.dev/content-visibility/
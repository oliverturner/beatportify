<script>
  import { tick } from "svelte";
  import { fade } from "svelte/transition";

  import { pageTitle, contentTitle } from "../stores/ui";
  import { getSrcSet } from "../utils";
  import { intersectionObserver } from "../actions/intersection-observer";
  import TrackItem from "../components/track-item.svelte";
  import Loader from "../components/loader.svelte";

  /** @type {string} */
  export let id;

  /** @type {import("@typings/spotify").Artist} */
  let artist;

  /** @type {import("@typings/spotify").Track[]} */
  let tracks = [];

  /** @type {import("@typings/spotify").Album[]} */
  let albums = [];

  /** @type {import("@typings/spotify").Artist[]} */
  let related = [];

  /** @type {import("@typings/app").APIResponseArtists} */
  let response;

  /**
   * @param {string} artistId
   */
  async function loadArtist(artistId) {
    pageTitle.set("Artist");
    contentTitle.set("loading...");
    response = undefined;
    await tick();

    response = await (await fetch(`/api/artists/${artistId}`)).json();

    artist = response.artist;
    tracks = response.topTracks;
    albums = response.albums.items;
    related = response.relatedArtists.artists;

    contentTitle.set(artist.name);
  }

  /**
   * @param {Event} event
   */
  function onImageLoad(event) {
    /** @type {HTMLImageElement} */
    const el = event.target;
    el.classList.add("loaded");
  }

  $: loadArtist(id);
</script>

{#if response}
  <div class="artist" use:intersectionObserver in:fade out:fade>
    <section class="section">
      <h3 class="title section__title">Top 20 Tracks:</h3>
      <div class="section__content section__content--tracks">
        {#each tracks as item, index (item.id)}
          <TrackItem {item} />
        {/each}
      </div>
    </section>

    <section class="section">
      <h3 class="title section__title">Appears on:</h3>
      <div class="carousel">
        {#each albums as album, index (album.id)}
          <a class="tile" href="/album/{album.id}">
            <img
              class="thumbnail tile__thumbnail"
              class:loaded={false}
              data-srcset={getSrcSet(album.images)}
              data-src={`default ${album.images[1]?.url}`}
              src={album.images[2]?.url}
              alt={`Cover art for ${album.name}`}
              width="175px"
              height="175px"
              on:load|once={onImageLoad}
            />
            <span class="label">{album.name}</span>
          </a>
        {/each}
      </div>
    </section>

    <section class="section">
      <h3 class="title section__title">Related artists:</h3>
      <div class="section__content section__content--items">
        {#each related as artist (artist.id)}
          <a class="item" href={`/artist/${artist.id}`}>
            <img
              class="thumbnail item__thumbnail"
              class:loaded={false}
              data-srcset={getSrcSet(artist.images)}
              data-src={`default ${artist.images[1]?.url}`}
              src={artist.images[2]?.url}
              alt={`Cover art for ${artist.name}`}
              width="64px"
              height="64px"
              on:load|once={onImageLoad}
            />
            <span class="label">{artist.name}</span>
          </a>
        {/each}
      </div>
    </section>
  </div>
{:else}
  <Loader />
{/if}

<style lang="scss">
  .thumbnail {
    transition: opacity 0.5s;

    width: 100%;
    object-fit: cover;
    pointer-events: none;
    opacity: 0;

    &.loaded {
      opacity: 1;
    }
  }

  .artist {
    display: grid;
    gap: 1rem;

    overflow: hidden auto;
    padding: 1rem;
  }

  .section {
    display: grid;
    gap: 0.5rem;
  }

  .section__content {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(var(--item-w), 1fr));

    &.section__content--tracks {
      --item-w: 350px;
    }

    // &.section__content--tiles {
    //   --item-w: 175px;
    // }

    &.section__content--items {
      --item-w: 250px;
    }
  }

  .carousel {
    --carousel-item-w: 175px;
  }

  .tile,
  .item {
    background-color: var(--item-bg);
    color: var(--item-text);

    & > span {
      padding: 0.5rem;
    }
  }

  .tile {
    display: grid;
    align-content: start;

    overflow: hidden;
  }

  .item {
    display: flex;
    align-items: center;
  }

  .item__thumbnail {
    width: 64px;
  }
</style>

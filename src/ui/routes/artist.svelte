<script lang="ts">
  import { tick } from "svelte";
  import { fade } from "svelte/transition";

  import { pageTitle, contentTitle } from "../stores/ui";
  import { getSrcSet } from "../utils";
  import { intersectionObserver } from "../actions/intersection-observer";
  import TrackItem from "../components/track-item.svelte";

  import type { Album, Track, Artist } from "@typings/spotify";

  export let id: string;

  let artist: Artist;
  let tracks: Track[] = [];
  let albums: Album[] = [];
  let related: Artist[] = [];

  let response: {
    artist: Artist;
    topTracks: Track[];
    albums: { items: Album[] };
    relatedArtists: { artists: Artist[] };
  };

  async function loadArtist(artistId: string) {
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

  function onImageLoad(event: Event) {
    console.log({ onLoad: event });

    (event.target as HTMLImageElement).classList.add("loaded");
  }

  $: loadArtist(id);
</script>

{#if response}
  <div class="artist" use:intersectionObserver in:fade out:fade>
    <section>
      <h3 class="title">Top 20 Tracks:</h3>
      <div class="tracks">
        {#each tracks as item, index (item.id)}
          <TrackItem {item} />
        {/each}
      </div>
    </section>

    <section>
      <h3 class="title">Appears on:</h3>
      <div class="tiles">
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

    <section>
      <h3 class="title">Related artists:</h3>
      <div class="items">
        {#each related as artist, index (artist.id)}
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
  <div class="title loading">Loading</div>
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

  .loading {
    display: grid;
    place-content: center;
  }

  .artist {
    overflow: hidden auto;
    padding: 1rem;

    @media (--mq-medium) {
      padding: 0;
    }
  }

  .tracks {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;
  }

  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    gap: 1rem;
  }

  .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
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

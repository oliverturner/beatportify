<script>
  import { fade } from "svelte/transition";

  import { intersectionObserver } from "../actions/intersection-observer";
  import TrackItem from "./track-item.svelte";
  import Loader from "./loader.svelte";

  /** @typedef {import("@typings/app").Track} Track */

  /** @type {Track[]} */
  export let tracks = [];
  export let compact = false;
  export let album;

  /**
   * @param {string} d
   */
  function getDate(d) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-GB", options).format(new Date(d));
  }
</script>

<section class="tracklist" class:tracklist--footer={$$slots.footer}>
  {#if tracks?.length}
    <div
      class="tracklist__items"
      class:compact
      use:intersectionObserver
      in:fade={{ duration: 500 }}
    >
      {#if album}
        <header class="album">
          <img class="album__artwork" src={album.images[1].url} alt={`${album.name} cover image`} />
          <div class="album__info">
            <p>Track count: <span class="value">{album.total_tracks || tracks.length}</span></p>
            <p>Release date: <span class="value">{getDate(album.release_date)}</span></p>
          </div>
        </header>
      {/if}

      {#each tracks as item, index (item.id)}
        <TrackItem {item} {index} {compact} />
      {/each}
    </div>
  {:else}
    <Loader />
  {/if}

  <slot name="footer" />
</section>

<style lang="scss">
  .tracklist {
    display: grid;
    align-items: start;

    overflow: hidden;
    height: 100%;

    &.tracklist--footer {
      grid-template-rows: 1fr auto;
    }
  }

  .tracklist__items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;

    overflow: hidden auto;
    max-height: 100%;
    padding: 1rem;

    &.compact {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .album {
    grid-column: 1 / -1;

    display: flex;

    margin: -1rem;
    margin-bottom: 0;
    background-color: var(--item-bg);
    background-image: repeating-linear-gradient(
      315deg,
      transparent 0,
      transparent 10px,
      #000a 0,
      #000a 20px
    );
    color: var(--item-colour);

    @media (--mq-medium) {
      margin: 0;
    }
  }

  .album__artwork {
    --wh: 150px;

    width: var(--wh);
    height: var(--wh);
  }

  .album__info {
    margin-top: auto;
    padding: 1rem;

    & p {
      float: left;
      clear: both;
      margin: 0;
      padding: 0.5rem;
      font-size: 1rem;

      background: #000;
      color: #666;

      & + p {
        margin-top: -0.5rem;
      }
    }

    & .value {
      white-space: nowrap;
      color: var(--item-text);
    }
  }
</style>

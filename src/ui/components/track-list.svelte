<script lang="ts">
  import { fade } from "svelte/transition";

  import { intersectionObserver } from "../actions/intersection-observer";
  import TrackItem from "./track-item.svelte";

  import type { Track } from "@typings/app";

  export let tracks: Track[] = [];
  export let compact: boolean = false;
  export let album;

  function getDate(d: string) {
    console.log({ d });

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
    <div class="tracklist__items" class:compact in:fade use:intersectionObserver>
      {#if album}
        {@debug album}
        <header class="album">
          <img class="album__artwork" src={album.images[1].url} alt={`${album.name} cover image`} />
          <div class="album__info">
            <dl class="album__info__data">
              <dt>Track count:</dt>
              <dd>{album.total_tracks}</dd>
              <dt>Release date:</dt>
              <dd>{getDate(album.release_date)}</dd>
            </dl>
          </div>
        </header>
      {/if}

      {#each tracks as item, index (item.id)}
        <TrackItem {item} {index} {compact} />
      {/each}
    </div>
  {:else}
    <div class="tracklist__items" />
  {/if}

  <slot name="footer" />
</section>

<style lang="scss">
  .tracklist {
    display: grid;
    align-items: start;
    gap: 1rem;

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

    @media (--mq-medium) {
      padding: 1rem 0;
    }

    &.compact {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .album {
    grid-column: 1 / 3;

    display: flex;

    background: var(--item-bg);
    color: var(--item-colour);
  }

  .album__artwork {
    --wh: 150px;

    width: var(--wh);
    height: var(--wh);
  }

  .album__info {
    display: grid;
    align-items: end;

    padding: 1rem;
  }

  .album__info__data {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;

    margin: 0;

    & dd {
      margin: 0;
    }
  }
</style>

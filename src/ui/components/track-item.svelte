<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { link } from "svelte-routing";

  import type * as SpotifyApi from "@typings/spotify";
  import type { Track } from "@typings/app";

  export let item: Track;
  export let index: number = 0;

  let artists: string;
  let searchTerm: string;
  let purchaseLinks: Record<string, string>;

  function getArtists(artists: SpotifyApi.Artist[] = []) {
    return artists.map((a) => a.name);
  }

  function getSrcSet(images) {
    return images.map(({ url, width }) => `${url} ${width}w`).join(", ");
  }

  async function onTrackClick(event) {
    try {
      const res = await (await fetch(event.target.href)).json();
      if (res.error) {
        // TODO notify user that a Spotify device must be available
        throw new Error(res.error.message);
      }

      // TODO notify user that track is loading
      // console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  }

  if (item) {
    artists = getArtists(item.artists).join(", ");
    searchTerm = `${artists} - ${item.name}`;
    purchaseLinks = {
      beatport: `https://www.beatport.com/search?q=${searchTerm.split(" ").join("+")}`,
      bandcamp: `https://bandcamp.com/search?q=${encodeURIComponent(searchTerm)}`,
    };
  }
</script>

<!-- 
// TODO: create use:containerQuery action: 
// https://philipwalton.com/articles/responsive-components-a-solution-to-the-container-queries-problem/
// https://css-tricks.com/the-raven-technique-one-step-closer-to-container-queries/
-->

{#if item}
  <article
    class="item"
    style={`--key: var(--key${item.audio.key});`}
    in:fade={{ delay: index * 100 }}
    out:fly
  >
    <a
      class="item__play"
      href={`/api/play/${item.id}`}
      on:click|stopPropagation|preventDefault={onTrackClick}>
      <img
        srcset={getSrcSet(item.album.images)}
        src={`default ${item.album.images[1]?.url}`}
        alt={`Cover art for ${item.album.name}`}
        width="300"
        height="300"
      />
    </a>
    <div class="item__label">
      <h3 class="title">
        <a href="/track/{item.id}" use:link>{item.name}</a>
      </h3>
      <p class="artists">
        {#each item.artists as artist}
          <a class="artistlink" href="/artist/{artist.id}" use:link>{artist.name}</a>
        {/each}
      </p>
    </div>
    <div class="item__audio">
      <p class="item__audio__pitch">Key: {item.audio.pitch}</p>
      <p class="item__audio__bpm">BPM: {item.audio.bpm}</p>
      <!-- <p><a href={item.audio.analysisUrl}>Analysis</a></p> -->
    </div>
    <aside class="item__purchases">
      <a
        class="purchaselink purchaselink--beatport"
        href={purchaseLinks.beatport}
        aria-label="Find on Beatport">
        <svg class="icon" aria-hidden="true">
          <use href="#icon-beatport" />
        </svg>
      </a>

      <a class="purchaselink" href={purchaseLinks.bandcamp} aria-label="Find on Bandcamp">
        <svg class="icon" aria-hidden="true">
          <use href="#icon-bandcamp" />
        </svg>
      </a>
    </aside>
  </article>
{/if}

<style lang="scss">
  .item {
    --icon-wh: 32px;

    display: grid;
    grid-template-columns: 150px 1fr auto;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      "a b b"
      "a c d";
    gap: 0.5rem 1rem;

    position: relative;
    background: var(--item-bg);
    color: var(--item-text);

    & img {
      display: block;
      max-width: 100%;
      height: 100%;
      min-width: 150px;
      min-height: 150px;
      object-fit: cover;
      pointer-events: none;
    }
  }

  .item__play {
    grid-area: a;

    overflow: hidden;
    background: #333;
  }

  .item__label,
  .item__audio {
    padding: 0.5rem 0;
  }

  .item__label {
    grid-area: b;
  }

  .title {
    margin: 0;
    font-size: 0.8rem;
    color: var(--item-title);
  }

  .artists {
    margin-top: 0.5rem;
  }

  .item__audio {
    grid-area: c;

    display: grid;
    grid-auto-flow: column;
    align-content: end;
    gap: 0.5rem;

    & p {
      margin: 0;
    }
  }

  .item__audio__pitch {
    padding-left: 5px;
    border-left: 1rem solid var(--key);
  }

  .item__purchases {
    grid-area: d;

    display: grid;
    grid-auto-flow: column;
    place-content: end;
    gap: 0.5rem;

    padding: 0.5rem;
  }

  .purchaselink {
    width: var(--icon-wh);
    height: var(--icon-wh);
  }

  .artistlink {
    display: inline-block;
    margin-right: 4px;
    color: inherit;

    &::after {
      content: ",";
    }

    &:last-child::after {
      content: "";
    }
  }
</style>

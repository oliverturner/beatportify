<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { link } from "svelte-routing";
  import { toast } from "@zerodevx/svelte-toast";

  import { getSrcSet } from "../utils";

  import type * as Spotify from "@typings/spotify";
  import type { Track } from "@typings/app";

  export let item: Track;
  export let index: number;
  export let compact: boolean = false;

  let artists: string;
  let searchTerm: string;
  let purchaseLinks: Record<string, string>;

  function getArtists(artists: Spotify.Artist[] = []) {
    return artists.map((a) => a.name);
  }

  async function onTrackClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    try {
      const url = (event.target as HTMLAnchorElement).href;
      const res = await (await fetch(url)).json();

      if (res.error) {
        if (String(res.error.status) === "404") {
          throw new Error("Spotify needs to be playing to load tracks via Connect");
        }

        throw new Error(res.error.message);
      }

      toast.push(`Playing "${item.name}" via Spotify Connect`);
    } catch (error) {
      console.log({ error });
      toast.push(error.message);
    }
  }

  function onImageLoad(event: Event) {
    (event.target as HTMLImageElement).classList.add("loaded");
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
  <article class="item" class:compact style={`--key: var(--key${item.audio.key});`}>
    {#if compact}
      <!-- show play btn -->
      <!-- use oswald font? -->
      <a class="item__index" href={`/api/play/${item.id}`} on:click={onTrackClick}>
        {index + 1}
      </a>
    {:else}
      <a class="item__play" href={`/api/play/${item.id}`} on:click={onTrackClick}>
        <img
          class="item__thumbnail"
          class:loaded={false}
          data-srcset={getSrcSet(item.album.images)}
          data-src={`default ${item.album.images[1]?.url}`}
          src={item.album.images[2]?.url}
          alt={`Cover art for ${item.album.name}`}
          width="300"
          height="300"
          on:load|once={onImageLoad}
        />
      </a>
    {/if}
    <div class="item__label">
      <h3 class="title">
        <a href="/album/{item.album.id}" use:link>{item.name}</a>
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
      <!-- display in info popover? -->
      <!-- <p><a href={item.audio.analysisUrl}>Analysis</a></p> -->
    </div>
    <aside class="item__purchases">
      <a
        class="purchaselink purchaselink--beatport"
        href={purchaseLinks.beatport}
        aria-label="Find on Beatport">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-beatport" />
        </svg>
      </a>

      <a class="purchaselink" href={purchaseLinks.bandcamp} aria-label="Find on Bandcamp">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bandcamp" />sa
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

    position: relative;
    background: var(--item-bg);
    color: var(--item-text);

    &.compact {
      grid-template-columns: 2rem 1fr auto;
    }
  }

  .item__index {
    grid-area: a;

    display: grid;
    place-content: center;
    background: #000;
  }

  .item__play {
    grid-area: a;

    overflow: hidden;
    background: #333;
  }

  .item__thumbnail {
    --wh: 150px;

    transition: opacity 0.5s;

    display: block;
    max-width: 100%;
    height: 100%;
    min-width: var(--wh);
    min-height: var(--wh);
    object-fit: cover;
    pointer-events: none;
    opacity: 0;

    &.loaded {
      opacity: 1;
    }
  }

  .item__label,
  .item__audio {
    padding: 0.5rem;
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

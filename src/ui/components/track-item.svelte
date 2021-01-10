<script lang="ts">
  import { link } from "svelte-routing";

  // import type SpotifyApi from "spotify-api"

  export let track: SpotifyApi.TrackObjectFull;

  function getArtists(artists: SpotifyApi.ArtistObjectSimplified[] = []) {
    return artists.map((a) => a.name);
  }

  async function onTrackClick(event) {
    const { href } = event.target;

    try {
      const res = await (await fetch(href)).json();
      if (res.error) {
        // TODO notify user that a Spotify device must be available
        console.log(res.error.message);
        return;
      }

      // TODO notify user that track is loading
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  }

  let artists = getArtists(track.artists).join(", ");
  let searchTerm = `${artists} - ${track.name}`.split(" ").join("+");
  let purchaseLink = `https://www.beatport.com/search?q=${searchTerm}`;
</script>

<style lang="scss">
  .item {
    position: relative;

    & img {
      display: block;
      width: 100%;
      height: 100%;
      min-width: 150px;
      min-height: 150px;
      object-fit: cover;
    }
  }

  .item__play {
    &::before {
      content: "";
      position: absolute;
      inset: 0 0 0 0;
      background: transparent;
    }
  }

  .item__label {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    font-size: 11px;
    background: #000a;
    color: #ccc;

    & span {
      display: block;

      & + span {
        margin-top: 0.5rem;
      }
    }
  }

  .item__purchase {
    --wh: 32px;

    position: absolute;
    inset: 5px 5px auto auto;
    width: var(--wh);
    height: var(--wh);

    padding: 5px;
    border-radius: 3px;
    fill: #94d500;
    background: #262626;
  }

  .artistlink,
  .tracklink {
    color: inherit;
  }

  .artistlink {
    display: inline-block;
    margin-right: 4px;

    &::after {
      content: ",";
    }

    &:last-child::after {
      content: "";
    }
  }

  .tracklink {
    font-style: italic;
  }
</style>

{#if track.id}
  <div class="item">
    <a
      class="item__play"
      href={`/api/play/${track.id}`}
      on:click|self|stopPropagation|preventDefault={onTrackClick}>
      <img src={track.album.images[1]?.url} alt={`Cover art for ${track.album.name}`} />
    </a>
    <p class="item__label">
      <span class="artists">
        {#each track.artists as artist}
          <a class="artistlink" href="/artist/{artist.id}" use:link>{artist.name}</a>
        {/each}
      </span>
      <span><a class="tracklink" href="/track/{track.id}" use:link>{track.name}</a></span>
    </p>
    <a class="item__purchase" href={purchaseLink} aria-label="Find on Beatport">
      <svg class="icon" aria-hidden="true">
        <use href="#icon-beatport" />
      </svg>
    </a>
  </div>
{/if}

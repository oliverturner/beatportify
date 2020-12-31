<script lang="ts">
  import { onMount } from "svelte";

  let artists: SpotifyApi.ArtistObjectFull[] = [];
  let tracks: SpotifyApi.TrackObjectFull[] = [];

  async function onTrackClick(event) {
    event.preventDefault();

    const { href } = event.target;

    try {
      const res = fetch(href);
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  }

  async function onArtistClick(event) {
    event.preventDefault();

    const { href } = event.target;
  }

  function getArtists(artists: SpotifyApi.ArtistObjectSimplified[]) {
    return artists.map((a) => a.name).join(", ");
  }

  onMount(async () => {
    try {
      const data = await (await fetch("/api/top")).json();
      artists = data.artists.items;
      tracks = data.tracks.items;

      console.log({ artists });
      console.log({ tracks });
    } catch (error) {
      console.log({ error });
    }
  });
</script>

<style lang="scss">
  .columns {
    display: flex;
  }

  .column {
    flex: 1;
  }
  .items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .item {
    position: relative;
    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item__label {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0.5rem;
    font-size: 11px;
    background: #000a;
    color: #ccc;

    & span {
      display: block;
    }
  }
</style>

<div class="columns">
  <!-- <div class="column items" on:click={onArtistClick}>
    {#each artists as artist}
      <a href={`/api/artist/${artist.id}`} class="track"> {artist.name} </a>
      <p>{artist.name}</p>
    {/each}
  </div> -->
  <div class="column items" on:click={onTrackClick}>
    {#each tracks as track}
      <a href={`/api/play/${track.id}`} class="item">
        <img src={track.album.images[1].url} alt={`Cover art for ${track.album.name}`} />
        <div class="item__label">
          <span>{getArtists(track.artists)}:</span>
          <span>{track.name}</span>
        </div>
      </a>
    {/each}
  </div>
</div>

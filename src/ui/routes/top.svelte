<script lang="ts">
  import { onMount } from "svelte";

  import TrackItem from "../components/track-item.svelte";

  export let location = {};

  let artists: SpotifyApi.ArtistObjectFull[] = [];
  let tracks: SpotifyApi.TrackObjectFull[] = [];

  onMount(async () => {
    try {
      const data = await (await fetch("/api/top")).json();
      artists = data.artists.items;
      tracks = data.tracks.items;

      console.log({ artists });
      console.log({ tracks });
      console.log({ location });
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
</style>

<div class="columns">
  <!-- <div class="column items" on:click={onArtistClick}>
    {#each artists as artist}
      <a href={`/api/artist/${artist.id}`} class="track"> {artist.name} </a>
      <p>{artist.name}</p>
    {/each}
  </div> -->
  <div class="column">
    <h2>Top Tracks</h2>
    <div class="items">
      {#each tracks as track}
        <TrackItem {track} />
      {/each}
    </div>
  </div>
</div>

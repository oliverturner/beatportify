<script lang="ts">
  import { onMount } from "svelte";

  import TrackItem from "../components/TrackItem.svelte";

  let artists: SpotifyApi.ArtistObjectFull[] = [];
  let tracks: SpotifyApi.TrackObjectFull[] = [];

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
    place-content: center;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
</style>

<div class="columns">
  <!-- <div class="column items" on:click={onArtistClick}>
    {#each artists as artist}
      <a href={`/api/artist/${artist.id}`} class="track"> {artist.name} </a>
      <p>{artist.name}</p>
    {/each}
  </div> -->
  <div class="column items">
    {#each tracks as track}
      <TrackItem {track} />
    {/each}
  </div>
</div>

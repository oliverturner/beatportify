<script>
  import { onMount } from "svelte";

  let artists = [];
  let tracks = [];

  onMount(async () => {
    try {
      const data = await (await fetch("/api/top")).json();
      artists = data.artists.items;
      tracks = data.tracks.items;

      console.log({ artists });
    } catch (error) {
      console.log({ error });
    }
  });
</script>

<style>
  .columns {
    display: flex;
  }
</style>

<div class="columns">
  <div class="column">
    {#each artists as artist}
      <p>{artist.name}</p>
    {/each}
  </div>
  <div class="column">
    {#each tracks as track}
      <p>{track.name}</p>
    {/each}
  </div>
</div>

<script>
  import { onMount } from "svelte";

  let artists = [];
  let tracks = [];

  async function onTrackClick(event) {
    event.preventDefault();

    const { href } = event.target;

    console.log({ href });

    try {
      const res = fetch(href);

      if (res.ok === false) {
        console.log({ res });
        throw new Error("oops");
      }
    } catch (error) {
      console.log({ error });
    }
  }

  function getArtists(artists) {
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
    & a {
      display: block;
    }
  }
</style>

<div class="columns">
  <div class="column">
    {#each artists as artist}
      <p>{artist.name}</p>
    {/each}
  </div>
  <div class="column" on:click={onTrackClick}>
    {#each tracks as track}
      <a href={`/api/play/${track.id}`}>{getArtists(track.artists)}:
        {track.name}
      </a>
    {/each}
  </div>
</div>

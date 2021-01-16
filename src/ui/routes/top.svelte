<script lang="ts">
  import { onMount } from "svelte";

  import TrackItem from "../components/track-item.svelte";
  import type { Track } from "@typings/app";

  let tracks: Track[] = [];

  onMount(async () => {
    try {
      const data = await (await fetch("/api/top")).json();
      tracks = data.tracks;

      console.log({ data, tracks });
    } catch (error) {
      console.log({ error });
    }
  });
</script>

<div class="columns">
  <div class="column">
    <h2>Top Tracks</h2>
    <div class="items">
      {#each tracks as item, index (item.id)}
        <TrackItem {item} {index} />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .columns {
    display: flex;
  }

  .column {
    flex: 1;
  }
</style>

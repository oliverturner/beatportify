<script lang="ts">
  import { onMount } from "svelte";

  import TrackList from "../components/track-list.svelte";

  import type { Track } from "@typings/app";

  export let location: Location;
  let tracks: Track[] = [];

  onMount(async () => {
    try {
      console.log({ location });

      const data = await (await fetch("/api/top")).json();
      tracks = data.tracks;

      console.log({ data, tracks });
    } catch (error) {
      console.log({ error });
    }
  });
</script>

<TrackList title="Top Tracks" {tracks} />

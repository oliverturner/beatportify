<script lang="ts">
  import { onMount } from "svelte";

  import { ui } from "../stores/ui";
  import TrackList from "../components/track-list.svelte";

  import type { Track } from "@typings/app";

  export const location: Location = null;
  let tracks: Track[] = [];

  ui.update((props) => ({ ...props, title: "Top tracks" }));

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

<TrackList {tracks} />

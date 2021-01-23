<script lang="ts">
  import { onMount } from "svelte";

  import { contentTitle, pageTitle } from "../stores/ui";
  import TrackList from "../components/track-list.svelte";

  import type { Track } from "@typings/app";

  export const location: Location = null;
  let tracks: Track[] = [];

  pageTitle.set("Top tracks");

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

<TrackList {tracks}>
  <!-- 
  <div class="content__header" slot="header">
    <div class="controls">
      <p>time</p>
      <p>limit</p>
    </div>
  </div>
   -->
</TrackList>

<style lang="scss">
  // .controls {
  //   display: flex;
  //   justify-content: flex-end;
  //   gap: 1rem;
  //   bottom: pink;

  //   & > p {
  //     margin: 0;
  //   }
  // }
</style>

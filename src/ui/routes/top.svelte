<script>
  import { onMount } from "svelte";

  import { contentTitle, pageTitle } from "../stores/ui";
  import TrackList from "../components/track-list.svelte";
  import Loader from "../components/loader.svelte";

  /** @type {Location} */
  export const location = null;

  /** @type {import("@typings/app").Track[]} */
  let tracks;

  // TODO: set pageTitle / contentTitle at App level
  pageTitle.set("");
  contentTitle.set("Top tracks");

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

{#if tracks}
  <TrackList {tracks} />
{:else}
  <div class="grid">
    <Loader />
  </div>
{/if}

<script lang="ts">
  import { pageTitle, contentTitle } from "../stores/ui";
  import TrackList from "../components/track-list.svelte";

  import type { Track } from "@typings/app";

  export let id: string;

  let tracks: Track[] = [];

  async function loadArtist(artistId: string) {
    const response = await (await fetch(`/api/artists/${artistId}`)).json();

    pageTitle.set("Artist");
    contentTitle.set(response.artist.name);

    // TODO: display artist image & other data

    tracks = response.topTracks;
  }

  $: loadArtist(id);
</script>

<TrackList {tracks} />

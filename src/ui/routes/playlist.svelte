<script lang="ts">
  import { tracks, playlistDict } from "../stores/tracks";
  import TrackList from "../components/track-list.svelte";

  import type * as Portify from "@typings/app";
  import type * as SpotifyApi from "@typings/spotify";

  export let id: string;
  let title = "";

  async function loadTracks(playlistId) {
    tracks.set([]);

    try {
      const newTracks: SpotifyApi.PagingObject<Portify.Track> = await (
        await fetch(`/api/playlists/${playlistId}`)
      ).json();

      tracks.set(newTracks.items);
      title = `Playlist: ${$playlistDict[playlistId].name}`;
    } catch (error) {
      console.log({ error });
    }
  }

  $: loadTracks(id);
</script>

<TrackList {title} tracks={$tracks} />

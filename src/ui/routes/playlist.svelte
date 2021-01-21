<script lang="ts">
  import { ui } from "../stores/ui";
  import { tracks, playlistDict } from "../stores/tracks";
  import { getDefaultPage } from "../utils";
  import TrackList from "../components/track-list.svelte";
  import Pagelinks from "../components/pagelinks.svelte";

  import type { Playlist } from "@typings/spotify";

  export let id: string;
  export const location: Location = null;

  const limit = 24;

  let makeLink = (_offset: number) => "";
  let loadPage = (_offset: number) => {};
  let page = getDefaultPage({ limit });

  async function loadTracks(playlist: Playlist) {
    if (!playlist) return;

    tracks.set([]);
    ui.update((props) => ({ ...props, title: `Playlist: ${playlist.name}` }));

    makeLink = (offset: number) => `/api/playlists/${id}?offset=${offset * limit}&limit=${limit}`;

    loadPage = async (offset) => {
      page = await (await fetch(makeLink(offset))).json();
      tracks.set(page.items);
    };

    loadPage(0);
  }

  $: loadTracks($playlistDict[id]);
</script>

<TrackList tracks={$tracks}>
  <div class="content__footer" slot="footer">
    <p>pages:</p>
    <Pagelinks {page} {makeLink} {loadPage} />
  </div>
</TrackList>

<style lang="scss">
  .content__footer > p {
    margin: 0 4px 0 auto;
    line-height: var(--s6);
  }
</style>

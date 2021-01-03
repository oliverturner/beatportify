<script lang="ts">
  import { onMount } from "svelte";

  const limit = 20;

  let total = limit;
  let pageCurrent = 1;
  let pageTotal = 0;
  let pageLinks = [];
  let items: SpotifyApi.PlaylistObjectFull[] = [];

  const makeLink = (offset: number) => `/api/playlists?offset=${offset}&limit=${limit}`;

  onMount(async () => {
    try {
      const offset = pageCurrent * limit;

      if (offset < total) return;

      const res = await fetch(`/api/playlists?offset=${offset}&limit=${limit}`);
      const playlists: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull> = await res.json();

      items = playlists.items;
      total = playlists.total;
      pageTotal = Math.ceil(total / limit);
      pageLinks = Array.from({ length: pageTotal }, (_, index) => index).map(makeLink);

      console.log({ playlists });
    } catch (error) {
      console.log({ error });
    }
  });
</script>

<style lang="scss">
  .sidebar {
    display: grid;
    gap: 1rem;

    overflow-y: auto;
    padding: 1rem;
  }

  .sidebar__items {
    display: grid;
    gap: 0.5rem;
  }

  .sidebar__controls {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, var(--s4));

    margin-top: auto;
    padding: var(--s4) 0 0;
    border-top: 1px solid currentColor;
  }

  .sidebar__control {
    --wh: var(--s4);
    --wh05: var(--s2);
    
    overflow: hidden;
    position: relative;
    width: var(--wh);
    height: var(--wh);

    &::before,
    &::after {
      content: "";
      display: block;
    }
    &::before {
      width: var(--wh);
      height: var(--wh);
      border-radius: var(--wh);
      background:  #333;
    }

    &::after {
      position: absolute;
      left: 50%;
      top: 50%;
      width: var(--wh05);
      height: var(--wh05);
      transform: translate(-50%, -50%);
      border-radius: var(--wh05);
      background: white;
    }
  }
</style>

<nav class="sidebar">
  {#if items.length}
    <div class="sidebar__items">
      {#each items as playlist}
        <a class="playlist__link" href="/playlist?playlistId={playlist.id}">{playlist.name}</a>
      {/each}
    </div>

    <div class="sidebar__controls">
      {#each pageLinks as href, index}<a class="sidebar__control" {href}>Page {index + 1}</a>{/each}
    </div>
  {:else}
    <p>...loading</p>
  {/if}
</nav>

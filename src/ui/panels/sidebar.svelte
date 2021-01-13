<script lang="ts">
  import { onMount } from "svelte";
  import { link } from "svelte-routing";

  const limit = 20;

  let total = limit;
  let pageTotal = 0;
  let pageLinks = [];
  let items: SpotifyApi.PlaylistObjectFull[] = [];

  const makeLink = (offset: number) => `/api/playlists?offset=${offset}&limit=${limit}`;

  const loadPage = async (pageCurrent: number = 0) => {
    try {
      const offset = pageCurrent * limit;

      if (offset > total) return;

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
  };

  onMount(loadPage);
</script>

<style lang="scss">
  .sidebar {
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: flex-start;
    gap: 1rem;

    overflow: hidden;
    padding: 1rem;
  }

  .sidebar__items {
    display: grid;
    gap: var(--s1);

    overflow-y: auto;
    max-height: 100%;
  }

  .sidebar__item {
    padding: var(--s2) 0;
  }

  .sidebar__controls {
    display: flex;
    gap: 1rem;

    padding: var(--s4) 0 0;
    border-top: 1px solid currentColor;
  }

  .controls__label {
    margin: 0;
  }

  .controls__links {
    flex: 1;

    display: grid;
    grid-template-columns: repeat(auto-fill, var(--s4));
    gap: 0.5rem;
  }

  .link {
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
      background: #333;
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
  {#if items?.length}
    <div class="sidebar__items">
      {#each items as playlist}
        <a class="sidebar__item" href="/playlist/{playlist.id}" use:link>{playlist.name}</a>
      {/each}
    </div>

    <div class="sidebar__controls">
      <p class="controls__label">pages:</p>
      <div class="controls__links">
        {#each pageLinks as href, index}
          <a
            class="link"
            {href}
            on:click|preventDefault|stopPropagation={() => loadPage(index)}>Page
            {index + 1}</a>
        {/each}
      </div>
    </div>
  {:else}
    <p>...loading</p>
  {/if}
</nav>

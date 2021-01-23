<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { link } from "svelte-routing";

  import { getDefaultPage } from "../utils";
  import { playlists } from "../stores/tracks";
  import { menuOpen } from "stores/ui";
  import Pagelinks from "../components/pagelinks.svelte";

  import type { Playlist } from "@typings/spotify";

  const limit = 15;
  const makeLink = (offset: number) => `/api/playlists?offset=${offset * limit}&limit=${limit}`;

  let pageRes: Promise<void>;
  let page = getDefaultPage<Playlist>({ limit });

  async function loadPage(offset: number) {
    try {
      return fetch(makeLink(offset)).then(async (res) => {
        page = await res.json();
        playlists.set(page.items);
      });
    } catch (error) {
      console.log({ error });
    }
  }

  onMount(() => {
    pageRes = loadPage(0);
  });

  $: console.log({ $menuOpen });
</script>

<nav class="sidebar" class:active={$menuOpen}>
  <div class="sidebar__items">
    {#await pageRes}
      <div class="loading">loading</div>
    {:then}
      {#each $playlists as playlist, index (playlist.id)}
        <a
          class="sidebar__item"
          href="/playlist/{playlist.id}"
          use:link
          in:fade={{ delay: 1000 + index * 50 }}
          out:fly={{ delay: index * 25 }}>
          <span>{playlist.name}</span>
        </a>
      {/each}
    {/await}
  </div>

  <div class="sidebar__controls">
    <p class="controls__label">pages:</p>
    <div class="controls__links">
      <Pagelinks {page} {makeLink} {loadPage} />
    </div>
  </div>
</nav>

<style lang="scss">
  .sidebar {
    --sidebar-x: -100vw;

    display: grid;
    grid-template-rows: 1fr auto;
    align-items: flex-start;

    transition: transform 0.5s;

    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100%;
    transform: translate3d(var(--sidebar-x), 0, 0);
    background: var(--app-bg);

    &.active {
      --sidebar-x: 0;
    }

    @media (--mq-medium) {
      --sidebar-x: 0;
      position: static;
      width: unset;
    }
  }

  .loading {
    justify-self: center;
    align-self: center;
  }

  .sidebar__items {
    display: grid;
    gap: var(--s1);

    overflow-y: auto;
    max-height: 100%;
    padding: 1rem;
    color: #333;
  }

  .sidebar__item {
    padding: var(--s2);
    background: var(--item-bg);
    color: var(--item-text);
  }

  .sidebar__controls {
    --wh: var(--s6);

    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;

    padding: var(--s4);
    border-top: 1px solid var(--border);
  }

  .controls__label {
    margin: 0;
    line-height: var(--wh);
  }

  .controls__links {
    flex: 1;
  }
</style>

<script lang="ts">
  import { links } from "svelte-routing";

  import { pageTitle, contentTitle, menuOpen } from "../stores/ui";

  export let user;

  const routes = [];

  function toggleMenu() {
    menuOpen.set(!$menuOpen);
  }

  $: console.log({ user });
</script>

<nav class="nav">
  <a href="/" use:links>
    <h2 class="title title--app">Portify</h2>
  </a>

  <h3 class="title title--content">
    <span class="title__page">{$pageTitle}:</span>
    {$contentTitle}
  </h3>

  <div class="user">
    {#if user}
      <button class="title btn btn--menu" on:click={toggleMenu}>menu</button>
      <form action="/logout" method="post">
        <button class="title btn">log out</button>
      </form>
    {/if}
  </div>
</nav>

<style lang="scss">
  .nav {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;

    padding: 0.5rem;

    @media (--mq-medium) {
      grid-template-columns: 250px 1fr auto;
    }
  }

  .title {
    margin: 0;
  }

  .title--app,
  .title--content {
    line-height: 1.2rem;
  }

  .title--app {
    padding: 0 0.5rem;
  }

  .title--content {
    color: var(--key2);
  }

  .title__page {
    display: none;

    @media (--mq-medium) {
      display: unset;
      background: var(--app-bg);
      color: var(--app-colour);
    }
  }

  .user {
    display: flex;
    margin-left: auto;
    color: #333;

    & > * + * {
      margin-left: 0.25rem;
    }
  }

  .btn {
    --bg: var(--app-bg);
    --text: var(--app-colour);

    transition: background-color 0.25s, border-color 0.25s;

    font-size: 0.7rem;
    border: 1px solid var(--border);
    background-color: var(--bg);
    color: var(--text);

    &:enter {
      --border: var(--item-bg);
      --bg: var(--item-bg);
    }
  }

  .btn--menu {
    @media (--mq-medium) {
      display: none;
    }
  }
</style>

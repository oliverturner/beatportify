<script>
  import { links } from "svelte-routing";

  import { pageTitle, contentTitle, menuOpen } from "../stores/ui";

  export let user;

  // const routes = [];

  function toggleMenu() {
    menuOpen.set(!$menuOpen);
  }

  $: console.log({ user });
</script>

<nav class="title nav">
  <a class="nav__item nav__item--logo" href="/" use:links>
    <h1>Portify</h1>
  </a>

  <h2 class="nav__item nav__item--labels">
    {#if $pageTitle?.length}
      <span class="label--page">{$pageTitle}:</span>
    {/if}
    <span class="label--content">{$contentTitle}</span>
  </h2>

  <div class="nav__item nav__item--controls">
    {#if user}
      <button class="btn btn--menu" on:click={toggleMenu}>menu</button>
      <form action="/logout" method="post">
        <button class="btn">log out</button>
      </form>
    {/if}
  </div>
</nav>

<style lang="scss">
  .nav {
    display: grid;
    grid-template-columns: auto 1fr auto;

    font-size: 1rem;
    line-height: 1;

    & h1,
    & h2 {
      margin: 0;
      font: inherit;
      letter-spacing: 1.6px;
    }

    @media (--mq-medium) {
      grid-template-columns: 250px 1fr auto;
    }
  }

  .nav__item {
    display: flex;

    padding: 0.5rem;
  }

  .nav__item--logo {
    align-items: center;

    background-color: var(--item-bg);
    color: #fff;
  }

  .nav__item--controls {
    display: flex;
    padding: 0;

    & form {
      display: contents;
    }
  }

  .label--page {
    display: none;
    padding-right: 4px;

    @media (--mq-medium) {
      display: unset;
      background: var(--app-bg);
      color: var(--app-colour);
    }
  }

  .label--content {    
    max-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;

    color: var(--key2);
  }

  .btn {
    font-size: 0.8rem;
    border-left: 1px solid var(--border);
    background: var(--app-bg);
    color: var(--app-colour);
  }

  .btn--menu {
    @media (--mq-medium) {
      display: none;
    }
  }
</style>

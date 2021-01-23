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
  <div class="logo">
    <a href="/" use:links><h2 class="title title--app">Portify</h2></a>
  </div>

  <h3 class="title">
    <span class="title__page">{$pageTitle}:</span>
    <span class="title__content">{$contentTitle}</span>
  </h3>

  <div class="user">
    {#if user}
      <button class="togglebtn" on:click={toggleMenu}>menu</button>
      <form action="/logout" method="post"><button class="btn">log out</button></form>
    {/if}
  </div>
</nav>

<style lang="scss">
  .nav {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;

    padding: 0.5rem 0;
    line-height: 1;

    @media (--mq-medium) {
      grid-template-columns: 250px 1fr auto;
    }
  }

  .title {
    margin: 0;
  }

  .title__page {
    display: none;

    @media (--mq-medium) {
      display: unset;
    }
  }

  .title--app {
    padding: 0 0.5rem;
  }

  .user {
    display: flex;
    margin-left: auto;
    color: #333;

    & > * + * {
      margin-left: 0.25rem;
    }
  }

  .togglebtn {
    @media (--mq-medium) {
      display: none;
    }
  }
</style>

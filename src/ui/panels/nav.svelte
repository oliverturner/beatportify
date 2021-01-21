<script lang="ts">
  import { links } from "svelte-routing";

  import { ui } from "../stores/ui";

  export let user;

  const routes = [];

  $: title = `Portify: ${$ui.title}`;
</script>

<nav class="nav">
  <a href="/" use:links><h2 class="title">{title}</h2></a>
  <div class="row nav__controls">
    {#each routes as route}<a href={route.path} use:links>{route.label}</a>{/each}
  </div>

  {#if user}
    <div class="nav__user">
      <form action="/logout" method="post"><button class="btn">log out</button></form>
    </div>
  {/if}
</nav>

<style>
  .nav {
    display: flex;
    align-items: center;

    padding: 0.5rem;
  }

  .title {
    margin: 0;
  }

  .row {
    display: flex;
  }

  .nav__controls {
    gap: 1rem;
  }

  .nav__user {
    margin-left: auto;
    color: #333;
  }
</style>

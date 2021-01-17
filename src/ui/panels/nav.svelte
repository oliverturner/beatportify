<script lang="ts">
  import { links } from "svelte-routing";

  export let user;

  const routes = [{ label: "Home", path: "/" }];
</script>

<nav class="nav">
  <h2 class="title">Portify</h2>
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

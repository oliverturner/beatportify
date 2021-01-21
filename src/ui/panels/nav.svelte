<script lang="ts">
  import { links } from "svelte-routing";

  import { ui } from "../stores/ui";

  export let user;

  const routes = [];

  $: title = $ui.title;
  $: console.log({ user });
</script>

<nav class="nav">
  <a href="/" use:links><h2 class="title title--app">Portify</h2></a>

  <h3 class="title title--content">{title}</h3>

  <div class="user">
    {#if user}
      <form action="/logout" method="post"><button class="btn">log out</button></form>
    {/if}
  </div>
</nav>

<style>
  .nav {
    display: grid;
    grid-template-columns: 250px 1fr auto;
    align-items: center;

    padding: 0.5rem 0;
  }

  .title {
    margin: 0;
  }

  .title--app {
    padding: 0 0.5rem;
  }

  .user {
    margin-left: auto;
    color: #333;
  }
</style>

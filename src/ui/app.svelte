<script>
  import { onMount } from "svelte";

  import Nav from "./panels/nav.svelte";
  import Top from "./panels/top.svelte";

  export let data = {
    message: "",
  };

  onMount(async () => {
    data = await (await fetch("/login")).json();

    console.log({ data });
  });
</script>

<style>
  .app {
    display: grid;
    grid-template-rows: auto 1fr;

    height: 100vh;
  }

  main {
    padding: 1em;

    background: pink;
  }
</style>

<div class="app">
  <Nav user={data.user} />
  <main>
    {#if data.user}
      <Top />
    {:else}
      <!-- else content here -->
      <h2>{data.message}</h2>
      <p><a href={data.loginURL}>Log in to Spotify</a></p>
    {/if}
  </main>
</div>

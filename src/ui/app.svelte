<script lang="ts">
  import { onMount } from "svelte";

  import Nav from "./panels/nav.svelte";
  import Top from "./panels/top.svelte";

  import type { LoginData } from "../../typings/app";

  export let data: LoginData = {
    message: "",
  };

  onMount(async () => {
    data = await (await fetch("/login")).json();

    console.log({ data });
  });
</script>

<style lang="scss">
  .app {
    display: grid;
    grid-template-rows: auto 1fr;

    height: 100vh;
  }
  .app__main {
    overflow: hidden;
    width: 100%;
    padding: 1em;
    border-top: 1px solid #333;
  }
</style>

<div class="app">
  <Nav user={data.user} />
  <main class="app__main">
    {#if data.user}
      <Top />
    {:else}
      <h2>{data.message}</h2>
      <p><a href={data.loginURL}>Log in to Spotify</a></p>
    {/if}
  </main>
</div>

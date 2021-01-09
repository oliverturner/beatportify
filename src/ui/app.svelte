<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";

  import AppContent from "./app-content.svelte";
  import type { LoginData } from "../../typings/app";

  export let data: LoginData = {
    message: "",
  };

  onMount(async () => {
    data = await (await fetch("/login")).json();

    console.log({ data });
  });

  let url = "";
</script>

<style lang="scss">
  .app {
    display: grid;
    grid-template-rows: auto 1fr;

    height: 100vh;
  }
  :global(.app__main) {
    display: grid;

    overflow: hidden;
    width: 100%;
    border-top: 1px solid #333;
  }

  .app__main.app__main--login {
    place-content: center;
  }
</style>

<Router {url}>
  <div class="app">
    {#if data.user}
      <AppContent user={data.user} />
    {:else}
      <h2>Portify</h2>
      <main class="app__main app__main--login">
        <p><a href={data.loginURL}>Log in to Spotify</a></p>
      </main>
    {/if}
  </div>
</Router>

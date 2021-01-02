<script lang="ts">
  import { onMount } from "svelte";
  import { Route } from "svelte-micro";

  import Nav from "./panels/nav.svelte";
  import Top from "./panels/top.svelte";
  import Sidebar from "./panels/sidebar.svelte";
  import Artist from "./panels/artist.svelte";
  import Track from "./panels/track.svelte";

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
    display: grid;

    overflow: hidden;
    width: 100%;
    padding: 1em;
    border-top: 1px solid #333;

    &.app__main--login {
      place-content: center;
    }
    &.app__main--app {
      grid-template-columns: auto 1fr;
    }
  }
</style>

<Route>
  <div class="app">
    <Nav user={data.user} />
    {#if data.user}
      <main class="app__main app__main--app">
        <Sidebar />
        <Route path="/">
          <Top />
        </Route>
        <Route path="/artist">
          <Artist />
        </Route>
        <Route path="/track">
          <Track />
        </Route>
      </main>
    {:else}
      <main class="app__main app__main--login">
        <h2>{data.message}</h2>
        <p><a href={data.loginURL}>Log in to Spotify</a></p>
      </main>
    {/if}
  </div>
</Route>

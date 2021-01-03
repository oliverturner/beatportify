<script lang="ts">
  import { onMount } from "svelte";
  import { Route } from "svelte-micro";

  import Nav from "./panels/nav.svelte";
  import Sidebar from "./panels/sidebar.svelte";
  import Top from "./pages/top.svelte";
  import Artist from "./pages/artist.svelte";
  import Track from "./pages/track.svelte";
  import Playlist from "./pages/playlist.svelte";

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
    border-top: 1px solid #333;

    &.app__main--login {
      place-content: center;
    }
    &.app__main--app {
      grid-template-columns: auto 1fr;
    }
  }

  .app__main__content {
    overflow: hidden;
    padding: 1em 0;
  }
</style>

<Route>
  <div class="app">
    <Nav user={data.user} />
    {#if data.user}
      <main class="app__main app__main--app">
        <Sidebar />
        <div class="app__main__content">
          <Route path="/">
            <Top />
          </Route>
          <Route path="/artist">
            <Artist />
          </Route>
          <Route path="/track">
            <Track />
          </Route>
          <Route path="/playlist">
            <Playlist />
          </Route>
        </div>
      </main>
    {:else}
      <main class="app__main app__main--login">
        <h2>{data.message}</h2>
        <p><a href={data.loginURL}>Log in to Spotify</a></p>
      </main>
    {/if}
  </div>
</Route>

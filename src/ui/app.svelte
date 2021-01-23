<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  import Nav from "./panels/nav.svelte";
  import Sidebar from "./panels/sidebar.svelte";
  import LoginBtn from "./components/login-btn.svelte";

  import Top from "./routes/top.svelte";
  import Artist from "./routes/artist.svelte";
  import Track from "./routes/track.svelte";
  import Playlist from "./routes/playlist.svelte";

  import type { LoginData } from "@typings/app";

  export let data: LoginData = {};

  let toastOpts = {
    intro: { y: 50 },
  };

  onMount(async () => {
    try {
      data = await (await fetch("/login")).json();
      console.log({ "app.onMount": data });
    } catch (err) {
      console.log({ "app.onMount:err:": err });
    }
  });

  let url = "";
</script>

<Router {url}>
  <div class="app" class:active={data.user}>
    <Nav user={data.user} />
    {#if data.user}
      <main class="app__main">
        <Sidebar />

        <Route path="/artist/:id" component={Artist} />
        <Route path="/track/:id" component={Track} />
        <Route path="/playlist/:id" component={Playlist} />
        <Route component={Top} />
      </main>
    {:else}
      <main class="app__login">
        <LoginBtn href={data.loginURL} />
      </main>
    {/if}
  </div>
</Router>
<SvelteToast options={toastOpts} />

<style lang="scss">
  .app {
    display: grid;
    grid-template-rows: auto 1fr;

    overflow: hidden;

    /* iOS viewport bug fix */
    height: 100vh;
    max-height: -webkit-fill-available;

    // @media(--mq-medium) {
    //   background: orange;
    // }

    // @media(--mq-large) {
    //   background: pink;
    // }
  }

  .app__login,
  .app__main {
    display: grid;

    max-height: 100%;
    border-top: 1px solid var(--border);
    overflow: hidden;
  }

  .app__login {
    place-content: center;
  }

  .app__main {
    grid-template-columns: 250px 1fr;
  }
</style>

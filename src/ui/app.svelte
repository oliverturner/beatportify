<script>
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  import Nav from "./panels/nav.svelte";
  import Sidebar from "./panels/sidebar.svelte";
  import LoginBtn from "./components/login-btn.svelte";

  import Top from "./routes/top.svelte";
  import Artist from "./routes/artist.svelte";
  import Track from "./routes/track.svelte";
  import Album from "./routes/album.svelte";
  import Playlist from "./routes/playlist.svelte";

  /**
   * @typedef {import("@typings/app").LoginData} LoginData
   */

  /** @type {LoginData} */
  export let data = {};

  let toastOpts = {
    intro: { y: 50 },
  };

  onMount(async () => {
    try {
      data = await (await fetch("/login")).json();
    } catch (err) {
      // TODO: display message as toast
      console.log({ "app.onMount:err:": err });
    }
  });

  let url = "";
</script>

<Router {url}>
  <div class="app" class:active={data.user}>
    <Nav user={data.user} />
    {#if data.user}
      <main class="app__main app__main--active">
        <div class="app__main__sidebar">
          <Sidebar />
        </div>

        <Route path="/track/:id" component={Track} />
        <Route path="/album/:id" component={Album} />
        <Route path="/artist/:id" component={Artist} />
        <Route path="/playlist/:id" component={Playlist} />
        <Route component={Top} />
      </main>
    {:else}
      <main class="app__main app__main--login">
        <div class="intro" class:intro--active={data.loginURL}>
          <p>
            <span class="title">Portify</span> makes it easy to buy music from the artists you follow
            on Spotify.
          </p>
          <LoginBtn href={data.loginURL} />
          <p>
            Logging in lets the app show you the tracks in your playlists with added links to
            Beatport and Bandcamp.
          </p>
          <p>Your details are never recorded.</p>
          <hr />
          <p>
            <span class="title">Portify</span> was made by
            <a href="https://twitter.com/oliverturner">Oliver Turner</a> because I wanted to make it
            easier to buy the music I love and support the artists I admire. As a fully
            <a href="https://github.com/oliverturner/beatportify">open source project</a> your feedback,
            suggestions, and contributions are welcome.
          </p>
        </div>
      </main>
    {/if}
  </div>
</Router>
<SvelteToast options={toastOpts} />

<style lang="scss">
  .app {
    display: grid;
    /* minmax forces calculation of "indefinite" dimensions on iOS */
    grid-template-rows: auto minmax(0, 1fr);

    overflow: hidden;
    height: 100vh;
    /* iOS viewport bug fix */
    max-height: -webkit-fill-available;
  }

  .app__main {
    display: grid;

    max-height: 100%;
    border-top: 1px solid var(--border);
    overflow: hidden;

    &.app__main--active {
      grid-template-columns: 0 1fr;

      @media (--mq-medium) {
        grid-template-columns: 250px 1fr;
      }
    }

    &.app__main--login {
      overflow-y: auto;
    }
  }

  .app__main__sidebar {
    position: relative;
    z-index: 1;

    @media (--mq-medium) {
      overflow: hidden;
    }
  }

  .intro {
    transition: 1s opacity 1s;

    display: grid;
    place-content: center;

    max-width: 44ch;
    margin: auto;
    padding: 1.2rem;
    font-size: 1.2rem;
    line-height: 1.8rem;
    opacity: 0;

    &.intro--active {
      opacity: 1;
    }

    & p + p {
      margin-top: 1.2rem;
    }

    & a {
      text-decoration: underline;
    }

    & hr {
      width: 50%;
      margin: 1.2rem auto;
      opacity: 0.25;
    }
  }
</style>

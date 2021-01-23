<script lang="ts">
  import { Route } from "svelte-routing";

  import Sidebar from "./panels/sidebar.svelte";
  import Top from "./routes/top.svelte";
  import Artist from "./routes/artist.svelte";
  import Track from "./routes/track.svelte";
  import Playlist from "./routes/playlist.svelte";
</script>

<Sidebar />

<Route path="/artist/:id" component={Artist} />
<Route path="/track/:id" component={Track} />
<Route path="/playlist/:id" component={Playlist} />
<Route component={Top} />

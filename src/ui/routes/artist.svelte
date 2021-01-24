<script lang="ts">
  import { pageTitle, contentTitle } from "../stores/ui";
  import { getSrcSet } from "../utils";
  import TrackItem from "../components/track-item.svelte";

  import type { Album, Track, Artist } from "@typings/spotify";

  export let id: string;

  let tracks: Track[] = [];
  let albums: Album[] = [];
  let related: Artist[] = [];

  async function loadArtist(artistId: string) {
    const response = await (await fetch(`/api/artists/${artistId}`)).json();

    pageTitle.set("Artist");
    contentTitle.set(response.artist.name);

    console.log("tracks:", response.topTracks);
    console.log("artist:", response.artist);
    console.log("albums:", response.albums);
    console.log("related:", response.relatedArtists);

    tracks = response.topTracks;
    tracks = response.topTracks;
    albums = response.albums.items;
    related = response.relatedArtists.artists;
  }

  $: loadArtist(id);
</script>

<div class="artist">
  <section>
    <h3 class="title">Top 20 Tracks:</h3>
    <div class="tracks">
      {#each tracks as item, index (item.id)}
        <TrackItem {item} {index} />
      {/each}
    </div>
  </section>

  <section>
    <h3 class="title">Appears on:</h3>
    <div class="tiles">
      {#each albums as album, index (album.id)}
        <article class="tile">
          <img
            srcset={getSrcSet(album.images)}
            src={`default ${album.images[1]?.url}`}
            alt={`Cover art for ${album.name}`}
            width="175px"
            height="175px"
          />
          <span>{album.name}</span>
        </article>
      {/each}
    </div>
  </section>

  <section>
    <h3 class="title">Related artists:</h3>
    <div class="items">
      {#each related as artist, index (artist.id)}
        <a class="item" href={`/artist/${artist.id}`}>
          <img
            srcset={getSrcSet(artist.images)}
            src={`default ${artist.images[1]?.url}`}
            alt={`Cover art for ${artist.name}`}
            width="64px"
            height="64px"
          />
          <span>{artist.name}</span>
        </a>
      {/each}
    </div>
  </section>
</div>

<style lang="scss">
  .artist {
    overflow: hidden auto;
    padding: 1rem;

    @media (--mq-medium) {
      padding: 0;
    }
  }

  .tracks {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;
  }

  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    gap: 1rem;
  }

  .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .tile,
  .item {
    background-color: var(--item-bg);
    color: var(--item-text);

    & > span {
      padding: 0.5rem;
    }
  }

  .tile {
    display: grid;
    overflow: hidden;

    & > img {
      width: 100%;
      object-fit: cover;
    }
  }

  .item {
    display: flex;
    align-items: center;
  }
</style>

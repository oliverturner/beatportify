<script lang="ts">
  export let track: SpotifyApi.TrackObjectFull;

  function getArtists(artists: SpotifyApi.ArtistObjectSimplified[]) {
    return artists.map((a) => a.name);
  }

  async function onTrackClick(event) {
    const { href } = event.target;

    try {
      const res = await fetch(href);
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  }

  let artists = getArtists(track.artists).join(", ");
  let searchTerm = `${artists} - ${track.name}`.split(" ").join("+");
  let purchaseLink = `https://www.beatport.com/search?q=${searchTerm}`;
</script>

<style lang="scss">
  .item {
    position: relative;
    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item__play {
    &::before {
      content: "";
      position: absolute;
      inset: 0 0 0 0;
      background: transparent;
    }
  }

  .item__play__label {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    font-size: 11px;
    background: #000a;
    color: #ccc;

    & span {
      display: block;
    }
  }

  .item__purchase {
    --wh: 32px;

    position: absolute;
    inset: 5px 5px auto auto;
    width: var(--wh);
    height: var(--wh);

    padding: 5px;
    border-radius: 3px;
    fill: #94d500;
    background: #262626;
  }
</style>

<div class="item">
  <img src={track.album.images[1].url} alt={`Cover art for ${track.album.name}`} />
  <a href={`/api/play/${track.id}`} class="item__play" on:click|preventDefault={onTrackClick}>
    <p class="item__play__label"><span>{artists}:</span> <span>{track.name}</span></p>
  </a>
  <a href={purchaseLink} class="item__purchase" aria-label="Find on Beatport">
    <svg class="icon" aria-hidden="true">
      <use href="#icon-beatport" />
    </svg>
  </a>
</div>

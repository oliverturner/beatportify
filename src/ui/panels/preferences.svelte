<script lang="ts">
  import type { PrivateUser } from "@typings/spotify";

  export let user: PrivateUser;
</script>

<div class="container title">
  <div class="user">
    <img class="user__avatar" src={user.images[0].url} alt="Your avatar" />
    <form class="user__logout" action="/logout" method="post">
      <button class="btn">Log out</button>
    </form>
  </div>

  <div class="preferences">
    <p class="preference">Notation: Camelot | Musical</p>
    <p class="preference">Theme: Light | Dark</p>
  </div>

  <div class="info">
    <ul>
      <li>inspo</li>
      <li>github link</li>
    </ul>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;

    height: 100%;
    overflow: hidden;
    background-color: var(--item-bg);

    & > * + * {
      margin-top: 2rem;
    }
  }

  .user {
    display: grid;
    gap: 0.5rem;
  }

  .user__avatar {
    --wh: var(--l24);

    width: var(--wh);
    height: var(--wh);
    margin: 0.5rem auto;
    border: none;
    border-radius: var(--wh);
    overflow: hidden;
    object-fit: cover;
  }

  .user__logout {
    padding: 0.25rem;
    border: 1px solid var(--border);
    border-left: none;
    border-right: none;
    text-align: center;
  }

  .preference {
    padding: 0.5rem;

    & + & {
      border-top: 1px solid var(--border);
    }
  }

  .info {
    margin-top: auto;
    border-top: 1px solid var(--border);
  }
</style>

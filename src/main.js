import App from "./ui/app.svelte";

let message = "...loading";

const app = new App({
  target: document.body,
  props: {
    data: { message },
  },
});

export default app;

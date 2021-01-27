interface Props {
  options?: Partial<typeof defaultOpts>;
  targets?: HTMLElement[] | NodeListOf<HTMLImageElement>;
  onIntersect?: (el: Element) => void;
}

const defaultOpts = {
  once: true,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

function onDefaultIntersect(el: Element) {
  const { srcset, src } = (el as HTMLImageElement).dataset;

  if (srcset) {
    el.setAttribute("srcset", srcset);
    el.setAttribute("src", src);
  }
}

export function intersectionObserver(
  root: HTMLElement,
  { options, targets, onIntersect }: Props = {}
) {
  let observer: IntersectionObserver;
  let rootMargin: string;

  // IntersectionObserver is supported
  if (typeof IntersectionObserver !== "undefined") {
    let { once, margin } = { ...defaultOpts, ...options };

    rootMargin = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`;
    targets = targets || root.querySelectorAll("img");
    onIntersect = onIntersect || onDefaultIntersect;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onIntersect(entry.target);

            if (once) {
              observer.unobserve(entry.target);
            }
          }
        }
      },
      {
        root,
        rootMargin,
      }
    );

    for (const target of targets) {
      observer.observe(target);
    }
  }

  return {
    destroy: () => {
      observer = undefined;
    },
  };
}

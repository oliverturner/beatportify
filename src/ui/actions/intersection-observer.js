const defaultMargin = { top: 0, right: 0, bottom: 0, left: 0 };

const defaultOpts = {
  once: true,
  margin: defaultMargin,
};

/**
 * Provide a default callback: lazy load images
 * @type {(el: Element) => void}
 */
function onDefaultIntersect(el) {
  const { srcset, src } = /** @type {HTMLImageElement} */ (el).dataset;

  if (srcset && src) {
    el.setAttribute("srcset", srcset);
    el.setAttribute("src", src);
  }
}

/** @type {(props: typeof defaultMargin) => string} */
function calcMargin({ top, right, bottom, left }) {
  return `${top}px ${right}px ${bottom}px ${left}px`;
}

/**
 * @param {HTMLElement} root
 * @param {{
 *  options?: Partial<typeof defaultOpts>;
 *  targets?: HTMLElement[] | NodeListOf<HTMLImageElement>;
 *  onIntersect?: (el: Element) => void;
 * }} config
 *
 * @returns {{destroy: () => void}}
 */
export function intersectionObserver(
  root,
  { options, targets, onIntersect = onDefaultIntersect } = {}
) {
  let { once, margin } = { ...defaultOpts, ...options };
  let rootMargin = calcMargin(margin);

  if (!targets) {
    targets = root.querySelectorAll("img");
  }

  let observer = new IntersectionObserver(
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

  return {
    destroy: () => {
      observer && observer.disconnect();
    },
  };
}

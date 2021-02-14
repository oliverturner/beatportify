const defaultOpts = {
  once: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

/**
 * @param {Element} el
 */
function onDefaultIntersect(el) {
  const { srcset, src } = /** @type {HTMLImageElement} */ (el).dataset;

  if (srcset && src) {
    el.setAttribute("srcset", srcset);
    el.setAttribute("src", src);
  }
}

/**
 *
 * @param {HTMLElement} root
 * @param {{
 *  options?: Partial<typeof defaultOpts>;
 *  targets?: HTMLElement[] | NodeListOf<HTMLImageElement>;
 *  onIntersect?: (el: Element) => void;
 * }} config
 * 
 * @returns {{destroy: () => void}}
 */
export function intersectionObserver(root, { options, targets, onIntersect } = {}) {
  /** @type {IntersectionObserver|undefined} */
  let observer;

  /** @type {string} */
  let rootMargin;

  /** @type {(el: Element) => void} */
  let intersectionCallback = onIntersect || onDefaultIntersect;

  // IntersectionObserver is supported
  if (typeof IntersectionObserver !== "undefined") {
    let { once, margin } = { ...defaultOpts, ...options };

    rootMargin = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`;
    targets = targets || root.querySelectorAll("img");

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersectionCallback(entry.target);

            if (once) {
              observer && observer.unobserve(entry.target);
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

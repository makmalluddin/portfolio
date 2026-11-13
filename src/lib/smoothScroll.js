let lenisInstance = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setLenis(instance) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToTop(options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1, ...options });
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

export function scrollToElement(element, options = {}) {
  if (!element) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset: -48, duration: 1.2, ...options });
    return;
  }

  element.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

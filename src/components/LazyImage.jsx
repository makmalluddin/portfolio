import { useEffect, useRef, useState } from "react";

/**
 * Menunda pemuatan gambar sampai elemen mendekati viewport.
 * Berbeda dari loading="lazy" bawaan browser yang punya ambang jarak besar,
 * komponen ini memakai IntersectionObserver dengan margin kecil agar gambar
 * di bawah fold tidak ikut berebut bandwidth dengan elemen LCP.
 */
function LazyImage({
  src,
  alt = "",
  className = "",
  rootMargin = "100px",
  ...rest
}) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldLoad || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  return (
    <img
      ref={ref}
      src={shouldLoad ? src : undefined}
      alt={alt}
      className={className}
      {...rest}
    />
  );
}

export default LazyImage;

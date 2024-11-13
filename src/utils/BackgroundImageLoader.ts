// ImageLoader.ts
interface ImageCacheEntry {
  promise: Promise<string>;
  status: "loading" | "loaded" | "error";
}

const imageCache: { [key: string]: ImageCacheEntry } = {};

export function BackgroundImageLoader(src: string): void {
  if (imageCache[src]) {
    if (imageCache[src].status === "loaded") {
      // Image is already loaded, return immediately
      return;
    } else if (imageCache[src].status === "loading") {
      // Image is still loading, suspend by throwing the promise
      throw imageCache[src].promise;
    }
  } else {
    // Create a new cache entry with a loading promise
    const promise = new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache[src].status = "loaded";
        resolve(src);
      };
      img.onerror = (err) => {
        imageCache[src].status = "error";
        reject(err);
      };
    });

    imageCache[src] = { promise, status: "loading" };
    throw promise; // Suspend until the image loads
  }
}

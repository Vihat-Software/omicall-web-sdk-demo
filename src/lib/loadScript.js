const pendingLoads = new Map();

/** Dedupes concurrent/repeat requests for the same `src` — callers always await the same in-flight (or settled) load. */
export function loadScript(src, attributes = {}) {
    const cached = pendingLoads.get(src);
    if (cached) return cached;

    const promise = new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
        script.onload = () => resolve();
        script.onerror = () => {
            script.remove();
            reject(new Error(`Failed to load script: ${src}`));
        };
        document.head.appendChild(script);
    }).catch((error) => {
        pendingLoads.delete(src);
        throw error;
    });

    pendingLoads.set(src, promise);
    return promise;
}

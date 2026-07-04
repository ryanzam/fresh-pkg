async function fetchLatest(name) {
    try {
        const res = await fetch(
            `https://registry.npmjs.org/${encodeURIComponent(name)}/latest`
        )
        if (!res.ok) return { name, latest: null, error: `npm registry: ${res.status}` }
        const json = await res.json()
        return { name, latest: json.version, error: null }
    } catch {
        return { name, latest: null, error: 'network error' }
    }
}

/** Resolve latest versions for many packages, a few at a time so we don't flood the registry. */
export async function fetchLatestVersions(names, { concurrency = 6, onProgress } = {}) {
    const queue = [...names]
    const results = new Map()
    let done = 0

    async function worker() {
        while (queue.length) {
            const name = queue.shift()
            const result = await fetchLatest(name)
            results.set(name, result)
            done += 1
            onProgress?.(done, names.length)
        }
    }

    const workers = Array.from({ length: Math.min(concurrency, names.length) }, worker)
    await Promise.all(workers)
    return results
}

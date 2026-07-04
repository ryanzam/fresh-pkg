const VERSION_RE = /(\d+)\.(\d+)\.(\d+)/

export function parseVersion(raw) {
    if (!raw || typeof raw !== 'string') return null
    const match = raw.match(VERSION_RE)
    if (!match) return null
    const [, major, minor, patch] = match
    return { major: Number(major), minor: Number(minor), patch: Number(patch) }
}

export function isUnresolvable(raw) {
    if (!raw) return true
    return /^(git|github|file|link|workspace|http)/.test(raw.trim()) || raw.trim() === '*'
}

export function diffType(declaredRaw, latestRaw) {
    const declared = parseVersion(declaredRaw)
    const latest = parseVersion(latestRaw)
    if (!declared || !latest) return null

    if (latest.major > declared.major) return 'major'
    if (latest.major === declared.major && latest.minor > declared.minor) return 'minor'
    if (
        latest.major === declared.major &&
        latest.minor === declared.minor &&
        latest.patch > declared.patch
    ) {
        return 'patch'
    }
    return 'same'
}

import { fetchPackageJson } from "./github"
import { fetchLatestVersions } from "./npm"
import { diffType, isUnresolvable } from "./semver"
import { computePoints } from "./points"

/**
 * Run a full freshness check for a repo.
 * @param {string} repoInput
 * @param {{ onProgress?: (done: number, total: number) => void }} opts
 */

export async function analyzeRepo(repoInput, { onProgress } = {}) {
    const { repo, branch, packageJson } = await fetchPackageJson(repoInput)

    const deps = { ...(packageJson.dependencies || {}) }
    const devDeps = { ...(packageJson.devDependencies || {}) }
    const entries = [
        ...Object.entries(deps).map(([name, range]) => ({ name, range, kind: 'dependency' })),
        ...Object.entries(devDeps).map(([name, range]) => ({ name, range, kind: 'devDependency' })),
    ]

    if (entries.length === 0) {
        throw new Error(`${repo} has a package.json but lists no dependencies to check.`)
    }

    const names = entries.map((e) => e.name)
    const latestMap = await fetchLatestVersions(names, { onProgress })

    const rows = entries
        .map(({ name, range, kind }) => {
            const latestResult = latestMap.get(name)
            const unresolvable = isUnresolvable(range)
            const latest = latestResult?.latest ?? null
            const status = unresolvable || !latest ? 'unknown' : diffType(range, latest) || 'unknown'
            return {
                name,
                kind,
                declared: range,
                latest,
                status,
                error: latestResult?.error || (unresolvable ? 'non-registry range' : null),
            }
        })
        .sort((a, b) => {
            const order = { major: 0, minor: 1, patch: 2, unknown: 3, same: 4 }
            return order[a.status] - order[b.status] || a.name.localeCompare(b.name)
        })

    const score = computePoints(rows)

    return {
        repo,
        branch,
        rows,
        score,
        counts: {
            total: rows.length,
            major: rows.filter((r) => r.status === 'major').length,
            minor: rows.filter((r) => r.status === 'minor').length,
            patch: rows.filter((r) => r.status === 'patch').length,
            same: rows.filter((r) => r.status === 'same').length,
            unknown: rows.filter((r) => r.status === 'unknown').length,
        },
    }
}
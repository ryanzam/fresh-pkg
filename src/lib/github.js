const REPO_RE = /^([\w.-]+)\/([\w.-]+)$/

export function normalizeRepoInput(input) {
    const trimmed = input.trim().replace(/\.git$/, '').replace(/\/$/, '')
    const urlMatch = trimmed.match(/github\.com\/([\w.-]+)\/([\w.-]+)/)
    if (urlMatch) return `${urlMatch[1]}/${urlMatch[2]}`
    return trimmed
}

export function isValidRepo(input) {
    return REPO_RE.test(normalizeRepoInput(input))
}

export async function fetchPackageJson(repoInput) {
    const repo = normalizeRepoInput(repoInput)
    if (!REPO_RE.test(repo)) {
        throw new Error('Enter a repo as "owner/name" or a GitHub URL.')
    }

    const branches = ['main', 'master']
    let lastError = null

    for (const branch of branches) {
        try {
            const res = await fetch(
                `https://raw.githubusercontent.com/${repo}/${branch}/package.json`
            )
            if (res.status === 404) {
                lastError = new Error('not found on this branch')
                continue
            }
            if (!res.ok) {
                throw new Error(`GitHub responded with ${res.status}`)
            }
            const json = await res.json()
            return { repo, branch, packageJson: json }
        } catch (err) {
            lastError = err
        }
    }

    throw new Error(
        `Couldn't find a package.json in ${repo} (checked main and master). ` +
        'Make sure the repo is public and has package.json at its root.'
    )
}
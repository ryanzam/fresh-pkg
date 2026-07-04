export const STATUS = {
    same: { label: 'up to date', weight: 100, tone: 'fresh' },
    patch: { label: 'patch behind', weight: 90, tone: 'fresh' },
    minor: { label: 'minor behind', weight: 55, tone: 'ripening' },
    major: { label: 'major behind', weight: 15, tone: 'stale' },
    unknown: { label: 'unresolved', weight: null, tone: 'muted' },
}

/** Turn a 0-100 score into a grade word + tone used for the gauge and badge. */
export function gradeFor(score) {
    if (score === null) return { label: 'unknown', tone: 'muted' }
    if (score >= 85) return { label: 'Fresh', tone: 'fresh' }
    if (score >= 55) return { label: 'Ripening', tone: 'ripening' }
    return { label: 'Stale', tone: 'stale' }
}

/** Compute the overall 0-100 freshness score from a list of row statuses. */
export function computePoints(rows) {
    const scored = rows.filter((r) => STATUS[r.status].weight !== null)
    if (scored.length === 0) return null
    const total = scored.reduce((sum, r) => sum + STATUS[r.status].weight, 0)
    return Math.round(total / scored.length)
}

export const TONE_HEX = {
    fresh: '2F8F46',
    ripening: 'C98A1F',
    stale: 'B84A29',
    muted: '8A9389',
}

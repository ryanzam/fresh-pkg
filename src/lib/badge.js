import { TONE_HEX } from './points'

function escapeSegment(str) {
    return String(str).replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_')
}

export function buildBadge({ score, grade }) {
    const label = escapeSegment('deps')
    const message = escapeSegment(`${grade.label.toLowerCase()} ${score}%25`)
    const color = TONE_HEX[grade.tone] || TONE_HEX.muted

    const imageUrl = `https://img.shields.io/badge/${label}-${message}-${color}`
    console.log(imageUrl)
    const markdown = `![deps](${imageUrl})`
    return { imageUrl, markdown }
}

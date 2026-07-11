import { useState } from 'react'
import { buildBadge } from '../lib/badge'
import { gradeFor } from '../lib/points'

function CopyButton({ value, label }) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            //fail silently.
        }
    }

    return (
        <button
            onClick={handleCopy}
            className="font-mono text-xs px-2.5 py-1 rounded-md border border-line bg-paper hover:bg-line/60 transition-colors cursor-pointer"
        >
            {copied ? 'copied' : label}
        </button>
    )
}

export default function Badge({ score }) {
    const grade = gradeFor(score)
    const { imageUrl, markdown } = buildBadge({ score, grade })

    return (
        <div className="border border-line rounded-xl bg-surface p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg">Your README badge</h3>
                <img src={imageUrl} alt="deps badge preview" className="h-5" />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between bg-paper border border-line rounded-lg px-3 py-2">
                    <code className="font-mono text-xs text-ink-muted overflow-x-auto whitespace-nowrap mr-3">
                        {markdown}
                    </code>
                    <CopyButton value={markdown} label="copy markdown" />
                </div>
                <div className="flex items-center justify-between bg-paper border border-line rounded-lg px-3 py-2">
                    <code className="font-mono text-xs text-ink-muted overflow-x-auto whitespace-nowrap mr-3">
                        {imageUrl}
                    </code>
                    <CopyButton value={imageUrl} label="copy url" />
                </div>
            </div>

            <p className="text-xs text-ink-muted mt-3">
                This badge is a snapshot of today's check. Re-run fresh-pkg to get an updated score.
            </p>
        </div>
    )
}

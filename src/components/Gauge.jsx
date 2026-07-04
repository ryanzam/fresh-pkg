import { gradeFor } from '../lib/points'

export default function FreshnessGauge({ score }) {
    const grade = gradeFor(score)
    const clamped = Math.max(2, Math.min(98, score ?? 0))

    return (
        <div className="w-full">
            <div className="flex items-baseline justify-between mb-3">
                <div>
                    <span className="font-display text-5xl sm:text-6xl leading-none tabular-nums">
                        {score}
                    </span>
                    <span className="font-display text-2xl text-ink-muted">/100</span>
                </div>
                <span
                    className="font-mono text-sm font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                        color: `var(--color-white)`,
                        backgroundColor: `var(--color-${grade.tone}-soft, var(--color-line))`,
                    }}
                >
                    {grade.label}
                </span>
            </div>

            <div className="relative h-3 rounded-full overflow-visible bg-line">
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            'linear-gradient(90deg, var(--color-stale) 0%, var(--color-ripening) 50%, var(--color-fresh) 100%)',
                    }}
                />
                <div
                    className="absolute top-1/2 w-4 h-4 rounded-full bg-surface border-2 shadow-sm transition-[left] duration-700 ease-out"
                    style={{
                        left: `${clamped}%`,
                        transform: 'translate(-50%, -50%)',
                        borderColor: `var(--color-${grade.tone})`,
                    }}
                />
            </div>
            <div className="flex justify-between mt-1.5 font-mono text-[11px] text-ink-muted uppercase tracking-wide">
                <span>stale</span>
                <span>ripening</span>
                <span>fresh</span>
            </div>
        </div>
    )
}

import { STATUS } from '../lib/points'

function StatusPill({ status }) {
    const meta = STATUS[status]
    return (
        <span
            className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{
                color: `var(--color-${meta.tone})`,
                backgroundColor:
                    meta.tone === 'muted' ? 'var(--color-line)' : `var(--color-${meta.tone}-soft)`,
            }}
        >
            <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: `var(--color-${meta.tone})` }}
            />
            {meta.label}
        </span>
    )
}

export default function PkgTable({ rows }) {
    return (
        <div className="border border-line rounded-xl overflow-hidden bg-surface">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-line text-left font-mono text-xs uppercase tracking-wide text-ink-muted">
                        <th className="px-4 py-3 font-medium">Package</th>
                        <th className="px-4 py-3 font-medium">Declared</th>
                        <th className="px-4 py-3 font-medium">Latest</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.name} className="border-b border-line last:border-0">
                            <td className="px-4 py-2.5">
                                <div className="font-mono text-[13px]">{row.name}</div>
                                {row.kind === 'devDependency' && (
                                    <div className="text-[11px] text-ink-muted">dev</div>
                                )}
                            </td>
                            <td className="px-4 py-2.5 font-mono text-[13px] text-ink-muted">
                                {row.declared}
                            </td>
                            <td className="px-4 py-2.5 font-mono text-[13px]">
                                {row.latest ?? '—'}
                            </td>
                            <td className="px-4 py-2.5">
                                <StatusPill status={row.status} />
                                {row.error && row.status === 'unknown' && (
                                    <span className="ml-2 text-[11px] text-ink-muted">{row.error}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

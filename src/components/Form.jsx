import React from 'react'

const EXAMPLES = ['ryanzam/fresh-pkg', 'vitejs/vite', 'vercel/next.js']

const Form = ({ value, onChange, onSubmit, pending }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(value)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-ink-muted text-sm select-none">
                        gh/
                    </span>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="owner/repo"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-line bg-surface font-mono text-sm
                       placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-fresh/40 focus:border-fresh"
                        spellCheck={false}
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </div>
                <button
                    type="submit"
                    disabled={pending}
                    className="px-6 py-3.5 rounded-xl bg-ink text-paper font-medium text-sm
                     hover:bg-fresh transition-colors disabled:opacity-40 disabled:hover:bg-ink
                     cursor-pointer disabled:cursor-not-allowed"
                >
                    {pending ? 'Checking…' : 'Check freshness'}
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs text-ink-muted">Try:</span>
                {EXAMPLES.map((repo) => (
                    <button
                        key={repo}
                        type="button"
                        onClick={() => onChange(repo)}
                        className="font-mono text-xs px-2 py-1 rounded-md border border-line text-ink-muted
                       hover:text-ink hover:border-ink transition-colors cursor-pointer"
                    >
                        {repo}
                    </button>
                ))}
            </div>
        </form>
    )
}

export default Form
import { useState, useTransition } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

import Form from './components/Form'
import { analyzeRepo } from './lib/analyze'
import Gauge from './components/Gauge'
import PkgTable from './components/PkgTable'


function App() {

  const [repo, setRepo] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (value) => {
    const repo = value.trim()
    if (!repo) return
    setError(null)
    setProgress(null)

    startTransition(async () => {
      try {
        const data = await analyzeRepo(repo, {
          onProgress: (done, total) => setProgress({ done, total }),
        })
        setResult(data)
      } catch (err) {
        setResult(null)
        setError(err.message || 'Something went wrong.')
      } finally {
        setProgress(null)
      }
    })
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <header className="mb-10">
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] mb-4 text-primary">
            Find the freshness of your dependencies.
          </h1>
          <p className="text-primary-soft text-base sm:text-lg leading-relaxed">
            Check every dependency in
            package.json against the npm registry and get a score and a
            badge to drop straight into your README.
          </p>
        </header>

        <Form
          value={repo}
          onChange={setRepo}
          onSubmit={handleSubmit}
          pending={isPending}
        />
        <div className="mt-10">
          {isPending && (
            <div className="text-sm text-ink-muted font-mono">
              {progress
                ? `Checking ${progress.done}/${progress.total} packages against npm…`
                : 'Fetching package.json…'}
            </div>
          )}

          {!isPending && error && (
            <div className="border border-stale/30 bg-stale-soft rounded-xl px-4 py-3.5 text-sm text-stale">
              {error}
            </div>
          )}

          {!isPending && !error && result && (
            <div className="space-y-8">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <a
                    href={`https://github.com/${result.repo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm hover:text-fresh transition-colors"
                  >
                    {result.repo}
                  </a>
                  <span className="text-xs text-ink-muted">
                    {result.counts.total} dependencies checked
                  </span>
                </div>
                <Gauge score={result.score} />
              </div>

              <PkgTable rows={result.rows} />

            </div>
          )}

          {!isPending && !error && !result && (
            <p className="text-sm text-ink-muted">
              No repo checked yet — try one of the examples above to see it in
              action.
            </p>
          )}
        </div>
      </main>

      <footer className="max-w-2xl mx-auto px-6 pb-16 text-xs text-ink-muted">
        Reads public repos only, via the GitHub and npm registry APIs, entirely
        in your browser. Nothing is stored.
      </footer>
    </div>
  )
}

export default App

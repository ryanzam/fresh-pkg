import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-fresh mb-4">
            npm · dependency package health
          </p>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] mb-4">
            Find the freshness of your dependencies.
          </h1>
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            Check every dependency in
            package.json against the npm registry and get a score — plus a
            badge to drop straight into your README.
          </p>
        </header>
      </main>
    </div>
  )
}

export default App

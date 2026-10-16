import { Component } from 'react'
export default class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center">
        <div className="card max-w-md p-8">
          <h1 className="text-xl font-bold">Something broke on this page</h1>
          <p className="mt-2 text-sm opacity-70">Reload to try again. If it keeps happening, sign out and back in.</p>
          <button className="btn-primary mt-5" onClick={() => location.reload()}>Reload page</button>
        </div>
      </div>
    )
  }
}

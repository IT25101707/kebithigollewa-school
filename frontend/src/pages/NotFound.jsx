import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="grid min-h-[70vh] place-items-center px-6 pt-24 text-center">
        <div>
          <p className="h-display bg-gradient-to-r from-gold-soft to-maroon-bright bg-clip-text text-9xl text-transparent">404</p>
          <h1 className="font-display mt-4 text-3xl font-bold">This corridor doesn't exist.</h1>
          <p className="muted mt-3">The page you're looking for has moved or was never here.</p>
          <Link to="/" className="btn-gold mt-8">Back to the homepage</Link>
        </div>
      </section>
    </PageTransition>
  )
}

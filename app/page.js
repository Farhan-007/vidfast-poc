'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'
import { searchMovies } from '@/lib/omdb'

export default function HomePage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return
      setLoading(true)
      const data = await searchMovies(query)
      setResults(data.Search || [])
      console.log(results)
      setLoading(false)
    }

    fetchData()
  }, [query])

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎬 Movie Explorer</h1>
      <SearchBar />

      {loading && <p className="text-gray-500">Searching for movies...</p>}

      {!loading && query && results.length === 0 && (
        <p className="text-gray-500">No results found for "{query}"</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {results.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </main>
  )
}

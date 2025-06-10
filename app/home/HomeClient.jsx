'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import { getEpisode, searchMovies } from '@/lib/omdb'

export default function HomeClient() {
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
      setLoading(false)
    }
    let isMounted = true
    // Fetch episodes for non-movie types after fetching search results
    const fetchEpisodes = async (movies) => {
      const updatedResults = await Promise.all(
      movies.map(async (movie) => {
        if (movie.Type !== 'movie') {
        // You may need to implement fetchEpisodesByImdbID in your omdb lib
        const episodes = await getEpisode({ id: movie.imdbID, season: 1 })
        return { ...movie, episodes }
        }
        return movie
      })
      )
      if (isMounted) setResults(updatedResults)
    }

    fetchData().then(() => {
      if (query && results.length > 0) {
      fetchEpisodes(results)
      }
    })

    return () => { isMounted = false }
    fetchData()
  }, [query])

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">🎬 Movie Explorer</h1>
      <SearchBar />

      {loading && <p className="text-gray-500">Searching for movies...</p>}

      {!loading && query && results.length === 0 && (
        <p className="text-gray-500">No results found for &quot;{query}&quot;</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {results.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} type={movie.Type}  />
        ))}
      </div>
    </>
  )
}

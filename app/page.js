// 'use client'

// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import SearchBar from './components/SearchBar'
// import MovieCard from './components/MovieCard'
// import { searchMovies } from '@/lib/omdb'

export default function HomePage() {
  // const [results, setResults] = useState([])
  // const [loading, setLoading] = useState(false)
  // const searchParams = useSearchParams()
  // const query = searchParams.get('query') || ''

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!query) return
  //     setLoading(true)
  //     const data = await searchMovies(query)
  //     setResults(data.Search || [])
  //     // console.log(results)
  //     setLoading(false)
  //   }

  //   fetchData()
  // }, [query])

  return (
    // <main className="p-6 max-w-6xl mx-auto">
    //   <h1 className="text-3xl font-bold mb-4">🎬 Movie Explorer</h1>
    //   <SearchBar />

    //   {loading && <p className="text-gray-500">Searching for movies...</p>}

    //   {!loading && query && results.length === 0 && (
    //     <p className="text-gray-500">No results found for &quot;{query}&quot;</p>
    //   )}

    //   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
    //     {results.map(movie => (
    //       <MovieCard key={movie.imdbID} movie={movie} />
    //     ))}
    //   </div>
    // </main>
    <main className="min-h-screen flex flex-col justify-center items-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4">🎬 Welcome to VidFast</h1>
      <p className="text-gray-600 text-lg mb-6">Discover and stream your favorite movies instantly.</p>
      <a href="/home" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Get Started
      </a>
    </main>
  )
}

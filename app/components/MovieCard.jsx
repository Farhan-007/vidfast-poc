'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getEpisode } from '@/lib/omdb' // Import your getEpisode function


export default function MovieCard({ movie, type }) {

  const [episodes, setEpisodes] = useState(Number)

  useEffect(() => {
    const fetchAllEpisodes = async () => {
      if (movie.Type !== 'movie') {
        const data = await getEpisode({ id: movie.imdbID, season: 1 })
        setEpisodes(data.Episodes.length)
        // console.log(movie.Title, type, data.Episodes.length)
      }
    };
    fetchAllEpisodes()
  }, [movie.imdbID])
  console.log( movie.Title, type , episodes)

  return (
    // <Link href={`/${type==='movie'?`movie`:`tv`}/${movie.imdbID}`}>
    //   <div className="border rounded overflow-hidden hover:shadow-lg transition">
    //     <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
    //     <div className="p-2">
    //       <h2 className="text-md font-semibold">{movie.Title}</h2>
    //       <p className="text-sm text-gray-600">{movie.Year}</p>
    //     </div>
    //   </div>
    // </Link>
    <Link href={`/${type === 'movie' ? 'movie' : 'tv'}/${movie.imdbID}`} className="block">
      <div className="relative rounded-md overflow-hidden shadow hover:shadow-lg transition">
        {/* Poster Image */}
        <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />

        {/* Top Right TV Badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {type === 'movie' ? 'Movie' : 'TV'}
        </div>

        {/* Bottom Left Ep Badge */}
        {
          type !== 'movie' && (
            <div className="absolute bottom-2 left-2 bg-lime-400 text-black text-xs font-semibold px-2 py-1 rounded">
              Ep {episodes}
            </div>
          )
        }

        {/* Bottom Right Sub Badge */}
        {/* <div className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
          Sub
        </div> */}
      </div>

      {/* Title Below Card */}
      <div className="mt-2 text-sm font-medium text-white text-center">
        {movie.Title}
      </div>
    </Link>
  )
}

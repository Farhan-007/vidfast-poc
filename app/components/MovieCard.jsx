import Link from 'next/link'

export default function MovieCard({ movie, type }) {
  return (
    <Link href={`/${type==='movie'?`movie`:`tv`}/${movie.imdbID}`}>
      <div className="border rounded overflow-hidden hover:shadow-lg transition">
        <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
        <div className="p-2">
          <h2 className="text-md font-semibold">{movie.Title}</h2>
          <p className="text-sm text-gray-600">{movie.Year}</p>
        </div>
      </div>
    </Link>
  )
}

import { getMovieById } from '@/lib/omdb';

export default async function MoviePage({ params }) {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) {
    return <p className="p-6 text-red-600">Movie not found</p>;
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{movie.Title}</h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
            alt={movie.Title}
            className="w-full md:w-80 rounded shadow-lg"
          />

          {/* Details */}
          <div className="flex-1 space-y-4">
            <p>
              <span className="font-semibold text-lg">🎬 Genre:</span>{' '}
              <span className="text-gray-300">{movie.Genre}</span>
            </p>

            <p>
              <span className="font-semibold text-lg">📅 Released:</span>{' '}
              <span className="text-gray-300">{movie.Released}</span>
            </p>

            <p>
              <span className="font-semibold text-lg">⭐ IMDb Rating:</span>{' '}
              <span className="text-yellow-400">{movie.imdbRating}</span>
            </p>

            <div>
              <p className="font-semibold text-lg mb-1">📝 Plot:</p>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>
          </div>
        </div>

        {/* Streaming */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">🎥 Watch Now</h2>
          <div className="w-full aspect-video rounded overflow-hidden">
            <iframe
              src={`https://vidfast.pro/tv/${id}/1/1?autoPlay=true`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { getMovieById } from '@/lib/omdb';
import { getEpisode } from '@/lib/omdb'; // Import your getEpisode function

export default function MoviePage({ params }) {
    const { id } = React.use(params);
    const [movie, setMovie] = useState(null);
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [episodes, setEpisodes] = useState([]);
    const [seasons, setSeasons] = useState([1]);

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await getMovieById(id);
            setMovie(data);
            // Ensure seasons is always an array of numbers
            if (data.totalSeasons && !isNaN(Number(data.totalSeasons))) {
                setSeasons(Array.from({ length: Number(data.totalSeasons) }, (_, i) => i + 1));
            } else {
                setSeasons([1]);
            }
            console.log(data.totalSeasons)
        };
        fetchMovie();
    }, [id]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            if (!id || !season) return;
            const data = await getEpisode({ id, season });
            if (data && data.Episodes) {
                setEpisodes(data.Episodes);
                setEpisode(1); // Reset episode to 1 when season changes
            } else {
                setEpisodes([]);
            }
        };
        fetchEpisodes();
    }, [id, season]);

    if (!movie) {
        return <p className="p-6 text-red-600">Movie not found</p>;
    }

    return (

        <main className="min-h-screen bg-neutral-900 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Video Player */}
                <div className="w-full aspect-video rounded overflow-hidden bg-black">
                    <iframe
                        src={`https://vidfast.pro/tv/${id}/${season}/${episode}`}
                        allow=" encrypted-media"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>

                {/* Title */}
                <h1 className="text-xl md:text-2xl font-semibold">
                    {movie.Title} Season {season} Episode {episode}
                </h1>

                {/* Metadata row */}
                <div className="flex flex-wrap text-sm text-gray-400 gap-x-3">
                    <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded text-xs font-semibold">Sub</span>
                    <span>Released on June 6, 2025</span>
                    <span>· Posted by <span className="text-white font-medium">admin</span></span>
                    <span>· series <span className="underline">{movie.Title} Season {season}</span></span>
                </div>

                {/* Inputs for Season & Episode */}
                <div className="bg-zinc-900 p-4 rounded mb-6 mt-8 md:w-2xl w-full  space-y-6">
                    {/* Range Label */}
                    <div className="flex gap-5 font-medium text-sm  pb-1 mb-2 w-fit">
                        <div>
                            <select
                                id="season"
                                value={season}
                                onChange={(e) => setSeason(Number(e.target.value))}
                                className="text-lg px-3 py-1 mb-4 text-lime-400 border-b border-lime-400 w-32"
                            >
                                {seasons.length > 0 ? (
                                    seasons.map((s, idx) => (
                                        <option key={idx} value={s}>
                                            Season {s}
                                        </option>
                                    ))
                                ) : (
                                    <option value={1}>Season 1</option>
                                )}
                            </select>
                        </div>
                    </div>

                    {/* Episode Buttons */}
                    <div className="flex flex-col items-start gap-3 text-sm">
                        {episodes.map((ep, idx) => (
                            <button
                                key={idx}
                                onClick={() => setEpisode(idx + 1)}
                                className={`px-3 py-2 rounded font-medium w-full flex transition ${idx + 1 === episode
                                    ? 'bg-lime-400 text-black'
                                    : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                                    }`}
                            >
                                {ep.Episode}. {ep.Title}
                            </button>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-4 text-sm">
                        <button
                            disabled={episode <= 1}
                            onClick={() => setEpisode((prev) => Math.max(1, prev - 1))}
                            className="text-gray-300 hover:text-white disabled:opacity-30"
                        >
                            &lt; Prev
                        </button>

                        <button
                            disabled={episode >= 10}
                            onClick={() => setEpisode((prev) => prev + 1)}
                            className="text-gray-300 hover:text-white disabled:opacity-30"
                        >
                            Next &gt;
                        </button>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Poster */}
                    <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
                        alt={movie.Title}
                        className="w-full md:w-80 rounded shadow-lg"
                    />

                    {/* Details */}
                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl font-bold mb-8">{movie.Title}</h1>
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

            </div>
        </main>
    );
}

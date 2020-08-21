import React from "react";
import { useState, useEffect } from "react";
import axios from "../../requests/axios";
import "./Row.css";
import YouTube from "react-youtube";
import requests from "../../requests/requests";
import Tooltip from "@material-ui/core/Tooltip";

const POSTER_URL = "https://image.tmdb.org/t/p/original"; //base url to load images

function Row({ title, movie_request, isLargeRow }) {
  const [movies, setMovies] = useState([]); // store movie data
  const [trailerUrl, setTrailerUrl] = useState(""); //store trailer url

  // useEffect to fetch movie data from TMDB using axios
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(movie_request);
      setMovies(responseData.data.results);
    };
    fetchData();
  }, [movie_request]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const fetchMovieTrailer = async (movie) => {
    await axios
      .get("/movie/" + movie?.id.toString() + requests.trailerQuery)
      .then((responseData) => {
        console.log(responseData.data.results);
        setTrailerUrl(responseData.data.results[0]?.key);
      })
      .catch((error) => console.log(error));
  };

  //fetch trailer url when a movie is clicked
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      fetchMovieTrailer(movie);
    }
  };

  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row__posters">
        {movies.map((movie) => (
          <Tooltip
            placement="bottom"
            title={movie?.original_name || movie?.original_title}
            key={movie.id}
          >
            <img
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              onClick={() => handleClick(movie)}
              src={`${POSTER_URL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.original_title}
            />
          </Tooltip>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

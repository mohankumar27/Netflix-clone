import React, { useState, useEffect } from "react";
import axios from "../../requests/axios";
import requests from "../../requests/requests";
import "./Banner.css";

const POSTER_URL = "https://image.tmdb.org/t/p/original"; //base url to load images

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchSingleMovie = async () => {
      const responseData = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        responseData.data.results[
          Math.floor(Math.random() * responseData.data.results.length - 1)
        ]
      );
    };
    fetchSingleMovie();
  }, []);
  //function that truncates description to just 150 characters
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
  }
  return (
    //header to display image
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${POSTER_URL}${movie.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;

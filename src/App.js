import React from "react";
import "./App.css";
import Row from "./Components/Row/Row";
import requests from "./requests/requests";
import Banner from "./Components/Banner/Banner";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <div className="app">
      {/* Nav bar */}
      <Nav />
      {/* Banner */}
      <Banner />
      {/* Rows */}
      <Row
        title={"NETFLIX ORIGINALS"}
        movie_request={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title={"Trending Now"} movie_request={requests.fetchTrending} />
      <Row title={"Top Rated"} movie_request={requests.fetchTopRated} />
      <Row title={"Action Movies"} movie_request={requests.fetchActionMovies} />
      <Row title={"Comedy Movies"} movie_request={requests.fetchComedyMovies} />
      <Row title={"Horror Movies"} movie_request={requests.fetchHorrorMovies} />
      <Row
        title={"Romance Movies"}
        movie_request={requests.fetchRomanceMovies}
      />
      <Row
        title={"Documentaries"}
        movie_request={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default App;

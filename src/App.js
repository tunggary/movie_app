import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovie = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({ movies: movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovie();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((each) => (
              <Movie
                key={each.id}
                id={each.id}
                year={each.year}
                title={each.title}
                summary={each.summary}
                poster={each.medium_cover_image}
                genres={each.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;

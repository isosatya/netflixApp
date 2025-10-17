import React, { Component } from "react";
import MovieCard from "./MovieCard";

class New_seasons extends Component {

    render() {
        return (
            <div className="resultsContainer">
                {this.props.loading && (
                    <h1 className="noResults">Loading results...</h1>
                )}

                {this.props.noResults && (
                    <h1 className="noResults">
                        No results for the selected dates!
                    </h1>
                )}
                {!!this.props.dataNew &&
                    this.props.dataNew.map(newItem => (
                        <MovieCard
                            key={newItem.imbdid}
                            netflixId={newItem.netflixid}
                            poster={newItem.poster}
                            title={newItem.title}
                            totalSeasons={newItem.total_seasons}
                            runtime={newItem.runtime}
                            genre={newItem.genre}
                            country={newItem.country}
                            year={newItem.year}
                            imdbRating={newItem.imdb_rating}
                            plot={newItem.plot}
                            actors={newItem.actors}
                            language={newItem.language}
                        />
                    ))}
            </div>
        );
    }
}

export default New_seasons;

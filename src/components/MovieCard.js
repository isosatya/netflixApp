import React, { Component } from "react";

/**
 * MovieCard component - displays movie/series information with hover effects
 * Handles both regular movies and series with seasons
 */
class MovieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
        this.setState({ isHovered: true });
    }

    handleMouseLeave() {
        this.setState({ isHovered: false });
    }

    /**
     * Renders the type and runtime information
     * Shows seasons for series, type and runtime for movies
     */
    renderTypeAndRuntime() {
        const { type, runtime, totalSeasons } = this.props;
        
        if (totalSeasons) {
            // Series with seasons
            return (
                <div className="itemDescription2">
                    <p className="itemDescription3 itemTypeRuntime">
                        Seasons: {totalSeasons}
                    </p>
                    <p className="itemDescription3">-</p>
                    <p className="itemDescription3">
                        Duration: {runtime}
                    </p>
                </div>
            );
        } else {
            // Regular movie
            return (
                <div className="itemDescription2">
                    <p className="itemDescription3 itemTypeRuntime">
                        {type}
                    </p>
                    <p className="itemDescription3">-</p>
                    <p className="itemDescription3">
                        {runtime}
                    </p>
                </div>
            );
        }
    }

    /**
     * Renders the rating visualization with popcorn icon
     */
    renderRating() {
        const { imdbRating } = this.props;
        const overlayHeight = 20 * (10 - imdbRating) + "px";

        return (
            <div className="popAndRating">
                <div className="popAndOverlay">
                    <img className="popcorn" src="./pop7.jpg" alt="Rating visualization" />
                    <div
                        style={{
                            width: "127px",
                            background: "white",
                            height: overlayHeight,
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            marginLeft: "34px",
                            opacity: 0.8,
                            border: "transparent",
                            borderRadius: "4px",
                            zIndex: 100
                        }}
                    />
                </div>
                <div className="rating">
                    <p>Rating</p>
                    <p>{imdbRating} / 10</p>
                </div>
            </div>
        );
    }

    render() {
        const { 
            netflixId, 
            poster, 
            title, 
            genre, 
            country, 
            year, 
            imdbRating, 
            plot, 
            actors, 
            language, 
            leaving 
        } = this.props;

        const { isHovered } = this.state;

        return (
            <div className="itemContainer">
                {/* Front of card */}
                <div className="itemFront" onMouseEnter={this.handleMouseEnter}>
                    <img
                        className="itemPoster"
                        src={poster === "N/A" ? "./filmicon.png" : poster}
                        alt={`Poster for ${title}`}
                    />

                    <div className="itemDescription">
                        <p className="itemDescription3 itemTitle">
                            {title}
                        </p>
                        {this.renderTypeAndRuntime()}
                        <p className="itemDescription3">{genre}</p>
                        <div className="itemDescription2">
                            <p className="itemDescription3">
                                {country}
                            </p>
                            <p className="itemDescription3">
                                / {year}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Leaving date banner */}
                {leaving && (
                    <div className="leavingDate">
                        <p
                            style={{ fontSize: "20px" }}
                            className="leavingDate1 leavingDate2"
                        >
                            Leaving on the
                        </p>
                        <p className="leavingDate1">{leaving}</p>
                    </div>
                )}

                {/* Back of card - shown on hover */}
                {isHovered && (
                    <div className="itemBack" onMouseLeave={this.handleMouseLeave}>
                        {this.renderRating()}
                        
                        <div className="backDescription">
                            <p
                                style={{
                                    fontWeight: "bolder",
                                    fontStyle: "italic"
                                }}
                            >
                                Plot: {plot}
                            </p>
                            <p>Actors: {actors}</p>
                            <p>Language: {language}</p>
                        </div>
                        
                        <a
                            className="watchButton"
                            href={`https://www.netflix.com/watch/${netflixId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Watch
                        </a>
                    </div>
                )}
            </div>
        );
    }
}

export default MovieCard;

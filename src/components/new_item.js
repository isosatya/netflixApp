import React, { Component } from "react";
import { log } from "util";

class New_item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    handleChange(e) {
        // console.log("target name", [e.target]);
        this.setState({ movie: [e.target.id] });
        // console.log("this.state at handleChange 1", this.state);
    }

    handleChange2() {
        // console.log("this.state at handleChange 2a", this.state);
        this.setState({ movie: null });
        // console.log("this.state at handleChange 2", this.state);
    }

    render() {
        // console.log("this.props at new", this.props);
        // console.log("this.state at new", this.state);
        return (
            <div className="resultsContainer">
                {!!this.props.dataNew &&
                    this.props.dataNew.map(newItem => (
                        <div key={newItem.netflixid} className="itemContainer">
                            <div
                                className="itemFront"
                                id={newItem.netflixid}
                                onMouseOver={this.handleChange}
                            >
                                <img
                                    className="itemPoster"
                                    src={
                                        newItem.poster == `N/A`
                                            ? "./filmicon.png"
                                            : newItem.poster
                                    }
                                />

                                <div className="itemDescription">
                                    <p className="itemDescription3 itemTitle">
                                        {newItem.title}
                                    </p>
                                    <div className="itemDescription2">
                                        <p className="itemDescription3 itemTypeRuntime">
                                            {newItem.type}
                                        </p>
                                        <p className="itemDescription3">-</p>
                                        <p className="itemDescription3">
                                            {newItem.runtime}
                                        </p>
                                    </div>

                                    <p className="itemDescription3">
                                        {newItem.genre}
                                    </p>
                                    <div className="itemDescription2">
                                        <p className="itemDescription3">
                                            {newItem.country}
                                        </p>
                                        <p className="itemDescription3">
                                            {newItem.year}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {this.state.movie && (
                                <div
                                    className="itemBack"
                                    id={newItem.netflixid}
                                    onMouseOut={this.handleChange2}
                                >
                                    <div className="popAndRating">
                                        <div className="popAndOverlay">
                                            <img
                                                className="popcorn"
                                                src="./pop7.jpg"
                                            />
                                            <div
                                                style={{
                                                    width: "127px",
                                                    background: "white",
                                                    height:
                                                        20 *
                                                            (10 -
                                                                newItem.imdb_rating) +
                                                        "px",
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
                                            <p>{newItem.imdb_rating} / 10</p>
                                        </div>
                                    </div>
                                    <div className="backDescription">
                                        <p>{newItem.plot}</p>
                                        <p>Actors: {newItem.actors}</p>
                                        <p>Language: {newItem.language}</p>
                                    </div>
                                    <a
                                        className="watchButton"
                                        href={`https://www.netflix.com/watch/${
                                            newItem.netflixid
                                        }`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Watch
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        );
    }
}

export default New_item;

import React, { Component } from "react";
import { connect } from "react-redux";
import { log } from "util";

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // console.log("this.props", this.props);

        return (
            <div className="resultsContainer">
                {!!this.props.dataNew &&
                    this.props.dataNew.map(newItem => (
                        <div key={newItem.netflixid} className="itemContainer">
                            <div className="itemFront">
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
                            <div className="itemBack">
                                <div className="popAndRating">
                                    <div className="popContainer">
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
                                                top: "25px",
                                                bottom: 0,
                                                marginLeft: "34px",
                                                opacity: 0.8,
                                                border: "transparent",
                                                borderRadius: "4px"
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
                                <a className="watchButton">Watch</a>
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
}

export default New;

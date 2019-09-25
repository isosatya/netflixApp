import React, { Component } from "react";
import { log } from "util";

class New_item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    handleChange() {
        // console.log("target name", [e.target]);
        this.setState({ boolean: true });
        // console.log("this.state at handleChange 1", this.state);
    }

    handleChange2() {
        // console.log("this.state at handleChange 2a", this.state);
        this.setState({ boolean: false });
        // console.log("this.state at handleChange 2", this.state);
    }

    render() {
        console.log("this.props at new", this.props);
        // console.log("this.state at new", this.state);
        return (
            <div className="itemContainer">
                <div className="itemFront" onMouseOver={this.handleChange}>
                    <img
                        className="itemPoster"
                        src={
                            this.props.poster == `N/A`
                                ? "./filmicon.png"
                                : this.props.poster
                        }
                    />

                    <div className="itemDescription">
                        <p className="itemDescription3 itemTitle">
                            {this.props.title}
                        </p>
                        <div className="itemDescription2">
                            <p className="itemDescription3 itemTypeRuntime">
                                {this.props.type}
                            </p>
                            <p className="itemDescription3">-</p>
                            <p className="itemDescription3">
                                {this.props.runtime}
                            </p>
                        </div>

                        <p className="itemDescription3">{this.props.genre}</p>
                        <div className="itemDescription2">
                            <p className="itemDescription3">
                                {this.props.country}
                            </p>
                            <p className="itemDescription3">
                                / {this.props.year}
                            </p>
                        </div>
                    </div>
                </div>
                {this.props.leaving && (
                    <div className="leavingDate">
                        <p
                            style={{
                                fontSize: "20px"
                            }}
                        >
                            Leaving on the
                        </p>
                        <p>{this.props.leaving}</p>
                    </div>
                )}

                {this.state.boolean && (
                    <div className="itemBack" onMouseOut={this.handleChange2}>
                        <div className="popAndRating">
                            <div className="popAndOverlay">
                                <img className="popcorn" src="./pop7.jpg" />
                                <div
                                    style={{
                                        width: "127px",
                                        background: "white",
                                        height:
                                            20 * (10 - this.props.imdb_rating) +
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
                                <p>{this.props.imdb_rating} / 10</p>
                            </div>
                        </div>
                        <div className="backDescription">
                            <p
                                style={{
                                    fontWeight: "bolder",
                                    fontStyle: "italic"
                                }}
                            >
                                {this.props.plot}
                            </p>
                            <p>Actors: {this.props.actors}</p>
                            <p>Language: {this.props.language}</p>
                        </div>
                        <a
                            className="watchButton"
                            href={`https://www.netflix.com/watch/${this.props.netflixid}`}
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

export default New_item;

import React, { Component } from "react";
import { connect } from "react-redux";
import { log } from "util";

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps) {
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };
        // Typical usage (don't forget to compare props):
        if (this.props.dataNew !== prevProps.dataNew) {
            this.props.dataNew.map(newItem => {
                newItem.type.capitalize;
                console.log("this.props", this.props.dataNew);
            });
        }
    }

    render() {
        console.log("this.props", this.props);

        return (
            <div className="resultsContainer">
                {!!this.props.dataNew &&
                    this.props.dataNew.map(newItem => (
                        <div key={newItem.netflixid} className="itemContainer">
                            <div>
                                {/* <Link to={`/beer/${beer.id}`}> */}
                                <div>
                                    <div className="">
                                        <img
                                            className="itemPoster"
                                            src={
                                                newItem.poster == `N/A`
                                                    ? "./filmicon.png"
                                                    : newItem.poster
                                            }
                                        />
                                    </div>
                                    <div className="itemDescription">
                                        <p className="itemDescription3 itemTitle">
                                            {newItem.title}
                                        </p>
                                        <div className="itemDescription2">
                                            <p className="itemDescription3 itemTypeRuntime">
                                                {newItem.type}
                                            </p>
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
                                {/* </Link> */}
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
}

export default New;

import React, { Component } from "react";
import New_item from "./new_item";

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props != prevProps) {
    //         if (!this.props.dataNew.length) {
    //             return <div className="warning">Warning!</div>;
    //         }
    //     }
    // }

    render() {
        console.log("this.props at new", this.props);
        // console.log("this.state at new", this.state);
        return (
            <div className="resultsContainer">
                {!!this.props.dataNew &&
                    this.props.dataNew.map(newItem => (
                        <New_item
                            key={newItem.imbdid}
                            netflixid={newItem.netflixid}
                            poster={newItem.poster}
                            title={newItem.title}
                            type={newItem.type}
                            runtime={newItem.runtime}
                            genre={newItem.genre}
                            country={newItem.country}
                            year={newItem.year}
                            imdb_rating={newItem.imdb_rating}
                            plot={newItem.plot}
                            actors={newItem.actors}
                            language={newItem.language}
                        />
                    ))}
            </div>
        );
    }
}

export default New;

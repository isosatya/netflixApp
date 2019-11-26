import React, { Component } from "react";
import New_item from "./new_item";

class Leaving extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // console.log("this.props at leaving", this.props);
        return (
            <div className="resultsContainer">
                {this.props.loading && (
                    <h1 className="noResults">Loading results...</h1>
                )}
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
                            leaving={newItem.leaving}
                        />
                    ))}
            </div>
        );
    }
}

export default Leaving;

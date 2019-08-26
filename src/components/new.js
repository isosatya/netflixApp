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
            <React.Fragment>
                <New_item dataNew={this.props.dataNew} />
            </React.Fragment>
        );
    }
}

export default New;

import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter, BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";

class Boxes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="boxContainer">
                <div
                    className="box"
                    onMouseOver={() => this.setState({ bool1: true })}
                >
                    <h2 className="boxText">What´s new?</h2>
                    {this.state.bool1 && (
                        <div
                            className="boxMenu"
                            onMouseOut={() => this.setState({ bool1: false })}
                        >
                            <h2 className="boxText2">What´s new?</h2>
                            <h2 className="boxText2 boxText3">
                                In the last{" "}
                                <input
                                    name="days1"
                                    type="number"
                                    min={0}
                                    max={60}
                                    className="numberDays"
                                    value={this.props.days1}
                                    onChange={this.props.handleChange}
                                />{" "}
                                days
                            </h2>

                            <button
                                className="buttonGo"
                                onClick={this.props.searchNew}
                            >
                                <Link to="/new">Go!</Link>
                            </button>
                        </div>
                    )}
                </div>

                <div
                    className="box"
                    onMouseOver={() => this.setState({ bool2: true })}
                >
                    <h2 className="boxText">Leaving</h2>
                    {this.state.bool2 && (
                        <div
                            className="boxMenu"
                            onMouseOut={() => this.setState({ bool2: false })}
                        >
                            <h2 className="boxText2">Leaving</h2>
                            <button className="buttonGo buttonGo2">
                                <Link to="/leaving">Go!</Link>
                            </button>
                        </div>
                    )}
                </div>

                <div
                    className="box"
                    onMouseOver={() => this.setState({ bool3: true })}
                >
                    <h2 className="boxText">New Seasons</h2>
                    {this.state.bool3 && (
                        <div
                            className="boxMenu"
                            onMouseOut={() => this.setState({ bool3: false })}
                        >
                            <h2 className="boxText2">New Seasons</h2>
                            <h2 className="boxText2 boxText3">
                                In the last{" "}
                                <input
                                    name="days2"
                                    type="number"
                                    min={0}
                                    max={60}
                                    value={this.props.days2}
                                    className="numberDays"
                                    onChange={this.props.handleChange}
                                />{" "}
                                days
                            </h2>
                            <button className="buttonGo">
                                <Link to="/new_seasons">Go!</Link>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Boxes;

// {this.state.bool2 && (
//     <div
//         className="boxMenu boxMenu2"
//         onMouseOut={() => this.setState({ bool2: false })}
//     >
//         <h2 className="boxText2">Leaving</h2>
//         <button className="buttonGo">Go!</button>
//     </div>
// )}

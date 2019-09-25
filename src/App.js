import React, { Component } from "react";
import { HashRouter, BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";
import Boxes from "./components/boxes";
import New from "./components/new";
import New_seasons from "./components/new_seasons";
import Leaving from "./components/leaving";
import { log } from "util";
import { type } from "os";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { days1: 0, days2: 0 };
        this.handleChange = this.handleChange.bind(this);
        this.searchNew = this.searchNew.bind(this);
        this.searchLeaving = this.searchLeaving.bind(this);
    }

    componentDidMount() {
        // axios.get("/user").then(results => {
        //     this.setState(results.data[0]);
        // });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    searchNew() {
        axios.post("/new_items", { days1: this.state.days1 }).then(response => {
            // console.log("response from backend", response.data.length);
            this.setState({ dataNew: response.data });
        });
    }

    searchLeaving() {
        console.log("i clicked on search leaving");

        axios.post("/leaving").then(response => {
            // console.log("response from backend for leaving", response.data);
            this.setState({ dataNew: response.data });
        });
    }

    render() {
        console.log("this.state at App", this.state.dataNew);

        return (
            <React.Fragment>
                <BrowserRouter>
                    <div>
                        <div>
                            <Route
                                path="/welcome"
                                render={() => (
                                    <Boxes
                                        days1={this.state.days1}
                                        days2={this.state.days2}
                                        handleChange={this.handleChange}
                                        searchNew={this.searchNew}
                                        searchLeaving={this.searchLeaving}
                                    />
                                )}
                            />
                            <div>
                                <Link to="/welcome" className="menu">
                                    <div className="home">
                                        <img
                                            className="homeButton"
                                            src="/house.png"
                                            onClick={() =>
                                                this.setState({
                                                    days1: 0,
                                                    days2: 0
                                                })
                                            }
                                        />
                                    </div>
                                </Link>

                                <Route
                                    path="/new"
                                    render={() => (
                                        <New
                                            days1={this.state.days1}
                                            dataNew={this.state.dataNew}
                                        />
                                    )}
                                />
                                <Route
                                    path="/leaving"
                                    render={() => (
                                        <Leaving dataNew={this.state.dataNew} />
                                    )}
                                />
                                <Route
                                    path="/new_seasons"
                                    render={() => (
                                        <New_seasons days2={this.state.days2} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
{
    /* 
<div
    onMouseOver={() => this.setState({ bool: true })}
    onMouseOut={() => this.setState({ bool: false })}
>
    {this.state.bool ? (
        <span>[OPTION1] show after onMouseEnter</span>
    ) : (
        <div>[OPTION2] show after onMouseLeave</div>
    )}
</div>; */
}

export default App;

{
    /* <BrowserRouter>
<Route exact path="/new" render={() => <New />} />
<Route exact path="/leaving" render={() => <Leaving />} />
<Route
    exact
    path="/newseasons"
    render={() => <New_seasons />}
/>
</BrowserRouter> */
}

{
    /* <Link to={`/`}>
    <p className="menuHeader">Profile</p>
</Link>; */
}

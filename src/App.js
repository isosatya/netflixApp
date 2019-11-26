import React, { Component } from "react";
import { HashRouter, BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";
import Boxes from "./components/boxes";
import New from "./components/new";
import New_seasons from "./components/new_seasons";
import Leaving from "./components/leaving";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days1: 1,
            days2: 1,
            loading: false,
            no_results: false,
            menu: false
        };
        this.menu = this.menu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchNew = this.searchNew.bind(this);
        this.searchLeaving = this.searchLeaving.bind(this);
        this.searchNewSeasons = this.searchNewSeasons.bind(this);
    }

    menu() {
        this.state.menu
            ? this.setState({ menu: false })
            : this.setState({ menu: true });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    searchNew() {
        this.menu();
        // console.log("this.state.days1", this.state.days1);
        this.setState({ dataNew: [], loading: true, no_results: false });
        axios.post("/new_items", { days1: this.state.days1 }).then(response => {
            // console.log("response from backend for new", response.data);
            if (!response.data.length) {
                this.setState({ no_results: true });
            }
            this.setState({ dataNew: response.data, loading: false });
        });
    }

    searchLeaving() {
        this.menu();
        this.setState({ dataNew: [], loading: true });
        axios.post("/leaving_items").then(response => {
            // console.log("response from backend for leaving", response.data);
            this.setState({ dataNew: response.data, loading: false });
        });
    }

    searchNewSeasons() {
        this.menu();
        // console.log("this.state.days2", this.state.days2);
        this.setState({ dataNew: [], loading: true, no_results: false });
        axios
            .post("/new_seasons_items", { days2: this.state.days2 })
            .then(response => {
                // console.log("response from backend", response.data);
                if (!response.data.length) {
                    this.setState({ no_results: true });
                }
                this.setState({ dataNew: response.data, loading: false });
            });
    }

    render() {
        // console.log("this.state at App", this.state);
        // console.log("this.state at App ", this.state);

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
                                        searchNewSeasons={this.searchNewSeasons}
                                    />
                                )}
                            />
                            {this.state.menu && (
                                <div>
                                    <Link to="/welcome" className="menu">
                                        <div className="home">
                                            <img
                                                className="homeButton"
                                                src="/house.png"
                                                onClick={() => {
                                                    this.setState({
                                                        days1: 1,
                                                        days2: 1
                                                    });
                                                    this.menu();
                                                }}
                                            />
                                        </div>
                                    </Link>

                                    <Route
                                        path="/new"
                                        render={() => (
                                            <New
                                                days1={this.state.days1}
                                                dataNew={this.state.dataNew}
                                                loading={this.state.loading}
                                                noResults={
                                                    this.state.no_results
                                                }
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/leaving"
                                        render={() => (
                                            <Leaving
                                                dataNew={this.state.dataNew}
                                                loading={this.state.loading}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/new_seasons"
                                        render={() => (
                                            <New_seasons
                                                days2={this.state.days2}
                                                dataNew={this.state.dataNew}
                                                loading={this.state.loading}
                                                noResults={
                                                    this.state.no_results
                                                }
                                            />
                                        )}
                                    />
                                </div>
                            )}
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

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
            noResults: false,
            menu: false,
            newItems: []
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchNew = this.searchNew.bind(this);
        this.searchLeaving = this.searchLeaving.bind(this);
        this.searchNewSeasons = this.searchNewSeasons.bind(this);
    }

    toggleMenu() {
        this.setState({ menu: !this.state.menu });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    searchNew() {
        this.toggleMenu();
        this.setState({ newItems: [], loading: true, noResults: false });
        axios.post("/new_items", { days1: this.state.days1 }).then(response => {
            if (!response.data.length) {
                this.setState({ noResults: true });
            }
            this.setState({ newItems: response.data, loading: false });
        });
    }

    searchLeaving() {
        this.toggleMenu();
        this.setState({ newItems: [], loading: true });
        axios.post("/leaving_items").then(response => {
            this.setState({ newItems: response.data, loading: false });
        });
    }

    searchNewSeasons() {
        this.toggleMenu();
        this.setState({ newItems: [], loading: true, noResults: false });
        axios
            .post("/new_seasons_items", { days2: this.state.days2 })
            .then(response => {
                if (!response.data.length) {
                    this.setState({ noResults: true });
                }
                this.setState({ newItems: response.data, loading: false });
            });
    }

    render() {
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
                                                    this.toggleMenu();
                                                }}
                                            />
                                        </div>
                                    </Link>

                                    <Route
                                        path="/new"
                                        render={() => (
                                            <New
                                                days1={this.state.days1}
                                                dataNew={this.state.newItems}
                                                loading={this.state.loading}
                                                noResults={this.state.noResults}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/leaving"
                                        render={() => (
                                            <Leaving
                                                dataNew={this.state.newItems}
                                                loading={this.state.loading}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/new_seasons"
                                        render={() => (
                                            <New_seasons
                                                days2={this.state.days2}
                                                dataNew={this.state.newItems}
                                                loading={this.state.loading}
                                                noResults={this.state.noResults}
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

export default App;

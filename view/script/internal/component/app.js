import React, { Component } from 'react';
import { Link } from 'react-router';


export default class App extends Component {
    render() {
        return <div id="app">
            <div className="container">
                <nav className="navbar navbar-dark bg-inverse">
                        <Link to="/" className="navbar-brand" href="#">FG Dojo</Link>
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <Link to="/feed" className="nav-link">Feed</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/b" className="nav-link">Boards</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Events</a>
                            </li>
                        </ul>
                </nav>
                <div className="card">
                    <div className="card-block">
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>;
    }
}

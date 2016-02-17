import React, { Component } from 'react';
import { Link } from 'react-router';


export default class App extends Component {
    render() {
        return <div id="app">
            <nav className="navbar navbar-dark bg-inverse navbar-fixed-top">
                <div className="container">
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
                </div>
            </nav>
            <div id="content" className="container">
                <div className="card">
                    <div className="card-block">
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>;
    }
}

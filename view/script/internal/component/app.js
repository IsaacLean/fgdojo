import React, { Component } from 'react';
import { createStore } from 'redux';
import { Link } from 'react-router';

import UserDropdown from '../container/user_dropdown';


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
                            <a href="#" className="nav-link">Events</a>
                        </li>
                    </ul>
                    <UserDropdown />
                </div>
            </nav>
            <div id="content" className="container">
                <div className="card">
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}

// import $ from 'jquery';
// import React, { Component } from 'react';
// import { Link } from 'react-router';


// export default class PostsList extends Component {
//     constructor(props) {
//         super(props);

//         this.state = { postsData: null };

//         document.title = 'FG Dojo: posts';

//         $.get('/api/post', function(data) {
//             this.setState({ postsData: JSON.parse(data).posts});
//         }.bind(this));
//     }

//     render() {
//         let boardNodes;

//         if(this.state.postsData === null) {
//             boardNodes = <li className="list-group-item">
//                 There are currently no default posts set.
//             </li>;
//         } else {
//             boardNodes = this.state.postsData.map(function(board) {
//                 return <Link to={'/b/' + board.name} key={board.name} className="list-group-item">
//                     <h5 className="list-group-item-heading">{board.name}</h5>
//                     <p className="list-group-item-text">{board.desc}</p>
//                 </Link>;
//             });
//         }

//         return <div id="posts-list">
//             <div className="card-header">
//                 <Link to={'/b'} className="card-title">
//                     posts
//                 </Link>
//                 <div className="btn-group pull-xs-right">
//                     <Link to={ {pathname: '/b', query: { show: 'create' }} } className="btn btn-success btn-sm">
//                         Create new board
//                     </Link>
//                 </div>
//             </div>
//             <div className="card-block">
//                 <div className="list-group">
//                     {boardNodes}
//                 </div>
//             </div>
//         </div>;
//     }
// }

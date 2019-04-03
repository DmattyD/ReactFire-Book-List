import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Create from './components/Create';
import Delete from './components/Delete';
import Edit from './components/Edit';
import Show from './components/Show';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App}/>
            <Route path ='/create' component={Create}/>
            <Route path ='/delete' component={Delete}/>
            <Route path ='/edit/:id' component={Edit}/>
            <Route path ='/show' component={Show}/>
        </div>
    </Router>,
    document.getElementById('root')
);
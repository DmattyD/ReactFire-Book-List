import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import App from '../App';

class Delete extends Component {

    constructor(props) {
        super(props);
        this.state ={
        Book_Entries: {},
        key:''
    };
}

delete(id) {
    //this is the delete method
    firebase.firestore().collection('Book_Entries').doc(id).delete().then(() =>{
    console.log("Book Deleted");
    this.props.history.push('/')
}).catch((error) => {
    console.log("Error romoving book : ", error);
})
}

render () {
    return(
        <div class="container">
        <div class="panel panel-default">
        <div class="panel-heading">
        <h4><Link to='/'>Book List</Link></h4>
        <h3 class="panel-title">
        {this.state.Book_Entries.title}
        </h3>
        </div>
        <div class="panel-body">
        <dl>
            <dt>Title:</dt>
            <dd>{this.state.Book_Entries.title}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
            </div>

        </div>
        </div>

    );
}
}





export default Delete;
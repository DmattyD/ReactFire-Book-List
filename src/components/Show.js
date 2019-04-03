import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

    constructor(props) {
        super(props);
        this.state ={
        Book_Entries: {},
        key:''
    };
}

componentDidMount() {
    //// this is the get method
    const ref = firebase.firestore().collection('Book_Entries').doc(this.props.match.params.id);
    ref.get().then((doc) =>{
    if (doc.exists) {
        this.setState({
            Book_Entries: doc.data(),
            key: doc.id,
            isLoading: false
        });
    } else {
        console.log("No Book");
    }
})}

render() {
    return(
        <div class="container">
            <div class="panel panel-default">
            <div class="panel-heading">
                <h4><Link to="/">Book List</Link></h4>
                <h3 class="panel-title">
                {this.state.Book_Entries.title}
                </h3>
            </div>
            <div class="panel-body">
            <dl>
                <dt>Title</dt>
                <dd>{this.state.Book_Entries.Title}</dd>
                <dt>Author</dt>
                <dd>{this.state.Book_Entries.Author}</dd>
                <dt>Total Pages</dt>
                <dd>{this.state.Book_Entries.Pages}</dd>
                <dt>Completed</dt>
                <dd>{this.state.Book_Entries.Completed}</dd>
                <dt>Thoughts</dt>
                <dd>{this.state.Book_Entries.Thoughts}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>
            </div>
            </div>
        
        
        
        
        </div>



    )
}

};
export default Show;
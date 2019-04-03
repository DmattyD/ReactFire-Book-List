import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

class Edit extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            Title: '',
            Author:'',
            Pages: '',
            Thoughts:'',
            Completed: '',
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('Book_Entries').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const Book_Entries = doc.data();
                this.setState({
                    key: doc.id,
                    Title: Book_Entries.Title,
                    Author: Book_Entries.Author,
                    Pages: Book_Entries.Pages,
                    Thoughts: Book_Entries.Thoughts,
                    Completed: Book_Entries.Completed,
                });
                } else {
                    console.log("No Such Book");
                }
        });
    }

onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({Book_Entries:state});
}

onSubmit = (e) => {
    e.preventDefault();

    const { Title, Author, Pages, Thoughts, Completed } = this.state;
/// this is the edit function
    const updateRef = firebase.firestore().collection('Book_Entries').doc(this.state.key);
    updateRef.set({
        Thoughts,
        Completed
    }).then((docRef) => {
        this.setState({
            key:'',
            Thoughts:'',
            Completed: '',
        })
        this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
        console.error("Error Updating: ", error);
    });
}

render() {
    return (
        <div class="container">
        <div class="panel panel-default">
        <div class="panel-heading">
        <h3 class="panel-title">
        Thoughts & Completion
        </h3>
        </div>
        <div class="panel-body">
        <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Book List</Link></h4>
        <form onSubmit={this.onSubmit}>
        <label for="title">Title:{this.state.Title}</label>
        <label for="Author">Author: {this.state.Author}</label>
        <label for="Pages">Pages: {this.state.Pages}</label>
        <label for="Thoughts">Thoughts</label>
        <textArea type="text" class="form-control" name="thoughts" value={this.state.Thoughts} onChange={this.onChange} placeholder="Thoughts"/>
       <label for="Completed">Completed</label>
       <input type="boolean" class="form-control" name="completed" value={this.state.Completed} onCanPlay={this.onChange} placeholder="Completed"/>
        <button type ="submit" class="btn btn-success">Submit</button>
        
        
        
        
        
        </form>
        </div>
        </div>
        </div>
    );
}

}

export default Edit;
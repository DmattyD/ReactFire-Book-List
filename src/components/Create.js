import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

constructor() {
    super();
    this.ref = firebase.firestore().collection('Book_Entries');
    this.state = {
        Title: '',
        Author: '',
        Pages: '',
        Thoughts: '',
        Completed: '',
    };
}

onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
}

/// this is the create method
onSubmit = (e) => {
    e.preventDefault();

    const { Title, Author, Pages, Thoughts, Completed } = this.state
    this.ref.add({
        Title,
        Author,
        Pages,
        Thoughts,
        Completed
        }).then((docRef) => {
            this.setState({
                Title: '',
                Author: '',
                Pages: '',
                Thoughts: '',
                Completed: '',
            });
            this.props.history.push('/')
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

render() {
    const { Title, Author, Pages, Thoughts, Completed } = this.state

return (
    <div class="container">
    <div class="panel panel-default">
    <div class="panel-heading">
    <h3 class="panel-title">
    ADD BOOK</h3>
    </div>
    <div class="panel-body">
    <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
    <form onSubmit={this.onSubmit}>
    <div class="form-group">
    <label for="title">Title:</label>
    <input type="text" class="form-control" name="Title" value={Title} onChange={this.onChange} placeholder="Title"/>
    <label for="author">Author:</label>
    <input type="text" class="form-control" name="Author" value={Author} onChange={this.onChange} placeholder="Author"/>
    <label for="Pages">Pages:</label>
    <input type="number" class="form-control" name="Pages" value={Pages} onChange={this.onChange} placeholder="Pages"/>
    <label for="Completed">Completed:</label>
    <input type="boolean" class="form-control" name="Completed" value={Completed} onChange={this.onChange} placeholder="Completed"/>
    <label for="Thoughts">Thoughts:</label>
    <textArea type="text" class="form-control" name="Thoughts" cols="8" row="3" onChange={this.onChange} placeholder="Thoughts">{Thoughts}</textArea>
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
    </form>
    </div>
    </div>
    </div>
)
}
}

export default Create;
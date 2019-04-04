import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from '../App';

class Edit extends Component  {

    constructor(props) {
        super(props);
        this.ref= firebase.firestore().collection('Book_Entries');
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
        ref.get().then((doc) => { /// get by id
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


onUpdate = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({Book_Entries:state});
}

onSubmit = (e) => {
    debugger
    e.preventDefault();

    const { Title, Author, Pages, Thoughts, Completed } = this.state;
/// this is the edit function
    const updateRef = firebase.firestore().collection('Book_Entries').doc(this.state.key);
    updateRef.set({
        Title,
        Author,
        Pages,
        Thoughts,
        Completed
    }).then((docRef) => {
        this.setState({
            key:'',
            Thoughts:'',
            Completed: '',
        }).then.onUpdate().onSubmit()
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
        Update Thoughts
        </h3>
        </div>
        <div class="panel-body">
        <h4><Link to='/' class="btn btn-primary">Book List</Link></h4>
        <form onSubmit={this.onSubmit}>
        <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" class="form-control" name="Title" value={this.state.Title}  placeholder="Title" disabled/>
        </div>
        <div class="form-group">
        <label for="author">Author:</label>
        <input type="text" class="form-control" name="Author" value={this.state.Author} placeholder="Author" disabled />
        </div>
        <div class="form-group">
        <label for="Pages">Pages:</label>
        <input type="number" class="form-control" name="Pages" value={this.state.Pages} placeholder="Pages" disabled/>
        </div>
        <div class="form-group">
        <label for="Thoughts">Thoughts</label>
        <textArea type="text" class="form-control" name="Thoughts" value={this.state.Thoughts} onUpdate={this.onUpdate} placeholder="Thoughts" cols="8" rows="3">{this.state.Thoughts}</textArea>
        </div>
        <div class="form-group">
       <label for="Completed">Completed</label>
       <input type="text" class="form-control" name="Completed" value={this.state.Completed} onUpdate={this.onUpdate} placeholder="Completed"/>
        <button type ="submit" class="btn btn-success">Submit</button>
        
        </div>
        
        
        
        </form>
        </div>
        </div>
        </div>
    );
}

}

export default Edit;
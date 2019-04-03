import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';


class App extends Component {
  constructor(props) {
    super(props) ;
      this.ref = firebase.firestore().collection('Book Entries');
      this.unsubscribe = null;
      this.state = {
        Book_Entries: []
      };
    }
  

onCollectionUpdate = (querySnapshot) => {
  const Book_Entries = [];
  querySnapshot.forEach((doc) => {
    const { Author, Completed, Pages, Thoughts, Title} = doc.data();
    Book_Entries.push({
      key: doc.id,
      doc, // DocumentSnapshot
      Title,
      Author,
      Completed,
      Pages,
      Thoughts,
    });
  });
  this.setState({
    Book_Entries
  });
}
componentDidMount() {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
}
render() {
  return (
    <div class="container">
       <div class="panel panel-default">
           <div class="panel-heading">
             <h3 class="panel-title">
                 BOOK LIST
              </h3>
           </div>
           <div class="panel-body">
           <h4><Link to="/Create">Add Book</Link></h4>
           <table class="table table-stripe">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Pages</th>
                {/* <th>Thoughts</th> */}
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Book_Entries.map(Book_Entries =>
                <tr>
                  <td><Link to={`/show/${Book_Entries.key}`}>{Book_Entries.Title}</Link></td>
                  <td>{Book_Entries.Author}</td>
                  <td>{Book_Entries.Pages}</td>
                  {/* <td>{Book_Entries.Thoughts}</td> */}
                  <td>{Book_Entries.Completed}</td>
                </tr>
                )}
            </tbody>
           </table>
           </div>
        </div>
    </div>
  )}}

  export default App;
import "./App.css";
import React, { Component } from "react";

class App extends Component {
  state = {
    todos: []
  };
  componentDidMount() {
    fetch("http://127.0.0.1:8000/socapi/")
      .then(res => res.json())
      .then(data => {
        this.setState({ todos: ImageData });
        console.log(this.state.todos);
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-12">
          <h1>My Todos</h1>
          {this.state.todos.map((c, i) => (
            <li key={i}>{c.id}</li>
          ))}
        </div>
      </div>
    );
  }
  // [...]
}
export default App;

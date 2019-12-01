import "./App.css";
import React, { Component } from "react";

import axios from "axios";

class GamesList extends Component {
  constructor() {
    super();
    this.state = {
      socapi: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/socapi/`).then(response => {
      console.log(response.data);
      this.setState({
        socapi: response.data
      });
    });
  }

  render() {
    const { socapi } = this.state;

    return (
      <div>
        <ul>
          {socapi.map(soc => (
            <li>{soc.id}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default GamesList;
